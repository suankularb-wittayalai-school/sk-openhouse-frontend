import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
}

const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export function LoginProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedInState] = useState<boolean>(false);

  /* save to local storage for now */
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("loginStatus");
    if (storedLoginStatus !== null) {
      setIsLoggedInState(JSON.parse(storedLoginStatus));
    }
  }, []);

  const setIsLoggedIn = (newStatus: boolean) => {
    setIsLoggedInState(newStatus);
    localStorage.setItem("loginStatus", JSON.stringify(newStatus));
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
}

export const useLogin = () => useContext(LoginContext);
export default LoginContext;
