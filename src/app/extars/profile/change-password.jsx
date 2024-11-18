import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import AppLayout from '~/components/layout/AppLayout'
import Button from '~/components/organisms/Button'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useRouter } from 'expo-router'

const ChangePassword = () => {
    const router = useRouter()
    return (
        <AppLayout>
            <View className="h-14 items-center px-4 gap-3 flex-row sticky top-0">
                <View className="flex-grow">
                    <View className='flex-row items-center gap-3'>
                        <TouchableOpacity onPress={() => router.back()} style={{ height: 40, width: 40 }} className="items-center justify-center border border-gray-300 rounded-full">
                            <FontAwesome name="angle-left" size={30} style={{ position: 'relative', right: 1 }} />
                        </TouchableOpacity>
                        <Text className='font-medium'>Change Password</Text>
                    </View>
                </View>
            </View>
            <View className='flex-grow'>
                
            </View>
            <View className='px-3' style={{paddingBottom:30}}>
                <Button text="Save changes" onPress={() => router.replace("/(auth)/login")} />
            </View>
        </AppLayout>
    )
}

export default ChangePassword