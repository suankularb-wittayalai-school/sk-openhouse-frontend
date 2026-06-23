import type { NextApiRequestCookies } from "next/dist/server/api-utils";

type APIResponse<T extends object | string | null = null> =
  | SuccessAPIResponse<T>
  | ErrorApiResponse;

type SuccessAPIResponse<T extends object | string | null = null> = {
  success: true;
  request_id: string;
  timestamp: string;
  data: T;
};

type ErrorApiResponse = {
  success: false;
  request_id: string;
  timestamp: string;
  data: { error: string; message: string };
};

// "Fake" local response to prevent entire page crash.
// When the failing to fetch APIs.
const createErrorResponse = (
  message: string,
  error = "request_failed",
): ErrorApiResponse => ({
  success: false,
  request_id: "unknown",
  timestamp: new Date().toISOString(),
  data: { error, message },
});

export const fetchAPI = async <T extends object | string | null = null>(
  path: string,
  options: RequestInit = {},
  cookies?: NextApiRequestCookies,
): Promise<APIResponse<T>> => {
  const isDevMode = process.env.NODE_ENV === "development";
  const isServer = typeof window === "undefined";
  const hasBody = typeof options.body !== "undefined" && options.body !== null;

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_OPENHOUSE_API_URL + path,
      {
        ...options,
        credentials: isDevMode ? options.credentials : "include",
        headers: {
          ...options.headers,
          // If we're in development, add the `auth_token` via an `Authorization`
          // header.
          ...(isDevMode
            ? {
                Authorization:
                  "Bearer " +
                  (isServer
                    ? cookies?.["auth_token"]
                    : (localStorage.getItem("skopen26-sessionToken") ?? "")),
              }
            : {}),
          // Add a `Content-Type` header automatically if the caller provided a
          // body.
          ...(hasBody ? { "Content-Type": "application/json" } : {}),
          // If we're fetching on the server in production, add the `auth_token`
          // cookie via a `Cookie` header.
          ...(isServer && typeof cookies !== "undefined"
            ? { Cookie: "auth_token=" + cookies["auth_token"] }
            : {}),
        },
      },
    );

    return (await response.json()) satisfies APIResponse<T>;
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error.message : "Network request failed",
      "network_error",
    );
  }
};

export default fetchAPI;
