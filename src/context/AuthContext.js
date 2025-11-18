import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState({
    authState: "pending",
  });

  useEffect(() => {
    setTimeout(() => {
      setSession({
        authState: "unAuthenticated",
        // user: {
        //   name: "Raja",
        // },
      });
    }, 2000);
  }, []);

  const logout = () => {
    setSession({
      authState: "unAuthenticated",
    });
  };

  const signin = () => {
    setSession({
      authState: "authenticated",
      user: {
        name: "Raja",
      },
    });
  };

  return (
    <AuthContext.Provider value={{ session, setSession, logout, signin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
