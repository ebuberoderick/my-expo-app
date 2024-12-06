import { View, Text, ScrollView, Image, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import PrefernceChip from '~/components/organisms/PrefernceChip'
import HomePreloader from '~/components/perloader/HomePreloader'
import PostCard from '~/components/molecules/PostCard'
import AppBottomSheet from '~/components/organisms/AppBottomSheet'
import PostCommentBottomSheet from '~/components/molecules/PostCommentBottomSheet'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import Button from '~/components/organisms/Button'
import { fetchUserProfile } from '~/services/authService'
import { useUserStore } from '~/Store/holders/UserStore'

const Profile = () => {
  const router = useRouter()
  const user = useUserStore((state) => state.storage);
  const sheetRef = useRef(null);
  const desRef = useRef(null)

  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    const { status, data } = await fetchUserProfile({ id: user.user.id.toString() })
    if (status) {
      setPosts(data.data[1])
    }
    setLoading(false)
  }


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
          <TouchableOpacity onPress={() => router.navigate("extars/profile/settings")} className="relative">
            <AntDesign name="setting" size={30} />
          </TouchableOpacity>
        </View>
        <View className="px-3 mt-4 pb-32">
          <View className='relative rounded-lg bg-gray-200' style={{ top: 80, backgroundColor: "#80808020" }}>
            <View className='absolute w-full' style={{ top: -70 }}>
              <View style={{ width: 120, height: 120 }} className='relative mx-auto'>
                <View className={`rounded-full bg-gray-200 overflow-hidden`}>
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
                <TouchableOpacity onPress={() => desRef.current.present()} className=''>
                  <Text className=''><Feather name="edit-2" size={17} /></Text>
                </TouchableOpacity>
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


              {
                !loading && posts?.data?.length < 1 && (
                  <View style={{ paddingVertical: 30, gap: 40 }}>
                    <Text className='text-center text-gray-400 text-lg' >You have not made any post yet</Text>
                    <Button text={"make your first post"} onPress={() => router.push("/extars/post")} />
                  </View>
                )
              }

              {
                !loading && posts?.data?.length > 0 && (
                  <View style={{ gap: 24 }}>
                    {posts?.data?.map((e, i) => (<PostCard openBottomSheet={(e) => { setComments(e); sheetRef.current?.present() }} key={i} data={e} />))}
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
      <AppBottomSheet ref={desRef}>
        <View className='gap-2 p-3' style={{ paddingBottom: 22 }}>
          <Text>Content</Text>
          <View className='border' style={{ borderRadius: 9, paddingHorizontal: 8, borderColor: "#cbd5e1" }}>
            <BottomSheetTextInput onChangeText={(e) => setPostText(e)} numberOfLines={11} multiline placeholder='Enter Post body' style={{ height: 200, textAlignVertical: 'top' }} />
          </View>
          <Button text="Done" />
        </View>
      </AppBottomSheet>
    </AppLayout>
  )
}

export default Profile