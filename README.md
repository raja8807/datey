# Datey - Dating App UI

A modern React Native + Expo dating app UI built with React Native StyleSheet (no Tailwind).

## Features

### Authentication Flow
- Welcome Screen with gradient background
- Login Screen with phone number input
- OTP Verification Screen with 6-digit code input

### Profile Setup
- Basic Info Screen (Name, Age, Gender)
- Upload Photos Screen with image picker (6 photo slots)
- Preferences Screen (Age range, Distance, Interests)

### Main App Screens
- **Home/Swipe Screen**: Tinder-style swipe cards with gesture handling
- **Explore Screen**: Grid view of users with search and filters
- **Matches Screen**: List of matches with last messages
- **Chat Screen**: WhatsApp-like messaging interface
- **Profile Screen**: User profile with edit option

## Tech Stack

- React Native
- Expo
- React Navigation (Stack & Bottom Tabs)
- Expo Linear Gradient
- Expo Image Picker
- React Native Gesture Handler
- React Native Reanimated

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npm start
```

3. Run on your device:
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator / `a` for Android emulator

## Project Structure

```
/src
  /screens
    /auth          # Authentication screens
    /profile       # Profile setup screens
    /main          # Main app screens
  /components      # Reusable components
  /navigation      # Navigation configuration
  /data           # Dummy data
  /styles         # Color scheme and common styles
```

## Navigation Flow

1. **Auth Stack**: Welcome → Login → OTP
2. **Profile Setup Stack**: Basic Info → Upload Photos → Preferences
3. **Main App**: Bottom Tab Navigator with Home, Explore, Matches, Profile

## Notes

- All styling uses React Native StyleSheet (no Tailwind)
- Dummy data is stored locally in `/src/data`
- No backend integration - UI only
- Image picker requires camera roll permissions
- Swipe functionality uses PanResponder for gesture handling

## Development

The app starts with the authentication flow. After completing OTP verification, you'll be taken to the profile setup flow, and then to the main app.

To skip directly to the main app for testing, modify `src/navigation/AppNavigator.js` and change the `initialRouteName` to `"MainApp"`.

