import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppLayout from '~/components/layout/AppLayout'
import Button from '~/components/organisms/Button'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useRouter } from 'expo-router'
import { addLocation, fetchCities, fetchCountry, fetchStates } from '~/services/authService'
import UseFormHandler from '~/hooks/useFormHandler'
import DropdownComponent from '~/components/organisms/AppSelect'
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
// import * as Burnt from "burnt";


const ChangeLocation = () => {

    const router = useRouter()
    const [countryList, setCountryList] = useState([])
    const [countryID, setCountryId] = useState(0)
    const [stateList, setStateList] = useState([])
    const [citiesList, setCitiesList] = useState([])


    const getState = (e) => {
        setCountryId(e.value)
        fetchStates({ country_id: e.value }).then(async (res) => {
            const sav = []
            await res.data.data[0].forEach(element => {
                sav.push({ value: element.id, label: element.name })
            });
            setStateList([...sav])
        })
    }


    const getCities = (e) => {
        fetchCities({ country_id: countryID, state_id: e.value }).then(async (res) => {
            const sata = []
            await res.data.data[0].forEach(element => {
                sata.push({ value: element.id, label: element.name })
            });
            setCitiesList([...sata])
        })
    }

    const fetCty = () => fetchCountry().then(async (res) => {
        const saveData = []
        res?.data?.data[0].forEach(element => {
            saveData.push({ label: element?.name, value: element?.id })
        });
        setCountryList([...saveData])
    })


    useEffect(() => {
        fetCty()
    }, [])

    const formHandler = UseFormHandler({
        required: {
            country: 'Please Select Your Country',
            // state: 'Please Select Your State',
            // city: 'Please Select Your City',
        },
        initialValues: {
            country: '',
            state: '',
            city: '',
        },

        onSubmit: async (value) => {
            const { status, data } = await addLocation(value).catch(err => console.log(err))
            if (status) {
                router.back()
            }
        }
    })

    return (
        <AppLayout>
            <View className='pt-12 flex-1'>
                <View className="h-14 items-center px-4 gap-3 flex-row sticky top-0">
                    <View className="flex-grow">
                        <View className='flex-row items-center gap-3'>
                            <TouchableOpacity onPress={() => router.back()} style={{ height: 40, width: 40 }} className="items-center justify-center border border-gray-300 rounded-full">
                                <FontAwesome name="angle-left" size={30} style={{ position: 'relative', right: 1 }} />
                            </TouchableOpacity>
                            <Text className='font-medium'>Change Location</Text>
                        </View>
                    </View>
                </View>
                <View className='flex-grow'>
                    <View className="gap-5 p-3">
                        <DropdownComponent error={formHandler.error?.country} onChange={e => { formHandler.value.country = e.label; getState(e) }} options={countryList} placeholder={"Country"} icon={<Ionicons name="flag-outline" size={35} color={"#9ca3af"} />} />
                        <DropdownComponent error={formHandler.error?.state} onChange={e => { formHandler.value.state = e.label; getCities(e) }} options={stateList} placeholder={"State"} icon={<Ionicons name="location-outline" size={33} color={"#9ca3af"} />} />
                        <DropdownComponent error={formHandler.error?.city} onChange={e => formHandler.value.city = e.label} options={citiesList} placeholder={"City"} icon={<MaterialCommunityIcons name="city-variant-outline" size={35} color={"#9ca3af"} />} />
                    </View>
                </View>
                <View className='px-3' style={{ paddingBottom: 30 }}>
                    <Button text="Save changes" processing={formHandler.proccessing} onPress={() => formHandler.submit()} />
                </View>
            </View>
        </AppLayout>
    )
}

export default ChangeLocation