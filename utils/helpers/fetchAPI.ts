async function fetchAPI(url: string, options: RequestInit) {
  let token: string = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("skopen26-sessionToken") ?? "null";
  }

  // Handle different auth methods for different environments.
  process.env.NODE_ENV == "development"
    ? (options.headers = { Authorization: `Bearer ${token}` })
    : (options.credentials = "include");

  return await fetch(
    `${process.env.NEXT_PUBLIC_OPENHOUSE_API_URL}${url}`,
    options,
  );
}

export default fetchAPI;
