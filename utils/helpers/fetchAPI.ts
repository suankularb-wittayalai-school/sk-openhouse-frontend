const fetchAPI = async (
  url: string,
  options: RequestInit,
): Promise<Response> => {
  console.warn("`fetchAPI` is DEPRECATED!!!! Please phase out to `fetchAPI2`.");
  const headers = new Headers(options.headers);

  let token: string = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("skopen26-sessionToken") ?? "null";
  }

  if (process.env.NODE_ENV === "development") {
    headers.set("Authorization", `Bearer ${token}`);
  } else {
    options.credentials = "include";
  }

  options.headers = headers;

  return await fetch(
    `${process.env.NEXT_PUBLIC_OPENHOUSE_API_URL}${url}`,
    options,
  );
};

type APIResponse<T extends object | null = null> =
  | SuccessAPIResponse<T>
  | ErrorApiResponse;

type SuccessAPIResponse<T extends object | null = null> = {
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

// FIXME: Rename when fully migrated
export const fetchAPI2 = async <T extends object | null = null>(
  path: string,
  options: RequestInit = {},
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
              Authorization: `Bearer ${localStorage.getItem("skopen26-sessionToken")}`,
            }
          : {}),
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
      },
    },
  );

  return (await response.json()) satisfies APIResponse<T>;
};

export default fetchAPI;
