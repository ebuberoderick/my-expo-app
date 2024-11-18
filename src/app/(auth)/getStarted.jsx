import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AppInput from '../../components/organisms/AppInput'
import Ionicons from "react-native-vector-icons/Ionicons"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Button from '../../components/organisms/Button'
import { Link, useRouter } from 'expo-router'
import UseFormHandler from '../../hooks/useFormHandler'
import { Applogin } from '../../services/authService'
import { SignInAuth } from '../../hooks/Auth'
import { useDispatch } from 'react-redux'
import { Image } from 'react-native'
import Checkbox from 'expo-checkbox'
import { updateAppState } from '../../Store/reducers/AppDefault'


const GetStarted = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const getgoing = () => {
        dispatch(updateAppState({ getStarted: true }))
        router.replace("login")
    }

    return (
        <View className="flex-1 bg-white dark:bg-black pb-16 gap-3 justify-center">
            <View className="flex-grow justify-center">
                <Image source={require("../../assets/images/welcome.png")} className="w-screen relative top-12" style={{height:"80%"}} />
            </View>
            <View className="gap-7 px-3">
                <View className="gap-5 mx-auto" style={{ width: 390 }}>
                    <Text className="font-bold dark:text-white text-center" style={{ fontSize: 40 }}>Connect, <Text className="text-blue">Learn & Share</Text> as a Mom</Text>
                    <Text className="text-center dark:text-white">Connect, learn, and find support as you embark on the beautiful journey of motherhood.</Text>
                </View>
                <View className="gap-4">
                    <Button text="get started" onPress={getgoing} />
                </View>
            </View>
        </View>
    )
}

export default GetStarted