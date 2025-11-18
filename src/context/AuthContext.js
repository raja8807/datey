import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/Supabase";
// import { createClient } from '@supabase/supabase-js'

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState({
    authState: "pending",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log("---> auth sessesin", data);
      setSession({});
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, changedSession) => {
        console.log("---> auth state change", changedSession);
        setSession({});
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const logout = () => {
    setSession({
      authState: "unAuthenticated",
    });
  };

  const signin = ({ otp }) => {
    if (otp === "123456") {
      setSession({
        authState: "authenticated",
        user: {
          name: "Raja",
        },
      });
    } else {
      setSession({
        authState: "authenticated",
        user: null,
      });
    }
  };

  const updateProfile = (profile) => {
    setSession((prev) => {
      return {
        ...prev,
        user: profile,
      };
    });
  };

  async function sendOtp(phone) {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
    });

    console.log("data--->", data);
    console.log("error--->", error);

    if (error) throw error;
    return data;
  }

  async function verifyOtp(phone, token) {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: "sms",
    });

    if (error) throw error;
    return data.session;
  }

  return (
    <AuthContext.Provider
      value={{ session, logout, signin, updateProfile, sendOtp, verifyOtp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
