import { View, Text, Image } from 'react-native'
import { UIActivityIndicator } from 'react-native-indicators';
import React from 'react'

const SplashScreen = () => {
    return (
        <View className="flex-1 h-screen w-screen items-center justify-center">
            <Text className="text-3xl font-extrabold text-blue-600">TOTS</Text>
            <View className="absolute bottom-9">
                <UIActivityIndicator size={35} color='#2563eb' />
            </View>
        </View>
    )
}

export default SplashScreen