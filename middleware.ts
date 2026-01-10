import { type NextRequest, NextResponse } from "next/server";


export async function middleware(req: NextRequest) {
  // Get original destination
  const route = req.nextUrl.pathname;
  const isDevMode = process.env.NODE_ENV === "development";
  const authTokenExists = typeof req.cookies.get("auth_token") !== "undefined";

  // Log middleware start
  if (isDevMode)
    console.log(
      `\u001b[1m\x1b[35m →\u001b[0m Running middleware on ${route} …`,
    );

  // Get current page protection type
  const pageRole = (() => {
    if (route.startsWith("/me")) return "user";
    else return "public";
  })();

  // Decide on destination based on user and page protection type
  const destination = (() => {
    if (pageRole === "user" && !authTokenExists) {
      return "/";
    }
  })();

  // Log middleware end
  if (isDevMode)
    console.log(
      `\u001b[1m\x1b[35m →\x1b[0m\u001b[0m ${
        destination ? `Redirected to ${destination}` : "Continued"
      }`,
    );

  // Redirect if decided so, continue if not
  if (destination) return NextResponse.redirect(new URL(destination, req.url));
  return NextResponse.next();
}
