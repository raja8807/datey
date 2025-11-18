import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../styles/colors";
import { useAuth } from "../../context/AuthContext";
import { useVerifyOtp } from "../../api_hooks/auth_hooks/auth.hooks";

export default function OTPScreen({ tempOtp }) {
  const { mutateAsync: verifyOtpAsync, isPending } = useVerifyOtp();

  // const [otp, setOtp] = useState(["", "", "", "", "", "", "", ""]);
  const [otp, setOtp] = useState(tempOtp.split(""));
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 78) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    await verifyOtpAsync({
      phone: "7812804856",
      otp: otp.join(""),
    });
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Enter Verification Code</Text>
          <Text style={styles.subtitle}>
            We sent a 6-digit code to your phone
          </Text>
          <Text style={styles.subtitle}>Otp is {tempOtp}</Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.otpInput}
                value={digit}
                onChangeText={(value) => handleOtpChange(index, value)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(index, nativeEvent.key)
                }
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, !isOtpComplete && styles.buttonDisabled]}
            onPress={handleVerify}
            // disabled={!isOtpComplete}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {isPending ? "Loading.." : "Verify"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resendButton}>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    marginBottom: 48,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 48,
    paddingHorizontal: 8,
  },
  otpInput: {
    width: 35,
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 12,
    textAlign: "center",
    fontSize: 24,
    // fontWeight: "600",
    color: colors.text,
  },
  button: {
    backgroundColor: colors.white,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "600",
  },
  resendButton: {
    alignItems: "center",
  },
  resendText: {
    color: colors.white,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
