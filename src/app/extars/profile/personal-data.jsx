import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React from 'react'
import AppLayout from '~/components/layout/AppLayout'
import Button from '~/components/organisms/Button'
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Feather from "react-native-vector-icons/Feather"
import AppSelect from '../../../components/organisms/AppSelect'
import { useRouter } from 'expo-router'
import UseFormHandler from '~/hooks/useFormHandler'
import AppInput from '~/components/organisms/AppInput'
import { useUserStore } from '~/Store/holders/UserStore'
import ProfileSmallCard from '~/components/organisms/ProfileSmallCard'
import { UpdateUserProfile } from '~/services/authService'

const PersonalData = () => {
    const router = useRouter()
    const updateUserState = useUserStore((state) => state.updateUserState);
    const user = useUserStore((state) => state.storage);

    const gender = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
    ]

    const formHandler = UseFormHandler({
        required: {
            fname: 'Please Enter Your First Name',
            lname: 'Please Enter Your Last Name',
            username: 'Please Enter Your Username',
            gender: 'Please Select Your Gender',
            phone: 'Please Enter Phone'
        },
        initialValues: {
            fname: user?.user?.fname,
            lname: user?.user?.lname,
            username: user?.user?.username,
            gender: user?.user?.gender,
            phone: user?.user?.phone
        },

        onSubmit: async (value) => {
            const { data, status } = await UpdateUserProfile(value)

            if (status) {
                console.log(data);
                const daa = {}
                daa.bearer_token = user?.bearer_token
                daa.user = data.data[0]
                updateUserState(daa)
                router.back()
            } else {
                // let error = {};
                // for (const key in data.data) {
                //     // error = { [key]: `${data.data[key][0]}` };
                //     error = {
                //         [key]: `${data.data[key][0]}`
                //     }
                // }
                const error = []
                for (const key in data.data) {
                    // error = { [key]: `${data.data[key][0]}` };
                    error.push({ [key]: `${data.data[key][0]}` })
                }
                console.log(data);
                formHandler.setError({...error});
                console.log(formHandler.error);

            }
        }
    })

    return (
        <AppLayout>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className='pt-12 flex-1'>
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
                            <ProfileSmallCard />
                            <View className='relative gap-5' style={{ top: 100 }}>
                                <AppInput defaultValue={user?.user?.fname} error={formHandler.error?.fname} onChange={e => formHandler.value.fname = e} icon={<EvilIcons name="user" size={30} color={"#9ca3af"} />} placeholder={"First Name"} />
                                <AppInput defaultValue={user?.user?.lname} error={formHandler.error?.lname} onChange={e => formHandler.value.lname = e} icon={<EvilIcons name="user" size={30} color={"#9ca3af"} />} placeholder={"Last Name"} />
                                <AppInput defaultValue={user?.user?.username} error={formHandler.error?.username} onChange={e => formHandler.value.username = e} icon={<Ionicons name="at" size={25} color={"#9ca3af"} />} placeholder={"Username"} />
                                <AppSelect error={formHandler.error?.gender} onChange={e => { formHandler.value.gender = e.value }} options={gender} placeholder={"Gender"} icon={<Ionicons name="transgender-outline" size={25} color={"#9ca3af"} />} />
                                <AppInput defaultValue={user?.user?.phone} error={formHandler.error?.phone} onChange={e => formHandler.value.phone = e} icon={<Feather name="phone" size={20} color={"#9ca3af"} />} placeholder={"Phone"} />
                            </View>
                        </View>
                        <View className='px-3' style={{ paddingBottom: 30 }}>
                            <Button text="Save changes" onPress={() => formHandler.submit()} />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </AppLayout>
    )
}

export default PersonalData
