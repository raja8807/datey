import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import OTPScreen from "../screens/auth/OTPScreen";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const [tempOtp, setTempOtp] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />

      <Stack.Screen name="Login">
        {(props) => (
          <LoginScreen
            {...props}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            setTempOtp={setTempOtp}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="OTP">
        {(props) => (
          <OTPScreen {...props} tempOtp={tempOtp} phoneNumber={phoneNumber} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
