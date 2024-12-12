import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Platform, ScrollView, View } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import AppLayout from '~/components/layout/AppLayout'
import PostCard from '~/components/molecules/PostCard'
import PostCommentBottomSheet from '~/components/molecules/PostCommentBottomSheet'
import PrefernceChip from '~/components/organisms/PrefernceChip'
import HomePreloader from '~/components/perloader/HomePreloader'
import { fetchPrefrence, fetchUserProfile } from '~/services/authService'

const Profile = () => {
    const { id } = useLocalSearchParams()

    const router = useRouter()
    const sheetRef = useRef(null);
    const [list, setList] = useState([])
    const [info, setInfo] = useState([])
    //   const [processing, setProcessing] = useState(false)
    //   const [postText, setPostText] = useState(user?.user?.description)

    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [posts, setPosts] = useState([])


    const getPrefrence = async () => {
        const { status, data } = await fetchPrefrence().catch(err => console.log(err))
        if (status) {
            const myArry = info[0].preference
            const ar = []
            await data.data[0].forEach(element => {
                if (myArry.includes(element.id)) {
                    ar.push({ value: element.id, label: element.name })
                }
            });
            setList(ar)
        }
    }

    const fetchPosts = async () => {
        const { status, data } = await fetchUserProfile({ id })
        if (status) {
            console.log(data.data[2].data)
            setPosts(data.data[2].data)
            setInfo(data.data)
        }
        setLoading(false)
    }


    
  useFocusEffect(
    useCallback(() => {
      getPrefrence() 
    }, [info])
  )

    useEffect(() => {
        fetchPosts()
    }, [])


    return (
        <AppLayout>
            <ScrollView className="pt-12" indicatorStyle="white">
                <View className="h-14 items-center px-4 gap-3 flex-row sticky top-0">
                    <View className="flex-grow">
                        <View className='flex-row items-center gap-3'>
                            <TouchableOpacity onPress={() => router.back()} style={{ height: 35, width: 35 }} className="items-center justify-center border border-gray-300 rounded-full">
                                <FontAwesome name="angle-left" size={30} style={{ position: 'relative', right: 1 }} />
                            </TouchableOpacity>
                            <Text className='font-medium'>Profile</Text>
                        </View>
                    </View>
                </View>
                <View className="px-3 mt-4 pb-32">
                    <View className='relative rounded-lg bg-gray-200' style={{ top: 80, backgroundColor: "#80808020" }}>
                        <View className='absolute w-full' style={{ top: -70 }}>
                            <View style={{ width: 120, height: 120 }} className='relative mx-auto'>
                                <View className={`rounded-full bg-gray-200 overflow-hidden`}>
                                    <Image source={{ uri: info[0]?.avatar }} className="w-full h-full rounded-full" />
                                </View>
                            </View>
                        </View>
                        <View className='gap-2' style={{ paddingVertical: 56 }}>
                            <Text className='font-medium text-center'>{info[0]?.fname} {info[0]?.lname}</Text>
                            <View className='flex-row flex-wrap justify-center'>
                                <View className=''>
                                    <Text className='text-sm px-4' style={{ borderRightWidth: 1 }}>{info[0]?.email}</Text>
                                </View>
                                <View className=''>
                                    <Text className='text-sm px-4'>@{info[0]?.username}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='gap-5' style={{ top: 90 }}>
                        <View className='gap-2'>
                            <View className='flex-row justify-between items-center' style={{ paddingRight: 2 }}>
                                <View className='flex-grow'>
                                    <Text className='font-medium'>Description</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 13, color: !info[0]?.description && "#94a3b8" }}>{info[0]?.description ? info[0]?.description : "No description"}</Text>
                        </View>
                        <View className='gap-2'>
                            <View className='flex-row justify-between items-center' style={{ paddingRight: 2 }}>
                                <View className='flex-grow'>
                                    <Text className='font-medium'>Preference</Text>
                                </View>
                            </View>
                            <View className="flex-wrap flex-row gap-4">
                                {
                                    list?.map((data, i) => (
                                        <PrefernceChip compare={list} key={i} value={data.value} text={data.label} />
                                    ))
                                }
                            </View>
                        </View>
                        <View className='pb-32 gap-3'>
                            <Text className='font-bold text-xl'>Posts</Text>
                            {loading && <HomePreloader />}


                            {
                                !loading && posts?.length < 1 && (
                                    <View style={{ paddingVertical: 30, gap: 40 }}>
                                        <View className=''>
                                            <View className='justify-center items-center mx-auto' style={{ width: 300 }}><MaterialCommunityIcons name="post" size={150} color={"#94a3b8"} /></View>
                                            <Text className='text-center text-gray-400 text-lg' > {info[0]?.fname} {info[0]?.lname} have not made any post yet</Text>
                                        </View>
                                    </View>
                                )
                            }

                            {
                                !loading && posts?.length > 0 && (
                                    <View style={{ gap: 24 }}>
                                        {posts?.map((e, i) => (<PostCard openBottomSheet={(e) => { sheetRef.current?.present(); setComments(e) }} key={i} data={e} />))}
                                    </View>
                                )
                            }
                        </View>
                    </View>
                    {
                        Platform.OS === "android" && <View className="h-12" />
                    }
                </View>
            </ScrollView>
            <PostCommentBottomSheet post_id={comments} sheetRef={sheetRef} />
        </AppLayout>
    )
}

export default Profile