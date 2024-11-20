import { View, Text } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'

const AppLayout = ({ toTop, children }) => {
  return (
    <View className={`flex flex-1 ${!toTop && ""} dark:bg-black bg-white`}>
      <BlurView experimentalBlurMethod='dimezisBlurView' intensity={40} className="absolute z-50 top-0 flex-row">
        <View className='h-12 w-screen'></View>
      </BlurView>
      {children}
    </View>
  )
}

export default AppLayout