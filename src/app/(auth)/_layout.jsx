import React from 'react'
import { Stack } from 'expo-router'
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const _layout = () => {
  enableScreens(false);
  return (

    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default _layout