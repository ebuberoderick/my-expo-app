import { View, Text, Animated, Image, Platform, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Button from '../../components/organisms/Button'
import { useLocalSearchParams, useRouter } from 'expo-router'
import UseFormHandler from '../../hooks/useFormHandler'
import { TouchableOpacity } from 'react-native'
import { OTPTextInput } from '@sectiontn/otp-input'
import { AppVerifyOtp } from '../../services/authService'

const Otp = () => {

    const router = useRouter()
    const [counter, setCounter] = useState(60);
    const OTPRef = useRef(null);
    const URL = useLocalSearchParams()

    const formHandler = UseFormHandler({
        required: {
            otp: 'Please Enter Your Email',
        },
        initialValues: {
            otp: '',
            email: URL.email
        },
        onSubmit: async (value) => {
            if (value.otp.length === 4) {
                const { status, data } = await AppVerifyOtp(value).catch(err => console.log(err))
                if (status) {
                    router.replace(`new-password?email=${value?.email}`)
                } else {
                    formHandler.setError((prevState) => ({ ...prevState, otp: data.message }))
                }
            }
            formHandler.setError((prevState) => ({ ...prevState, otp: "OTP is not complete" }))
        }
    })

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    return (
        <View className="flex-1 justify-center bg-white pt-36 gap-3">
            <View className="absolute" style={{ top: 50, left: 12 }}>
                <TouchableOpacity onPress={() => router.back()} style={{ height: 40, width: 40 }} className="items-center justify-center border border-gray-300 rounded-full">
                    <FontAwesome name="angle-left" size={30} style={{ position: 'relative', right: 1 }} />
                </TouchableOpacity>
            </View>
            <View style={{ height: "80%" }} className="">
                <View className="">
                    <Image source={require("../../assets/images/keypadlocksmall.png")} className="mx-auto" />
                </View>
                <View className="gap-7 px-3">
                    <Text className="text-center text-xl">4 digit code sent to {URL.email.split("@")[0].substring(0, 5)}*****@{URL.email.split("@")[1]}</Text>
                    <View style={{ width: "70%" }} className="mx-auto relative">
                        <OTPTextInput
                            ref={OTPRef}
                            inputCount={4}
                            tintColor={"#2877F2"}
                            offTintColor={"#e2e8f0"}
                            onTextChangeHandler={(pin) => {
                                formHandler.value.otp = pin;
                            }}
                            containerStyle={OTPStyles.container}
                            textInputStyle={OTPStyles.textInput}
                            editable={true}
                            autoFocus={true}
                            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                        />
                        <Text className="text-danger text-xs absolute w-full text-center -bottom-5">{formHandler.error?.otp}</Text>
                    </View>
                    <Text className="text-center">Didn’t receive the code? Resend in {counter} seconds.</Text>
                    <View className="gap-4">
                        <Button processing={formHandler.proccessing} text="continue" onPress={() => formHandler.submit()} />
                    </View>
                </View>
            </View>
        </View>
    )
}


const OTPStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6
    },
    textInput: {
        height: 56,
        width: 56,
        borderBottomWidth: 1,
        borderWidth: 1,
        margin: 1,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '500',
        color: '#000000',
    },
});

export default Otp