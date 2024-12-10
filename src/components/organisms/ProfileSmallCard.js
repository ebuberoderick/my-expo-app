import { View, Text, Image, Platform, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useUserStore } from '~/Store/holders/UserStore';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import Ionicons from "react-native-vector-icons/Ionicons"
import { API_BASE_URL, getToken } from '~/services/httpService'

const ProfileSmallCard = () => {
    const user = useUserStore((state) => state.storage);
    const updateUserState = useUserStore((state) => state.updateUserState);
    const [processing, setProccessing] = useState(false)

    const uploadImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setProccessing(true)
            const imageUri = result.assets[0].uri;
            const uriParts = imageUri.split('.');
            const fileType = uriParts[uriParts.length - 1]; // Get file extension

            const formData = new FormData();
            formData.append("avatar", {
                uri: imageUri,
                name: `avatar.${fileType}`,
                type: `image/${fileType}`, // Example: image/jpeg or image/png
            });

            try {
                const token = await getToken();
                const headers = {
                    Authorization: token,
                    "Content-Type": "multipart/form-data",
                };

                const response = await axios.post(`${API_BASE_URL}/app/profile/change_avatar`, formData, { headers });

                if (response.status === 200) {
                    const data = {}
                    data.bearer_token = user?.bearer_token
                    data.user = response.data.data[0]
                    updateUserState(data)
                }
            } catch (error) {
                console.error("Error uploading image:", error.response?.data || error.message);
            }
            setProccessing(false)
        }
    };

    return (
        <View className='relative rounded-lg bg-gray-200' style={{ top: 80, backgroundColor: "#80808020" }}>
            <View className='absolute w-full' style={{ top: -70 }}>
                <View style={{ width: 120, height: 120 }} className='relative mx-auto'>
                    <View className={`rounded-full bg-gray-200 overflow-hidden`}>
                        <Image source={{ uri: user?.user?.avatar }} className="w-full h-full rounded-full" />
                        {processing && (<View className='absolute w-full h-full items-center justify-center' style={{ backgroundColor: "#e2e8f0a1" }}>
                            <ActivityIndicator size="large" color="#4CAF50" />
                        </View>)}
                    </View>
                    <TouchableOpacity onPress={uploadImage} className='bg-white absolute bottom-0 right-0 justify-center items-center rounded-full' style={{ width: 40, height: 40 }}>
                        <Ionicons name="camera-outline" size={25} />
                    </TouchableOpacity>
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
    )
}

export default ProfileSmallCard