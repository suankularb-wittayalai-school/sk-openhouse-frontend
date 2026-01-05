async function fetchAPI(url: string, options: RequestInit) {
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
}

export default fetchAPI;
