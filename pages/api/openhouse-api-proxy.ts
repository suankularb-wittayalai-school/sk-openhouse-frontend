import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { path } = req.query;

  if (typeof path !== "string") {
    return res.status(400).json({ error: "Invalid path" });
  }

  // 1. Get Token from Cookies (Preferred) OR Authorization Header (Fallback)
  const accessToken =
    req.cookies["auth_token"] ||
    req.headers.authorization?.replace("Bearer ", "");

  const headers: HeadersInit = {
    "Content-Type": req.headers["content-type"] || "application/json",
  };

  // Only attach auth header if we actually have a token
  if (accessToken) {
    if (process.env.NODE_ENV === "development") {
      // DEVELOPMENT: Use Bearer Token
      headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      // PRODUCTION: Use Cookies
      headers["Cookie"] = `auth_token=${accessToken}`;
    }
  }

  try {
    // 2. Forward the request to the backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_OPENHOUSE_API_URL}${path}`,
      {
        method: req.method,
        headers,
        body:
          req.method === "GET" || req.method === "HEAD"
            ? undefined
            : JSON.stringify(req.body),
      },
    );

    const setCookieHeader = response.headers.get("set-cookie");

    if (setCookieHeader) {
      // Split multiple cookies if they exist
      const cookies = setCookieHeader.split(/,(?=\s*[^;]+=[^;]+)/);
      const isProduction = process.env.NODE_ENV === "production";

      const cleanedCookies = cookies.map((cookie) => {
        let newCookie = cookie
          // Strip Domain: Forces browser to set cookie on "localhost" or current host
          .replace(/;?\s*Domain=[^;]+/i, "")
          // Strip SameSite: We will force it to Lax below
          .replace(/;?\s*SameSite=[^;]+/i, "");

        // Handle Secure: Remove 'Secure' only if we are in Development (HTTP)
        if (!isProduction) {
          newCookie = newCookie.replace(/;?\s*Secure/i, "");
        }
        return newCookie + "; SameSite=Lax";
      });

      res.setHeader("Set-Cookie", cleanedCookies);
    }

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
