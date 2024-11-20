import { View, Text, ScrollView, Image, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import PrefernceChip from '~/components/organisms/PrefernceChip'
import HomePreloader from '~/components/perloader/HomePreloader'
import PostCard from '~/components/molecules/PostCard'
import AppBottomSheet from '~/components/organisms/AppBottomSheet'

const Profile = () => {
  const router = useRouter()
  const user = useSelector((state) => state.User?.value);
  const sheetRef = useRef(null);

  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([
    {
      user: {
        fname: "Ebube",
        lname: "Roderick",
        avatar: "",
        username: "bubeCode"
      },
      reaction: 51,
      comments: 48,
      reacted: true,
      image: ["", ""],
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium voluptas tenetur ratione magnam nihil impedit laboriosam itaque voluptatum illo unde aut numquam fuga, et atque aliquid quam dolores optio ipsam.",
    },
    {
      user: {
        fname: "Ebube",
        lname: "Roderick",
        avatar: "",
        username: "bubeCode"
      },
      reaction: 70,
      comments: 18,
      reacted: false,
      image: ["", "", ""],
      body: null
    },
    {
      user: {
        fname: "Ebube",
        lname: "Roderick",
        avatar: "",
        username: "bubeCode"
      },
      comments: 93,
      reaction: 109,
      reacted: true,
      image: null,
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium voluptas tenetur ratione magnam nihil impedit laboriosam itaque voluptatum illo unde aut numquam fuga, et atque aliquid quam dolores optio ipsam.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium voluptas tenetur ratione magnam nihil impedit laboriosam itaque voluptatum illo unde aut numquam fuga, et atque aliquid quam dolores optio ipsam.",
    },
    {
      user: {
        fname: "Ebube",
        lname: "Roderick",
        avatar: "",
        username: "bubeCode"
      },
      comments: 72,
      reaction: 41,
      reacted: false,
      image: ["", ""],
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium voluptas tenetur ratione magnam nihil impedit laboriosam itaque voluptatum illo unde aut numquam fuga, et atque aliquid quam dolores optio ipsam.",
    },
    {
      user: {
        fname: "Ebube",
        lname: "Roderick",
        avatar: "",
        username: "bubeCode"
      },
      comments: 30,
      reaction: 78,
      reacted: true,
      image: ["", "", ""],
      body: null
    },
    {
      user: {
        fname: "Ebube",
        lname: "Roderick",
        avatar: "",
        username: "bubeCode"
      },
      reacted: true,
      comments: 48,
      reaction: 23,
      image: null,
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium voluptas tenetur ratione magnam nihil impedit laboriosam itaque voluptatum illo unde aut numquam fuga, et atque aliquid quam dolores optio ipsam.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium voluptas tenetur ratione magnam nihil impedit laboriosam itaque voluptatum illo unde aut numquam fuga, et atque aliquid quam dolores optio ipsam.",
    }
  ])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 4000);
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
          <TouchableOpacity onPress={() => router.navigate("extars/profile/settings")} className="relative">
            <AntDesign name="setting" size={30} />
          </TouchableOpacity>
        </View>
        <View className="px-3 mt-4 pb-32">
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
          <View className='gap-5' style={{ top: 90 }}>
            <View className='gap-2'>
              <View className='flex-row justify-between items-center' style={{ paddingRight: 2 }}>
                <View className='flex-grow'>
                  <Text className='font-medium'>Description</Text>
                </View>
                <View className=''>
                  <Text className=''><Feather name="edit-2" size={17} /></Text>
                </View>
              </View>
              <Text style={{ fontSize: 13 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolore nisi, necessitatibus deserunt maiores totam nam! Dignissimos tenetur ducimus eaque necessitatibus aliquid. Consequatur soluta assumenda sed facilis alias culpa provident.</Text>
            </View>
            <View className='gap-2'>
              <View className='flex-row justify-between items-center' style={{ paddingRight: 2 }}>
                <View className='flex-grow'>
                  <Text className='font-medium'>Preference</Text>
                </View>
              </View>
              <View className="flex-wrap flex-row gap-4">
                {
                  user?.user?.preference?.map((data, i) => (
                    <PrefernceChip showClose compare={list} onPress={(e) => updateList(e)} key={i} value={data.value} text={data.label} />
                  ))
                }
              </View>
            </View>
            <View className='pb-32 gap-3'>
              <Text className='font-bold text-xl'>Posts</Text>
              {loading && <HomePreloader />}
              <View style={{ gap: 24 }}>
                {
                  !loading && (
                    posts.map((e, i) => (<PostCard openBottomSheet={() => sheetRef.current?.present()} key={i} data={e} />))
                  )
                }
              </View>
            </View>
          </View>
          {
            Platform.OS === "android" && <View className="h-12" />
          }
        </View>
      </ScrollView>
      <AppBottomSheet ref={sheetRef} />
    </AppLayout>
  )
}

export default Profile