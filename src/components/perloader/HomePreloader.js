import { View, Text } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'

const HomePreloader = () => {
    return (
        <View className="gap-4">
            <View className="gap-4">
                <View className="flex-row gap-2 items-center">
                    <Animated.View>
                        <Animated.View className="w-11 h-11 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800 rounded-full"></Animated.View>
                    </Animated.View>
                    <View className="gap-1">
                        <Animated.View className="w-44 h-6 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                        <View className="flex-row gap-4">
                            <Animated.View className="w-32 h-4 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                            <Animated.View className="w-24 h-4 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                        </View>
                    </View>
                </View>
                <View>
                    <Animated.View className="h-72 animate-pulse  w-full ease-in-out rounded-3xl duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                </View>
                <View className="gap-1">
                    <Animated.View className="h-4 w-full animate-pulse ease-in-out duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                    <Animated.View className="h-4 w-full animate-pulse ease-in-out duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                    <Animated.View className="h-4 w-1/2 animate-pulse ease-in-out duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                </View>
                <View className="flex-row gap-4">
                    <Animated.View className="w-12 h-6 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                    <Animated.View className="w-12 h-6 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                    <Animated.View className="w-12 h-6 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                </View>
            </View>
            <View className="gap-4">
                <View className="flex-row gap-2 items-center">
                    <Animated.View>
                        <Animated.View className="w-11 h-11 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800 rounded-full"></Animated.View>
                    </Animated.View>
                    <View className="gap-1">
                        <Animated.View className="w-44 h-6 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                        <View className="flex-row gap-4">
                            <Animated.View className="w-32 h-4 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                            <Animated.View className="w-24 h-4 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                        </View>
                    </View>
                </View>
                <View className="gap-1">
                    <Animated.View className="h-4 w-full animate-pulse ease-in-out duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                    <Animated.View className="h-4 w-full animate-pulse ease-in-out duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                    <Animated.View className="h-4 w-full animate-pulse ease-in-out duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                    <Animated.View className="h-4 w-full animate-pulse ease-in-out duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                    <Animated.View className="h-4 w-1/2 animate-pulse ease-in-out duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                </View>
                <View className="flex-row gap-4">
                    <Animated.View className="w-12 h-6 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                    <Animated.View className="w-12 h-6 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                    <Animated.View className="w-12 h-6 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                </View>
            </View><View className="gap-4">
                <View className="flex-row gap-2 items-center">
                    <Animated.View>
                        <Animated.View className="w-11 h-11 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800 rounded-full"></Animated.View>
                    </Animated.View>
                    <View className="gap-1">
                        <Animated.View className="w-44 h-6 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                        <View className="flex-row gap-4">
                            <Animated.View className="w-32 h-4 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                            <Animated.View className="w-24 h-4 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                        </View>
                    </View>
                </View>
                <View>
                    <Animated.View className="h-72 animate-pulse ease-in-out rounded-3xl duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                </View>
                <View className="flex-row gap-4">
                    <Animated.View className="w-12 h-6 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                    <Animated.View className="w-12 h-6 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                    <Animated.View className="w-12 h-6 animate-pulse duration-500 bg-gray-200 dark:bg-gray-800"></Animated.View>
                </View>
            </View>
        </View>
    )
}

export default HomePreloader