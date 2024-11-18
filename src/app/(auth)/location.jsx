import { View, Text, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '../../components/organisms/Button'
import { useRouter } from 'expo-router'
import UseFormHandler from '../../hooks/useFormHandler'
import { useDispatch } from 'react-redux'
import { updateAppState } from '../../Store/reducers/AppDefault'
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import AppSelect from '../../components/organisms/AppSelect'
import AppInput from '../../components/organisms/AppInput'
import { fetchCountry, fetchStates, fetchCities, addLocation } from '../../services/authService'


const Location = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState([])
    const [citiesList, setCitiesList] = useState([])


    const getState = (e) => {
        fetchStates(e).then(async (res) => {
            const sav = []
            await res.data.data.states.forEach(element => {
                sav.push({ value: element.name, label: element.name })
            });
            setStateList([...sav])
        })
    }


    const getCities = (e) => {
        fetchCities(formHandler.value.country, e).then(async (res) => {
            const sata = []
            await res.data.data.forEach(element => {
                sata.push({ value: element, label: element })
            });
            setCitiesList([...sata])
        })
    }



    useEffect(() => {
        fetchCountry().then(async (res) => {
            const saveData = []
            const x = [...res.data?.data]

            if (Array.isArray(x)) {
                x.forEach(element => {
                    saveData.push({ label: element?.name, value: element?.name })
                });
            }
            setCountryList([...saveData])
        })
    }, [])

    const formHandler = UseFormHandler({
        required: {
            country: 'Please Select Your Country',
            state: 'Please Select Your State',
            city: 'Please Select Your City',
        },
        initialValues: {
            country: '',
            state: '',
            city: '',
        },

        onSubmit: async (value) => {
            const { status, data } = await addLocation(value).catch(err => console.log(err))
            if (status) {
                dispatch(updateAppState({ location: "/(auth)/prefrence" }))
                router.replace("/(auth)/prefrence")
            }
        }
    })


    return (
        <View className="flex-1 bg-white pb-16 gap-3 justify-center">
            <View className="flex-grow justify-center">
                <View>
                    <Animated.Image source={require("../../assets/images/location.png")} className="w-80 mx-auto relative h-96" />
                </View>
            </View>
            <View className="gap-7 px-3">
                <Text className="text-3xl font-extrabold">Set Location</Text>
                <View className="gap-5">

                    <AppSelect error={formHandler.error?.country} onChange={e => { formHandler.value.country = e; getState(e) }} options={countryList} placeholder={"Country"} icon={<Ionicons name="flag-outline" size={35} color={"#9ca3af"} />} />
                    <AppSelect error={formHandler.error?.state} onChange={e => { formHandler.value.state = e; getCities(e) }} options={stateList} placeholder={"State"} icon={<Ionicons name="location-outline" size={33} color={"#9ca3af"} />} />
                    <AppSelect error={formHandler.error?.city} onChange={e => formHandler.value.city = e} options={citiesList} placeholder={"City"} icon={<MaterialCommunityIcons name="city-variant-outline" size={35} color={"#9ca3af"} />} />
                </View>
                <View className="gap-4">
                    <Button processing={formHandler.proccessing} text="continue" onPress={() => formHandler.submit()} />
                </View>
            </View>
        </View>
    )
}

export default Location