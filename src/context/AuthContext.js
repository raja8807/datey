import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/Supabase";
import API from "../config/api.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState({
    authState: "pending",
    data: null,
    user: null,
  });

  const getCurrentUser = () => {
    return {
      name: "Raja",
      gender: "Male",
      age: "25",
    };
  };

  useEffect(() => {
    // ---------- INITIAL SESSION CHECK ----------
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        const user = getCurrentUser(data.session.user.id);

        setSession({
          authState: "authenticated",
          data: data.session,
          user,
        });
      } else {
        setSession({
          authState: "unAuthenticated",
          data: null,
          user: null,
        });
      }
    });

    // ---------- AUTH STATE CHANGE LISTENER ----------
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, changedSession) => {
        console.log("AUTH EVENT =", event);

        switch (event) {
          case "SIGNED_IN":
          case "TOKEN_REFRESHED":
          case "USER_UPDATED":
          case "INITIAL_SESSION":
            if (changedSession?.user) {
              const user = getCurrentUser(changedSession.user.id);

              setSession({
                authState: "authenticated",
                data: changedSession,
                user,
              });
            } else {
              setSession({
                authState: "unAuthenticated",
                data: null,
                user: null,
              });
            }
            break;

          case "SIGNED_OUT":
            setSession({
              authState: "unAuthenticated",
              data: null,
              user: null,
            });
            break;

          default:
            break;
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // ---------- LOGOUT ----------
  const logout = async () => {
    try {
      console.log("ok--->>");
      await supabase.auth.signOut();
      await AsyncStorage.clear();
    } catch (er) {
      console.log(er);
    }
  };

  // ---------- UPDATE PROFILE LOCALLY ----------
  const updateProfile = (profile) => {
    setSession((prev) => ({
      ...prev,
      user: profile,
    }));
  };

  // ---------- OTP SEND ----------
  const sendOtp = async ({ phone }) => {
    try {
      const response = await API.post("/api/auth/otp/send", { phone });
      return response.data;
    } catch (error) {
      console.log("GET Error:", error);
      throw error;
    }
  };

  // ---------- OTP VERIFY ----------
  // (kept exactly as you wrote it)
  const verifyOtp = async ({ phone, otp }) => {
    console.log(otp);

    const res = await supabase.auth.verifyOtp({
      type: "magiclink",
      token: otp,
      email: `91${phone}@datey.app`,
    });

    console.log(res);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        logout,
        updateProfile,
        sendOtp,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
