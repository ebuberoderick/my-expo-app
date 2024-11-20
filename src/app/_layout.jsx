import "../../global.css";
import { Slot, Stack } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler } from "react-native";
import { Provider } from "react-redux";
import reduxStore from "../Store/index";
import { PersistGate } from 'redux-persist/integration/react'
import SplashScreen from "../components/organisms/SplashScreen";
import { StatusBar } from "expo-status-bar";
import { enableScreens } from "react-native-screens";
import BottomSheetModalProvider from "@gorhom/bottom-sheet";
export default function Layout() {
  const { store, persistor } = reduxStore()
  enableScreens(false);
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        {/* <BottomSheetModalProvider> */}
          <Stack screenOptions={{ headerShown: false }} />
        {/* </BottomSheetModalProvider> */}
      </PersistGate>
    </Provider>
  )
}
