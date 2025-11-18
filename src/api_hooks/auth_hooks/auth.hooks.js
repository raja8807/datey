import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";

export const useSendOtp = () => {
  const { sendOtp } = useAuth();
  return useMutation({
    mutationFn: sendOtp,
  });
};

export const useVerifyOtp = () => {
  const { verifyOtp } = useAuth();
  return useMutation({
    mutationFn: verifyOtp,
  });
};
