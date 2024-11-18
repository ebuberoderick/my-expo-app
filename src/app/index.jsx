import { View } from 'react-native'
import React, { useEffect } from 'react'
import SplashScreen from '../components/organisms/SplashScreen'
import { useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import { Session } from '../hooks/Auth'

const index = () => {
  const router = useRouter()
  const user = useSelector((state) => state.User);
  const appState = useSelector((state) => state.appDefault);
  const isAuthenticated = Session(user);
  useEffect(() => {
    setTimeout(() => {
      if (appState?.getStarted) {
        if (appState.location === "") {
          if (isAuthenticated.status === "authenticated") {
            router.replace("/(screen)")
          } else {
            router.replace("/(auth)/login")
          }
        } else {
          router.replace(appState.location)
        }
      }else{
        router.replace("/(auth)/getStarted")
      }

    }, 3000);
  }, [])
  return (
    <View className="bg-white flex-1">
      <SplashScreen />
    </View>
  )
}

export default index