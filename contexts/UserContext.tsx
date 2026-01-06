import { fetchAPI2 } from "@/utils/helpers/fetchAPI";
import type { User } from "@/utils/types/user";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const UserContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
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
