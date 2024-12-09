import React from 'react'
import { Stack } from 'expo-router'
import { enableScreens } from 'react-native-screens';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { Platform } from 'react-native';

const _layout = () => {
  enableScreens(false);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Stack screenOptions={{headerShown:false}} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
  
  }

export default _layout