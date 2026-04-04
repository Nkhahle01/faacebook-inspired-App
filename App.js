import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  // app container provider from safe area
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
