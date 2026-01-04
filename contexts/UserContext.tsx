import { user } from "@/utils/types/user";
import { createContext } from "react";

const UserContext = createContext<{
  user: user | null;
  setUser: (user: user) => void;
}>({ user: null, setUser: () => {} });

export default UserContext;
