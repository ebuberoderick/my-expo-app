import React from 'react'
import { Tabs, useRouter } from 'expo-router'
import TabBar from '../../components/organisms/TabBar'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardAvoidingView, Platform } from 'react-native';

const _layout = () => {
  const router = useRouter()
  enableScreens(false);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'height' : undefined}
    >
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <Tabs screenOptions={{ headerShown: false }} tabBar={props => <TabBar {...props} />}>
            <Tabs.Screen name='index' />
            <Tabs.Screen name='group' />
            <Tabs.Screen name='post' listeners={() => ({
              tabPress: (e) => {
                e.preventDefault()
                router.push("/extars/post")
              }
            })} />
            <Tabs.Screen name='chat' />
            <Tabs.Screen name='profile' />
          </Tabs>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
  )
}

export default _layout