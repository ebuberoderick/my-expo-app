import "../../global.css";
import { Stack } from "expo-router";
import React from 'react';
import { Provider } from "react-redux";
import reduxStore from "../Store/index";
import { PersistGate } from 'redux-persist/integration/react'
import SplashScreen from "../components/organisms/SplashScreen";
import { StatusBar } from "expo-status-bar";
import { enableScreens } from "react-native-screens";
export default function Layout() {
  const { store, persistor } = reduxStore()
  enableScreens(false);
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <Stack screenOptions={{ headerShown: false }} />
      </PersistGate>
    </Provider>
  )
}
