import { fetchAPI2 } from "@/utils/helpers/fetchAPI";
import type { User } from "@/utils/types/user";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const UserContext = createContext<{
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}>({ user: null, setUser: () => {}, isLoading: true, setIsLoading: () => {} });

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAPI2<User>("/v1/user").then((body) => {
      if (body.success) setUser(body.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
export default UserContext;
