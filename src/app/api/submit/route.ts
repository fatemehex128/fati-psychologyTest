import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import { writeFile, mkdtemp } from "fs/promises";
import { tmpdir } from "os";
import path from "path";

const execFileAsync = promisify(execFile);
const FORMSUBMIT_EMAIL = "fatemehex128@gmail.com";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const origin = request.headers.get("origin") || "http://localhost:3000";

    // Build curl arguments to bypass Cloudflare
    // curl has a different TLS fingerprint that FormSubmit accepts
    const args: string[] = [
      "-s",
      "-X", "POST",
      "https://formsubmit.co/ajax/" + FORMSUBMIT_EMAIL,
      "-H", "Accept: application/json",
      "-H", "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      "-H", "Origin: " + origin,
      "-H", "Referer: " + origin + "/",
      "-w", "\n---HTTP_STATUS:%{http_code}---",
    ];

    // Add form fields
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        args.push("-F", `${key}=${value}`);
      }
    });

    const { stdout } = await execFileAsync("curl", args, {
      timeout: 30000,
      maxBuffer: 1024 * 1024 * 5,
    });

    // Parse status and response
    const statusMatch = stdout.match(/---HTTP_STATUS:(\d+)---/);
    const statusCode = statusMatch ? parseInt(statusMatch[1]) : 200;
    const responseBody = stdout.replace(/\n---HTTP_STATUS:\d+---$/, "").trim();

    // Check for Cloudflare challenge
    if (responseBody.includes("cf-mitigated") || responseBody.includes("Just a moment")) {
      return NextResponse.json(
        {
          success: false,
          error:
            "سرویس ارسال ایمیل توسط Cloudflare محدود شده است. لطفاً چند دقیقه دیگر تلاش کنید.",
        },
        { status: 503 }
      );
    }

    let data: any;
    try {
      data = JSON.parse(responseBody);
    } catch {
      data = { success: statusCode >= 200 && statusCode < 300, message: responseBody };
    }

    if (statusCode < 200 || statusCode >= 300) {
      return NextResponse.json(
        { success: false, error: "FormSubmit request failed", details: data },
        { status: statusCode }
      );
    }

    // Check if FormSubmit returned an error in the response body
    // FormSubmit returns: {"success":"false","message":"This form needs Activation..."}
    // Note: "false" is a string, not a boolean
    const formSubmitSuccess = data?.success === true || data?.success === "true";
    if (!formSubmitSuccess) {
      const errorMsg = data?.message || "FormSubmit returned an error";
      return NextResponse.json(
        { success: false, error: errorMsg, details: data },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Submit API error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
