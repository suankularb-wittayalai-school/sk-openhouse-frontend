// Imports
import { NextRequest, NextResponse } from "next/server";
import { LangCode } from "@/utils/types/common";
import getLocalePath from "@/utils/helpers/getLocalePaths";
import fetchAPI from "./utils/helpers/fetchAPI";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Get original destination
  const route = req.nextUrl.pathname;
  const locale = req.nextUrl.locale as LangCode;

  const cookieHeader = req.cookies.toString(); 
  const { data: user } = await fetchAPI("/v1/user", {
    method: "GET",
    headers: {
      Cookie: cookieHeader, 
    },
  }).then((res) => res.json());

  console.log("user:", user);

  // Log middleware start
  if (process.env.NODE_ENV === "development")
    console.log(
      `\u001b[1m\x1b[35m →\u001b[0m Running middleware on ${route} …`,
    );

  // Get current page protection type
  const pageRole = (() => {
    return "user";
  })();

  // Decide on destination based on user and page protection type
  const destination = (() => {
    return null;
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
