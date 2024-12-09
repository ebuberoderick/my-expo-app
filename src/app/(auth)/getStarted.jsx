import { View, Text } from 'react-native'
import React from 'react'
import Button from '../../components/organisms/Button'
import { useRouter } from 'expo-router'
import { Image } from 'react-native'
import { useAppDefaulstore } from '~/Store/holders/AppDefault'




const GetStarted = () => {
    const { updateAppState } = useAppDefaulstore()
    const router = useRouter()

    const getgoing = () => {
        updateAppState({ getStarted: true })
        router.replace("login")
    }

    return (
        <View className="flex-1 bg-white dark:bg-black pb-16 gap-3 justify-center">
            <View className="flex-grow justify-center">
                <Image source={require("../../assets/images/welcome.png")} className="w-screen relative top-12" style={{ height: "80%" }} />
            </View>
            <View className="gap-7 px-3">
                <View className="gap-5 mx-auto" style={{ width: 350 }}>
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