import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { enableScreens } from 'react-native-screens';

const _layout = () => {
    enableScreens(false);
    return <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='login' redirect="/(auth)/login" />
    </Stack>
}

export default _layout