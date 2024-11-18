import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Text, View } from "react-native";
import { SignOut } from "../../hooks/Auth";
import { useDispatch } from "react-redux";
import AppLayout from "../../components/layout/AppLayout";
import HomePreloader from "../../components/perloader/HomePreloader";
import PostCard from "~/components/molecules/PostCard";


export default function Page() {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([
    {
      user: {
        fname: "Ebube",
        lname: "Roderick",
        avatar: "",
        username: "bubeCode"
      },
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
      <ScrollView className=" " indicatorStyle="white">
        <View className="h-14 items-center px-3 gap-3 flex-row sticky top-0">
          <View className="flex-grow"></View>
          <View><AntDesign name="search1" size={25} /></View>
          <TouchableOpacity className="relative">
            <Ionicons name="notifications-outline" size={25} />
            <View className="bg-danger rounded-full h-2 w-2 absolute right-[4px] top-1" />
          </TouchableOpacity>
        </View>
        <View className="px-3 mt-4 pb-32">
          {loading && <HomePreloader />}
          <View style={{ gap: 24 }}>
            {
              !loading && (
                posts.map((e, i) => (<PostCard key={i} data={e} />))
              )
            }
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
}