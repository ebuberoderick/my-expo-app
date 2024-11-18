import { View, Text } from 'react-native'
import React from 'react'

const AppLayout = ({toTop,children}) => {
  return (
    <View className={`flex flex-1 ${!toTop && "pt-9"} dark:bg-black bg-white`}>
      {children}
    </View>
  )
}

export default AppLayout