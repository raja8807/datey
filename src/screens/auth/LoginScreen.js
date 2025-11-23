import React, { useState } from "react";
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
import { useSendOtp } from "../../api_hooks/auth_hooks/auth.hooks";

export default function LoginScreen({
  navigation,
  setTempOtp,
  phoneNumber,
  setPhoneNumber,
}) {
  const { mutateAsync, isPending } = useSendOtp();

  const handleSendOtp = async () => {
    const res = await mutateAsync({
      phone: phoneNumber,
    });

    if (res.otp) {
      setTempOtp(res.otp);
      navigation.navigate("OTP");
    }
  };

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
          <Text style={styles.title}>Enter Your Phone Number</Text>
          <Text style={styles.subtitle}>
            We'll send you a verification code
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor={colors.textSecondary}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              autoFocus
            />
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              // phoneNumber.length < 10 && styles.buttonDisabled,
            ]}
            onPress={handleSendOtp}
            // disabled={phoneNumber.length < 10}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {isPending ? "Loading.." : "Continue"}
            </Text>
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
  inputContainer: {
    marginBottom: 32,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontSize: 18,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.white,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
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
});
