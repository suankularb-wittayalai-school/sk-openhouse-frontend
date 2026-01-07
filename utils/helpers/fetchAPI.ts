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

export const fetchAPI = async <T extends object | string | null = null>(
  path: string,
  options: RequestInit = {},
  cookies?: NextApiRequestCookies,
): Promise<APIResponse<T>> => {
  const isDevMode = process.env.NODE_ENV === "development";
  const hasBody = typeof options.body !== "undefined" || options.body !== null;

  const response = await fetch(
    process.env.NEXT_PUBLIC_OPENHOUSE_API_URL + path,
    {
      ...options,
      credentials: isDevMode ? options.credentials : "include",
      headers: {
        ...options.headers,
        ...(isDevMode
          ? {
              Authorization:
                "Bearer " +
                (typeof window === "undefined"
                  ? cookies?.["auth_token"]
                  : (localStorage.getItem("skopen26-sessionToken") ?? "")),
            }
          : {}),
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
      },
    },
  );

  return (await response.json()) satisfies APIResponse<T>;
};

export default fetchAPI;
