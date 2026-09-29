import { NextResponse } from "next/server";
import dns from "dns";
import { promisify } from "util";

const resolveMx = promisify(dns.resolveMx);
const resolve = promisify(dns.resolve);

// A list of common disposable email domains to filter out spam submissions
const DISPOSABLE_DOMAINS = new Set([
  "yopmail.com",
  "mailinator.com",
  "tempmail.com",
  "temp-mail.org",
  "10minutemail.com",
  "guerrillamail.com",
  "sharklasers.com",
  "guerrillamailblock.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamail.biz",
  "getairmail.com",
  "dispostable.com",
  "trashmail.com",
  "maildrop.cc",
  "tempmailaddress.com",
  "generator.email",
  "throwawaymail.com",
  "tempmail.dev",
  "fakeinbox.com",
  "burnitmail.com",
  "crazymailing.com",
]);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { valid: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim();

    // 1. Basic syntax check (regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json({
        valid: false,
        error: "Invalid email syntax format. Please double-check your email.",
      });
    }

    const domain = trimmedEmail.split("@")[1]?.toLowerCase();
    if (!domain) {
      return NextResponse.json({
        valid: false,
        error: "Could not parse the email domain.",
      });
    }

    // 2. Disposable domain check
    if (DISPOSABLE_DOMAINS.has(domain)) {
      return NextResponse.json({
        valid: false,
        error: "Temporary/disposable email addresses are not allowed.",
      });
    }

    // 3. DNS lookup for MX (Mail Exchange) or fallback to A/AAAA records
    try {
      const mxRecords = await resolveMx(domain);
      if (mxRecords && mxRecords.length > 0) {
        return NextResponse.json({ valid: true });
      }
    } catch (mxError) {
      // MX lookup failed. Try fallback A/AAAA records lookup since some hosts accept mail without explicit MX records.
      try {
        const aRecords = await resolve(domain);
        if (aRecords && aRecords.length > 0) {
          return NextResponse.json({ valid: true });
        }
      } catch (aError) {
        // Both lookups failed. The domain does not exist or does not route mail.
        return NextResponse.json({
          valid: false,
          error: `The email domain "${domain}" does not exist or cannot receive mail. Please check for typos.`,
        });
      }
    }

    return NextResponse.json({
      valid: false,
      error: "The email domain could not be verified to receive mail.",
    });
  } catch (error: any) {
    console.error("Email verification API error:", error);
    return NextResponse.json(
      { valid: false, error: "An error occurred while verifying the email." },
      { status: 500 }
    );
  }
}
