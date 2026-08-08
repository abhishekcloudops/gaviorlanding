import { NextRequest, NextResponse } from "next/server";

const countryHeaders = ["cf-ipcountry", "x-vercel-ip-country", "x-geo-country"];

function normaliseCountry(value: string | null) {
  const country = value?.trim().toUpperCase();
  return country && /^[A-Z]{2}$/.test(country) ? country : null;
}

function publicIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const candidate = forwarded || request.headers.get("x-real-ip")?.trim();
  if (!candidate) return null;

  const privateRanges = /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|::1$|fc|fd)/i;
  return privateRanges.test(candidate) ? null : candidate;
}

export async function GET(request: NextRequest) {
  let country = countryHeaders
    .map((header) => normaliseCountry(request.headers.get(header)))
    .find(Boolean);

  if (!country) {
    const ip = publicIp(request);
    if (ip) {
      try {
        const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
          cache: "no-store",
          signal: AbortSignal.timeout(2500),
        });
        const data = (await response.json()) as { success?: boolean; country_code?: string };
        if (data.success !== false) country = normaliseCountry(data.country_code ?? null) ?? undefined;
      } catch {
        // A browser timezone fallback below keeps the pricing page useful if geolocation is unavailable.
      }
    }
  }

  if (!country) {
    country = request.nextUrl.searchParams.get("timezone") === "Asia/Kolkata" ? "IN" : "US";
  }

  return NextResponse.json(
    { country, currency: country === "IN" ? "INR" : "USD" },
    { headers: { "Cache-Control": "private, max-age=86400" } },
  );
}
