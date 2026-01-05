// Imports
import { NextRequest, NextResponse } from "next/server";
import { LangCode } from "@/utils/types/common";
import getLocalePath from "@/utils/helpers/getLocalePaths";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Get original destination
  const route = req.nextUrl.pathname;
  const locale = req.nextUrl.locale as LangCode;

  const cookieHeader = req.cookies.toString();
  const filteredPart = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .filter((c) => c.startsWith("auth_token"));

  let cookieValue = undefined;
  if (filteredPart.length == 1) {
    cookieValue = filteredPart[0].split("=")[1];
  }
  // Log middleware start
  if (process.env.NODE_ENV === "development")
    console.log(
      `\u001b[1m\x1b[35m →\u001b[0m Running middleware on ${route} …`,
    );

  // Get current page protection type
  const pageRole = (() => {
    if (route === "/me") return "user";
    else return "public";
  })();

  // Decide on destination based on user and page protection type
  const destination = (() => {
    if (pageRole == "user" && !req.cookies.toString().includes("auth_token")) {
      return "/";
    }
  })();

  // Log middleware end
  if (process.env.NODE_ENV === "development")
    console.log(
      `\u001b[1m\x1b[35m →\x1b[0m\u001b[0m ${
        destination ? `Redirected to ${destination}` : "Continued"
      }`,
    );

  // Redirect if decided so, continue if not
  if (destination)
    return NextResponse.redirect(
      new URL(getLocalePath(destination, locale), req.url),
    );
  return NextResponse.next();
}
