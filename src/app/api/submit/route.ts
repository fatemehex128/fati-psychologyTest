import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
const WEB3FORMS_ACCESS_KEY = "d6123485-523f-407c-883d-12a44643aa6b";

async function sendToWeb3Forms(args: string[]): Promise<{ statusCode: number; responseBody: string }> {
  const { stdout } = await execFileAsync("curl", args, {
    timeout: 60000,
    maxBuffer: 1024 * 1024 * 20,
  });

  const statusMatch = stdout.match(/---HTTP_STATUS:(\d+)---/);
  const statusCode = statusMatch ? parseInt(statusMatch[1]) : 200;
  const responseBody = stdout.replace(/\n---HTTP_STATUS:\d+---$/, "").trim();

  return { statusCode, responseBody };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    /* Debug: log fields */
    const _debugFields: string[] = [];
    formData.forEach((value, key) => { if (typeof value === "string") _debugFields.push(key); });
    console.log("API received fields:", _debugFields.join(", "));

    // Build curl arguments
    const buildArgs = () => {
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


      // Add form fields
      // Use --form-string instead of -F to avoid special character interpretation
      formData.forEach((value, key) => {
        if (typeof value === "string") {
          args.push("--form-string", `${key}=${value}`);
        }
      });


      return args;
    };

    // Try up to 3 times (Cloudflare may block some requests)
    let lastResponse: { statusCode: number; responseBody: string } | null = null;

    let fieldCount = 0;
    formData.forEach(() => fieldCount++);
    console.log("Submit API: Sending", fieldCount, "fields to Web3Forms");
    for (let attempt = 1; attempt <= 3; attempt++) {
      const args = buildArgs();
      lastResponse = await sendToWeb3Forms(args);

      const { statusCode, responseBody } = lastResponse;

      // Check for success
      const isSuccess =
        responseBody.includes("Form Submitted Successfully") ||
        responseBody.includes("Form submitted successfully") ||
        responseBody.includes('"success":true');

      if (isSuccess) {
        return NextResponse.json({ success: true, data: { message: "Email sent successfully" } });
      }

      // Check for Cloudflare challenge - retry
      const isCloudflare =
        responseBody.includes("cf-mitigated") ||
        responseBody.includes("Just a moment") ||
        statusCode === 403;

      // Check for Form Submission Error (actual error, not Cloudflare)
      const isFormError = responseBody.includes("Form Submission Error");

      if (isCloudflare && attempt < 3) {
        // Wait a bit before retry
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        continue;
      }

      if (isFormError) {
        return NextResponse.json(
          { success: false, error: "خطا در ارسال فرم. لطفاً مجدداً تلاش کنید." },
          { status: 400 }
        );
      }

      // Non-retryable error
      break;
    }

    // All attempts failed
    if (lastResponse) {
      const { statusCode, responseBody } = lastResponse;

      // Check for Cloudflare
      if (responseBody.includes("Just a moment") || statusCode === 403) {
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
        data = { message: responseBody.substring(0, 500) };
      }
      console.error("Web3Forms error:", statusCode, JSON.stringify(data).substring(0, 500));
      return NextResponse.json(
        { success: false, error: data?.message || "Web3Forms request failed", details: data },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      { success: false, error: "Unknown error" },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Submit API error:", error?.message || error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

