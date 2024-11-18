import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import AppLayout from '~/components/layout/AppLayout'
import Button from '~/components/organisms/Button'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useRouter } from 'expo-router'
import UseFormHandler from '~/hooks/useFormHandler'
import Ionicons from "react-native-vector-icons/Ionicons"
import { AppUpdatePassword } from '~/services/authService'
import AppInput from '~/components/organisms/AppInput'
import { useSelector } from 'react-redux'
import * as Burnt from "burnt";

const ChangePassword = () => {
    const router = useRouter()
    const user = useSelector((state) => state.User?.value);


    const formHandler = UseFormHandler({
        required: {
            old_password: 'Please Enter Your Password',
            new_password: 'Please Enter Your Password',
            cpassword: 'Please Enter Your Password',
        },
        initialValues: {
            new_password: '',
            cpassword: '',
            old_password: '',
            email: user?.user?.email
        },

        onSubmit: async (value) => {
            if (value.new_password === value.cpassword) {
                if (value.new_password.length > 7) {
                    const { status, data } = await AppUpdatePassword(value).catch(err => console.log(err))
                    if (status) {
                        Burnt.alert({
                            title: "Password Updated.",
                            preset: "done",
                            from: "top",
                            haptic: "success",
                            message: "Your Password was updated .",
                        });
                        router.back()
                    } else {

                        formHandler.setError((prevState) => ({ ...prevState, old_password: data.message }))
                    }
                } else {
                    formHandler.setError((prevState) => ({ ...prevState, new_password: 'Password length should be at least 8 charaters' }))
                }
            } else {
                formHandler.setError((prevState) => ({ ...prevState, cpassword: 'Password Mis-match' }))
            }
        }
    })


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
                <View className="gap-5 pb-9 p-3">
                    <AppInput error={formHandler.error?.old_password} onChange={e => formHandler.value.old_password = e} icon={<Ionicons name="lock-open-outline" size={25} color={"#9ca3af"} />} placeholder={"Enter Old Password"} type={"password"} />
                    <AppInput error={formHandler.error?.new_password} onChange={e => formHandler.value.new_password = e} icon={<Ionicons name="lock-open-outline" size={25} color={"#9ca3af"} />} placeholder={"Enter New Password"} type={"password"} />
                    <AppInput error={formHandler.error?.cpassword} onChange={e => formHandler.value.cpassword = e} icon={<Ionicons name="lock-open-outline" size={25} color={"#9ca3af"} />} placeholder={"Confirm New Password"} type={"password"} />
                </View>
            </View>
            <View className='px-3' style={{ paddingBottom: 30 }}>
                <Button text="Save changes" processing={formHandler.proccessing} onPress={() => formHandler.submit()} />
            </View>
        </AppLayout>
    )
}

export default ChangePassword