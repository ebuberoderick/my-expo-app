import { View, Text, ScrollView, Platform, TextInput } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import { TouchableOpacity } from 'react-native'
import { useFocusEffect, useRouter } from 'expo-router'
import PrefernceChip from '~/components/organisms/PrefernceChip'
import HomePreloader from '~/components/perloader/HomePreloader'
import PostCard from '~/components/molecules/PostCard'
import AppBottomSheet from '~/components/organisms/AppBottomSheet'
import PostCommentBottomSheet from '~/components/molecules/PostCommentBottomSheet'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Button from '~/components/organisms/Button'
import { fetchPrefrence, fetchUserProfile, updateUserDescription } from '~/services/authService'
import { useUserStore } from '~/Store/holders/UserStore'
import ProfileSmallCard from '~/components/organisms/ProfileSmallCard'

const Profile = () => {
  const router = useRouter()
  const user = useUserStore((state) => state.storage);
  const updateUserState = useUserStore((state) => state.updateUserState);
  const sheetRef = useRef(null);
  const [list, setList] = useState([])
  const [processing, setProcessing] = useState(false)
  const [postText, setPostText] = useState(user?.user?.description)
  const desRef = useRef(null)

  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [posts, setPosts] = useState([])


  const getPrefrence = async () => {
    const { status, data } = await fetchPrefrence().catch(err => console.log(err))
    if (status) {
      const myArry = user.user.preference
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
    const { status, data } = await fetchUserProfile({ id: user.user.id.toString() })
    if (status) {
      setPosts(data.data[2])
    }
    setLoading(false)
  }

  const postDes = async () => {
    setProcessing(true)
    const { data, status } = await updateUserDescription({ description: postText.toString() })
    if (status) {
      const daa = {}
      daa.bearer_token = user?.bearer_token
      daa.user = data.data[0]
      updateUserState(daa)
      desRef.current.dismiss()
    }
    setProcessing(false)
  }

  useFocusEffect(
    useCallback(() => {
      getPrefrence()
      fetchPosts()  
    }, [user])
  )

  useEffect(() => {
    fetchPosts()
    getPrefrence()
    // setInterval(() => {
    //   fetchPosts()
    // }, 5000);
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
          <ProfileSmallCard />
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
              <Text style={{ fontSize: 13, color: !user?.user?.description && "#94a3b8" }}>{user?.user?.description ? user?.user?.description : "No description"}</Text>
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
                !loading && posts?.data?.length < 1 && (
                  <View style={{ paddingVertical: 30, gap: 40 }}>
                    <View className=''>
                      <View className='justify-center items-center mx-auto' style={{ width: 300 }}><MaterialCommunityIcons name="post" size={150} color={"#94a3b8"} /></View>
                      <Text className='text-center text-gray-400 text-lg' >You have not made any post yet</Text>
                    </View>
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
            <TextInput defaultValue={postText} onChangeText={(e) => setPostText(e)} numberOfLines={11} multiline placeholder='Enter Post body' style={{ height: 200, textAlignVertical: 'top' }} />
          </View>
          <Button processing={processing} onPress={() => postDes()} text="Done" />
        </View>
      </AppBottomSheet>
    </AppLayout>
  )
}

export default Profile