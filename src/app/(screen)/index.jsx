import React, { useEffect, useRef, useState } from "react";
import { Platform, ScrollView, Text, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import { View } from "react-native";
import AppLayout from "../../components/layout/AppLayout";
import HomePreloader from "../../components/perloader/HomePreloader";
import PostCard from "~/components/molecules/PostCard";
import inappLogo from "src/assets/images/inappLogo.png"
import PostCommentBottomSheet from "~/components/molecules/PostCommentBottomSheet";
import { fetchPost } from "~/services/authService";
import { Image } from "react-native";


export default function Page() {
  const [loading, setLoading] = useState(true)
  const sheetRef = useRef(null);
  const [comments, setComments] = useState([])
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    const { status, data } = await fetchPost()
    if (status) {
      setPosts(data.data[0])
    }
    setLoading(false)
  }


  useEffect(() => {
    fetchPosts()
  }, [])


  return (
    <AppLayout>
      <ScrollView className="pt-12" indicatorStyle="white">
        <View className="h-14 items-center px-3 gap-3 flex-row sticky top-0">
          <View className="flex-grow">
            <Image source={require("../../assets/images/inappLogo.png")} className="w-24 h-16" />
          </View>
          <View><AntDesign name="search1" size={25} /></View>
          <TouchableOpacity className="relative">
            <Ionicons name="notifications-outline" size={25} />
            <View className="bg-danger rounded-full h-2 w-2 absolute right-[4px] top-1" />
          </TouchableOpacity>
        </View>
        <View className={`px-3 mt-4 ${Platform.OS === "ios" ? "pb-32" : "pb-32"}`}>
          {loading && <HomePreloader />}
          <View style={{ gap: 24 }}>
            {
              !loading && (
                posts?.data?.map((e, i) => (<PostCard openBottomSheet={(e) => { setComments(e); sheetRef.current?.present() }} key={i} data={e} />))
              )
            }
          </View>
          {
            Platform.OS === "android" && <View className="h-12" />
          }
        </View>
      </ScrollView>
      <PostCommentBottomSheet post_id={comments} sheetRef={sheetRef} />
    </AppLayout>
  );
}