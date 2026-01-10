import { User } from "@/utils/types/user";

/**
 * Checks for the user type; returns "guest" or "staff".
 *
 * @param user  The user to check.  [User, required]
 * @return      The user type.      [str]
 */


const getUserType = (user?: User) => {
  if (!user) return "guest";
  return !(
    user.email.includes("@sk.ac.th") ||
    user.email.includes("@student.sk.ac.th")
  )
    ? "guest"
    : "staff";
};

export default getUserType;
