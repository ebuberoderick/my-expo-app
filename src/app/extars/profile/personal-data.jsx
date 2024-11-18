import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AppLayout from '~/components/layout/AppLayout'
import Button from '~/components/organisms/Button'
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Feather from "react-native-vector-icons/Feather"
import { useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import UseFormHandler from '~/hooks/useFormHandler'
import AppInput from '~/components/organisms/AppInput'

const PersonalData = () => {
    const router = useRouter()
    const user = useSelector((state) => state.User?.value);

    const formHandler = UseFormHandler({
        required: {
            fname: 'Please Enter Your First Name',
            lname: 'Please Enter Your last Name',
            username: 'Please Enter Your Username',
            email: 'Please Enter Your Email',
            password: 'Please Enter Your Password',
            cpassword: 'Please Enter Your Password',
        },
        initialValues: {
            fname: '',
            lname: '',
            username: '',
            email: '',
            password: '',
            cpassword: '',
        },

        onSubmit: async (value) => {
            if (value.password === value.cpassword) {
                if (isSelected) {
                    const { status, data } = await Appregister(value).catch(err => console.log(err))
                    if (data.exception) {
                        formHandler.setError((prevState) => ({ ...prevState, email: "This Email does not exist, Please reconfirm " }))
                    } else {
                        if (status) {
                            SignInAuth(data, dispatch);
                            dispatch(updateAppState({ location: "/(auth)/location" }))
                            router.replace("/(auth)/location")
                        } else {
                            let error = {}
                            for (const key in data.data) {
                                error = { [key]: `${data.data[key][0]}` }
                            }
                            formHandler.setError((prevState) => error)
                            if (data.message === "Username not available") {
                                formHandler.setError((prevState) => ({ ...prevState, username: data.message }))
                            }
                        }
                    }

                } else {
                    formHandler.setError((prevState) => ({ ...prevState, tnc: 'Please accept Term of Service and Privacy Policy' }))
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
                        <Text className='font-medium'>Personal Data</Text>
                    </View>
                </View>
            </View>
            <View className='flex-grow px-3'>
                <View className='relative rounded-lg bg-gray-200' style={{ top: 80, backgroundColor: "#80808020" }}>
                    <View className='absolute w-full' style={{ top: -70 }}>
                        <View style={{ width: 120, height: 120 }} className='relative mx-auto'>
                            <View className={`rounded-full overflow-hidden`}>
                                <Image source={{ uri: user?.user?.avatar }} className="w-full h-full rounded-full" />
                            </View>
                            <View className='bg-white absolute bottom-0 right-0 justify-center items-center rounded-full' style={{ width: 40, height: 40 }}>
                                <Ionicons name="camera-outline" size={25} />
                            </View>
                        </View>
                    </View>
                    <View className='gap-2' style={{ paddingVertical: 56 }}>
                        <Text className='font-medium text-center'>{user?.user?.fname} {user?.user?.lname}</Text>
                        <View className='flex-row flex-wrap justify-center'>
                            <View className=''>
                                <Text className='text-sm px-4' style={{ borderRightWidth: 1 }}>{user?.user?.email}</Text>
                            </View>
                            <View className=''>
                                <Text className='text-sm px-4'>@{user?.user?.username}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='relative gap-5' style={{top:100}}>
                    <AppInput error={formHandler.error?.lname} onChange={e => formHandler.value.lname = e} icon={<EvilIcons name="user" size={30} color={"#9ca3af"} />} placeholder={"Last Name"} />
                    <AppInput error={formHandler.error?.username} onChange={e => formHandler.value.username = e} icon={<Ionicons name="at" size={25} color={"#9ca3af"} />} placeholder={"Username"} />
                    <AppInput error={formHandler.error?.email} onChange={e => formHandler.value.email = e} icon={<Feather name="mail" size={20} color={"#9ca3af"} />} placeholder={"Email"} />
                </View>
            </View>
            <View className='px-3' style={{ paddingBottom: 30 }}>
                <Button text="Save changes" onPress={() => formHandler.submit()} />
            </View>
        </AppLayout>
    )
}

export default PersonalData