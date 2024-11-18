import { Text, View } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import Button from '../../components/organisms/Button'
import { useRouter } from 'expo-router'

const ForgotPassword = () => {
    const router = useRouter()
    return (
        <View className="flex-1 bg-white pb-16 gap-3 justify-center">
            <View className="flex-grow items-center justify-center">
                <AntDesign name="checkcircle" color="#2877F2" size={120} />
                <View className="pt-6">
                    <Text className="text-3xl font-extrabold text-center">Success</Text>
                    <Text className="text-center">Password reset is successful</Text>
                </View>
            </View>
            <View className="gap-7 px-3">
                <View className="gap-4">
                    <Button text="continue to app" onPress={() => router.replace("/(auth)/login")} />
                </View>
            </View>
        </View>
    )
}

export default ForgotPassword