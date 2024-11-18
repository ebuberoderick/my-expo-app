import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { TouchableOpacity } from 'react-native';

const AppInput = ({ placeholder, icon, type, error, onChange }) => {
    const [text, setText] = useState("");
    const [showText, setShowText] = useState(true)

    return (
        <View>
            <View className={`border flex-row gap-x-1 items-center px-2 ${error ? "border-danger" : "border-gray-300 dark:border-gray-700"} rounded-lg`}>
                {icon}
                <TextInput
                    placeholder={placeholder}
                    value={text}
                    secureTextEntry={type === "password" && showText}
                    className="py-4 text-lg flex-grow"
                    onChangeText={text => { setText(text), onChange(text) }}
                />
                {
                    type === "password" && (
                        <TouchableOpacity onPress={() => setShowText(!showText)} >
                            {
                                !showText ? (
                                    <Ionicons name="eye-outline" color={"#9ca3af"} size={25} />
                                ) : (
                                    <Ionicons name="eye-off-outline" color={"#9ca3af"} size={25} />
                                )
                            }
                        </TouchableOpacity>
                    )
                }
                {
                    type === "select" && (
                        <TouchableOpacity className="relative right-2">
                            <FontAwesome name="angle-down" size={25} color={"#9ca3af"} />
                        </TouchableOpacity>
                    )
                }
            </View>
            {error && <Text className="text-danger text-sm">{error}</Text>}
        </View>
    )
}

export default AppInput