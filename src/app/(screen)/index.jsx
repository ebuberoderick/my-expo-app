import React, { useEffect, useRef, useState } from "react";
import { Platform, ScrollView, Text, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import { View } from "react-native";
import AppLayout from "../../components/layout/AppLayout";
import HomePreloader from "../../components/perloader/HomePreloader";
import PostCard from "~/components/molecules/PostCard";
import AppBottomSheet from "~/components/organisms/AppBottomSheet";
import PostCommentBottomSheet from "~/components/molecules/PostCommentBottomSheet";


export default function Page() {
  const [loading, setLoading] = useState(true)
  const sheetRef = useRef(null);
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
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium voluptas tenetur ratione magnam nihil impedit",
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
        <View className="h-14 items-center px-3 gap-3 flex-row sticky top-0">
          <View className="flex-grow"></View>
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
                posts.map((e, i) => (<PostCard openBottomSheet={() => sheetRef.current?.present()} key={i} data={e} />))
              )
            }
          </View>
          {
            Platform.OS === "android" && <View className="h-12" />
          }
        </View>
      </ScrollView>
      <PostCommentBottomSheet sheetRef={sheetRef} />
    </AppLayout>
  );
}