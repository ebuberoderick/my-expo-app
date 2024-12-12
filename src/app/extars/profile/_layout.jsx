import React from 'react'
import { Stack } from 'expo-router'
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const _layout = () => {
  enableScreens(false);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name='settings' />
              <Stack.Screen name='add-preference' />
              <Stack.Screen name='change-location' />
              <Stack.Screen name='change-password' />
              <Stack.Screen name='personal-data' />
            </Stack>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default _layout