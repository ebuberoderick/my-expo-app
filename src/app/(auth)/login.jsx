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


const Login = () => {

  const dispatch = useDispatch()
  const router = useRouter()
  const [isSelected, setSelection] = useState(false);
  const [formError, setFormError] = useState("")

  const formHandler = UseFormHandler({
    required: {
      email: 'Please Enter Your Email',
      password: 'Please Enter Your Password',
    },
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: async (value) => {
      setFormError("")
      const { status, data } = await Applogin(value).catch(err => console.log(err))
      if (status) {
        SignInAuth(data, dispatch);
        router.replace("/(screen)")
      } else {
        setFormError(data.message);
      }
    }
  })


  return (
    <View className="flex-1 bg-white dark:bg-black pb-16 gap-3 justify-center">
      <View className="flex-grow justify-center">
        <Image source={require("../../assets/images/loginImage.png")} className="w-full relative top-12 h-2/3" />
      </View>
      <View className="gap-7 px-3">
        <Text className="text-3xl dark:text-white font-extrabold">Login</Text>
        <View>
          <Text className="text-danger text-sm">{formError}</Text>
          <View className="gap-5">
            <AppInput error={formHandler.error?.email} onChange={e => formHandler.value.email = e} icon={<EvilIcons name="user" size={35} color={"#9ca3af"} />} placeholder={"Email"} />
            <AppInput error={formHandler.error?.password} onChange={e => formHandler.value.password = e} icon={<Ionicons name="lock-open-outline" size={25} color={"#9ca3af"} />} placeholder={"Password"} type={"password"} />
            <View className="flex-row">
              <View className="flex-row gap-2 items-center flex-grow">
                <View className="">
                  <Checkbox value={isSelected} onValueChange={setSelection} color={isSelected && '#2877F2'} />
                </View>
                <Text className="text-xl dark:text-white">Remember me</Text>
              </View>
              <Link href="forget-password" className='dark:text-white'>Forget password?</Link>
            </View>

          </View>
        </View>
        <View className="gap-4 pb-16">
          <Button processing={formHandler.proccessing} text="login" onPress={() => formHandler.submit()} />
          <Text className="text-center dark:text-white text-xl">Don’t have an account? <Link href="register" className='text-blue'>Sign up</Link></Text>
        </View>
      </View>
    </View>
  )
}

export default Login