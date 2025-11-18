import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import OTPScreen from "../screens/auth/OTPScreen";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const [tempOtp, setTempOtp] = useState(null);

  console.log(tempOtp);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        initialParams={{ setTempOtp }}
      />
      <Stack.Screen
        name="OTP"
        component={(props) => {
          return <OTPScreen props={props} tempOtp={tempOtp} />;
        }}
      />
    </Stack.Navigator>
  );
}
