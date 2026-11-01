import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
const WEB3FORMS_ACCESS_KEY = "d6123485-523f-407c-883d-12a44643aa6b";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Build curl arguments
    const args: string[] = [
      "-s",
      "-X", "POST",
      "https://api.web3forms.com/submit",
      "-H", "Accept: application/json",
      "-H", "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      "-H", "Origin: https://web3forms.com",
      "-H", "Referer: https://web3forms.com/",
      "-w", "\n---HTTP_STATUS:%{http_code}---",
    ];

    // Add access_key first
    args.push("-F", `access_key=${WEB3FORMS_ACCESS_KEY}`);

    // Add form fields
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        args.push("-F", `${key}=${value}`);
      }
    });

    const { stdout } = await execFileAsync("curl", args, {
      timeout: 60000,
      maxBuffer: 1024 * 1024 * 20,
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
          error: "سرویس ارسال ایمیل توسط Cloudflare محدود شده است. لطفاً چند دقیقه دیگر تلاش کنید.",
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
        { success: false, error: "Web3Forms request failed", details: data },
        { status: statusCode }
      );
    }

    // Check if Web3Forms returned success
    if (!data.success) {
      return NextResponse.json(
        { success: false, error: data?.message || "Web3Forms returned an error", details: data },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Submit API error:", error?.message || error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
