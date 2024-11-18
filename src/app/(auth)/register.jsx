import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import AppInput from '../../components/organisms/AppInput'
import Button from '../../components/organisms/Button'
import { Link, useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'
import UseFormHandler from '../../hooks/useFormHandler'
import Feather from 'react-native-vector-icons/Feather'
import Checkbox from 'expo-checkbox'
import { updateAppState } from '../../Store/reducers/AppDefault'
import { Appregister } from '../../services/authService'
import { SignInAuth } from '../../hooks/Auth'

const Register = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [isSelected, setSelection] = useState(false);

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
        <View className="flex-1 bg-white pb-16 pt-20 gap-3 justify-center">
            <View className="gap-7 px-3 flex-1">
                <View className="gap-20 justify-center flex-grow">
                    <View>
                        <Text className="text-3xl font-extrabold">Create Account</Text>
                        <Text className="text-xl">Welcome aboard! Just a few steps to set up your account.</Text>
                    </View>
                    <View className="gap-5">
                        <AppInput error={formHandler.error?.fname} onChange={e => formHandler.value.fname = e} icon={<EvilIcons name="user" size={30} color={"#9ca3af"} />} placeholder={"First Name"} />
                        <AppInput error={formHandler.error?.lname} onChange={e => formHandler.value.lname = e} icon={<EvilIcons name="user" size={30} color={"#9ca3af"} />} placeholder={"Last Name"} />
                        <AppInput error={formHandler.error?.username} onChange={e => formHandler.value.username = e} icon={<Ionicons name="at" size={25} color={"#9ca3af"} />} placeholder={"Username"} />
                        <AppInput error={formHandler.error?.email} onChange={e => formHandler.value.email = e} icon={<Feather name="mail" size={20} color={"#9ca3af"} />} placeholder={"Email"} />
                        <AppInput error={formHandler.error?.password} onChange={e => formHandler.value.password = e} icon={<Ionicons name="lock-open-outline" size={25} color={"#9ca3af"} />} placeholder={"Password"} type={"password"} />
                        <AppInput error={formHandler.error?.cpassword} onChange={e => formHandler.value.cpassword = e} icon={<Ionicons name="lock-open-outline" size={25} color={"#9ca3af"} />} placeholder={"Confirm Password"} type={"password"} />
                        <View>
                            <Text className="text-danger text-sm">{formHandler.error?.tnc}</Text>
                            <View className="flex-row justify-start gap-2 pr-5">
                                <View className="relative top-1">
                                    <Checkbox value={isSelected} onValueChange={setSelection} color={isSelected && '#2877F2'} />
                                </View>
                                <View className="">
                                    <Text className="text-lg relative bottom-1">By signing up, you agree to our <Link href="/" className='text-blue'>Terms of Service</Link> and <Link href="/" className='text-blue'>Privacy Policy?</Link></Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="gap-4">
                    <Button processing={formHandler.proccessing} text="create account" onPress={() => formHandler.submit()} />
                    <Text className="text-center text-xl">Already have an account? <Link href="login" className='text-blue'>Login</Link></Text>
                </View>
            </View>
        </View>
    )
}

export default Register