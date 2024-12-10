import "../../global.css";
import { Stack } from "expo-router";
import React from 'react';
import { StatusBar } from "expo-status-bar";
import { enableScreens } from "react-native-screens";
export default function Layout() {
  enableScreens(false);
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(screen)" />
        <Stack.Screen name="extars" />
      </Stack>
    </>
  )
}
