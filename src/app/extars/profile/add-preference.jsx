import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppLayout from '~/components/layout/AppLayout'
import Button from '~/components/organisms/Button'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useRouter } from 'expo-router'
import { fetchPrefrence } from '~/services/authService'
import PrefernceChip from '~/components/organisms/PrefernceChip'

const Addpreference = () => {
    const router = useRouter()

    const [list, setList] = useState([])
    const [prefernceList, setPrefernceList] = useState([])

    const getPrefrence = async () => {
        const { status, data } = await fetchPrefrence().catch(err => console.log(err))
        if (status) {
            const saveData = []
            await data.data[0].forEach(element => {
                saveData.push({ value: element.name, label: element.name })
            });
            setPrefernceList([...saveData])
        }
        console.log(data);
        
    }

    useEffect(() => {
        getPrefrence()
    }, [])


    return (
        <AppLayout>
            <View className="h-14 items-center px-4 gap-3 flex-row sticky top-0">
                <View className="flex-grow">
                    <View className='flex-row items-center gap-3'>
                        <TouchableOpacity onPress={() => router.back()} style={{ height: 40, width: 40 }} className="items-center justify-center border border-gray-300 rounded-full">
                            <FontAwesome name="angle-left" size={30} style={{ position: 'relative', right: 1 }} />
                        </TouchableOpacity>
                        <Text className='font-medium'>Preference</Text>
                    </View>
                </View>
            </View>
            <View className='flex-grow'>
                <View className="flex-wrap pt-3 px-3 flex-row gap-4">
                    {
                        prefernceList.map((data, i) => (
                            <PrefernceChip showClose compare={list} onPress={(e) => updateList(e)} key={i} value={data.value} text={data.label} />
                        ))
                    }
                </View>
            </View>
            <View className='px-3' style={{ paddingBottom: 30 }}>
                <Button text="Save changes" onPress={() => router.replace("/(auth)/login")} />
            </View>
        </AppLayout>
    )
}

export default Addpreference