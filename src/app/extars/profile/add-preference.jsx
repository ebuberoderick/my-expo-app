import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppLayout from '~/components/layout/AppLayout'
import Button from '~/components/organisms/Button'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useRouter } from 'expo-router'
import { fetchPrefrence, updateUserPrefrence } from '~/services/authService'
import PrefernceChip from '~/components/organisms/PrefernceChip'
// import * as Burnt from "burnt";

const Addpreference = () => {
    const router = useRouter()

    const [err, setErr] = useState("")
    const [list, setList] = useState([])
    const [loading, setloading] = useState(false)
    const [prefernceList, setPrefernceList] = useState([])

    const getPrefrence = async () => {
        const { status, data } = await fetchPrefrence().catch(err => console.log(err))
        if (status) {
            const saveData = []
            await data.data[0].forEach(element => {
                saveData.push({ value: element.id, label: element.name })
            });
            setPrefernceList([...saveData])
        }
    }

    const saveUpdate = async () => {
        setloading(true)
        setErr("")
        if (list.length > 2) {
            const saveData = []
            list.forEach(element => {
                saveData.push(element?.value)
            });
            const { data, status } = await updateUserPrefrence(saveData.toString())
            if (status) {
                // Burnt.alert({
                //     title: "Location Updated.",
                //     preset: "done",
                //     from: "top",
                //     haptic: "success",
                //     message: "Your location was updated .",
                // });
                router.back()
            }
        } else {
            setErr("Please Select at least 3 prefrence")
        }
        setloading(false)
    }


    useEffect(() => {
        getPrefrence()
    }, [])


    return (
        <AppLayout>
            <View className='flex-1 pt-12'>
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
                <ScrollView className='flex-grow'>
                    <View>
                        <Text className='text-xl px-3 text-blue'>My Prefrence</Text>
                        <View className="flex-wrap pt-3 px-3 flex-row gap-4">
                            {
                                list.map((data, i) => (
                                    <PrefernceChip showClose compare={list} onPress={(e) => setList(prev => prev.filter(item => item.value !== e))} key={i} value={data.value} text={data.label} />
                                ))
                            }
                        </View>
                        <Text className="text-danger text-sm">{err}</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text className='text-xl px-3'>Add Prefrence</Text>
                        <View className="flex-wrap pt-3 px-3 flex-row" style={{ rowGap: 14 }}>
                            {
                                prefernceList.map((data, i) => (
                                    <View key={i}>
                                        {
                                            list.some(el => el.value === data.value) ? "" : (
                                                <View style={{ marginRight: 14 }}>
                                                    <PrefernceChip inversed compare={list} onPress={(e) => setList(ex => ([...ex, e]))} value={data} text={data.label} />
                                                </View>
                                            )
                                        }
                                    </View>
                                ))

                            }
                        </View>
                    </View>
                </ScrollView>
                <View className='px-3 pt-3' style={{ paddingBottom: 30 }}>
                    <Button processing={loading} text="Save changes" onPress={saveUpdate} />
                </View>
            </View>
        </AppLayout>
    )
}

export default Addpreference