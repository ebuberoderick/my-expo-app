import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Animated from 'react-native-reanimated'
import Carousel from "pinar";
import { Image } from 'react-native';
import Fontisto from "react-native-vector-icons/Fontisto"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import AppBottomSheet from '../organisms/AppBottomSheet';

const PostCard = ({ data, openBottomSheet }) => {
  const [post, setPost] = useState(data)
  const [readShow, setReadShow] = useState(true)
  const [readvShow, setReadvShow] = useState(7)
  const [rhow, setShow] = useState(0)


  const pics = [
    "https://static.vecteezy.com/system/resources/previews/050/002/632/large_2x/portrait-of-a-beautiful-little-girl-in-a-santa-hat-on-a-red-background-free-photo.jpeg",
    "https://static.vecteezy.com/system/resources/previews/050/823/125/non_2x/little-girl-in-snata-hat-exclaiming-happiness-getting-xmas-gifts-sitting-by-christmas-tree-with-parents-photo.jpg",
    "https://www.shutterstock.com/image-photo/portrait-beautiful-woman-wearing-straw-260nw-2489701373.jpg",
    "https://www.shutterstock.com/image-photo/smiling-young-mother-beautiful-daughter-260nw-2467175685.jpg",
    "https://static.vecteezy.com/system/resources/previews/046/090/612/non_2x/the-elusive-noctilucent-clouds-a-testament-to-the-beauty-and-wonder-of-the-natural-world-photo.jpg",
    "https://static.vecteezy.com/system/resources/previews/046/090/698/non_2x/an-elusive-wonder-reminding-us-of-the-endless-possibilities-found-in-natures-canvas-photo.jpg",
    "https://www.shutterstock.com/image-photo/closeup-face-mature-woman-wearing-260nw-1383763730.jpg"
  ];


  function showImage() {
    var a = Math.floor(Math.random() * pics.length);
    var img = pics[a];
    return img
  }

  const react = () => {
    setPost(prv => ({ ...prv, reacted: !post?.reacted }))
  }


  useEffect(() => {
    setShow(readvShow)
  }, [readvShow])



  // startAutoplay
  // stopAutoplay


  return (
    <View className="gap-4">
      <View className="flex-row gap-2 items-center">
        <Animated.View>
          <Animated.View className="w-11 h-11 overflow-hidden rounded-full">
            <Image source={{ uri: showImage() }} className='w-full h-full' />
          </Animated.View>
        </Animated.View>
        <View className="">
          <Animated.View className="">
            <Text className='text-sm font-bold'>{post?.user?.fname} {post?.user?.lname}</Text>
          </Animated.View>
          <View className="flex-row gap-2">
            <Animated.View className="">
              <Text className='text-xs'>@{post?.user?.username}</Text>
            </Animated.View>
            <Animated.View className=""><Text className='text-xs'>10mins ago</Text></Animated.View>
          </View>
        </View>
      </View>
      {
        data?.image && (
          <View>
            <Animated.View className="h-72 w-full overflow-hidden rounded-3xl">
              <Carousel loop showsControls={false} dotStyle={{ borderWidth: 1, borderColor: "#fff", width: 8, height: 8, gap: 4, borderRadius: 99, marginHorizontal: 3 }} activeDotStyle={{ backgroundColor: "#fff", width: 8, height: 8, borderRadius: 99, marginHorizontal: 3 }} >
                {
                  data?.image?.map((e, i) => (
                    <View key={i} className='w-full flex-1'>
                      <Image source={{ uri: showImage() }} className='w-full h-full' />
                    </View>
                  ))
                }
              </Carousel>
            </Animated.View>
          </View>
        )
      }
      {
        data?.body && (
          <View className="gap-1">
            <Animated.Text
              onTextLayout={({ nativeEvent: { lines } }) =>
                setReadvShow(lines.length)
              }
              className="text-sm" numberOfLines={readShow ? 3 : 0} ellipsizeMode='clip'>{post?.body}</Animated.Text>
            {readShow ? <Text onPress={() => setReadShow(false)} className="text-sm text-blue">... Read more</Text> : <Text onPress={() => setReadShow(true)} className="text-sm text-blue">show less</Text>}
          </View>
        )
      }

      <View className="flex-row gap-4 items-center">
        <TouchableOpacity onPress={() => react()} className="flex-row items-center gap-1">
          <View><AntDesign name={post?.reacted ? "heart" : "hearto"} color={post?.reacted && "#2877F2"} size={22} /></View>
          <Text className='text-xs'>{post?.reacted ? post?.reaction + 1 : post?.reaction}</Text>
        </TouchableOpacity>
        <Animated.View>
          <TouchableOpacity className="flex-row items-center gap-1" onPress={() => openBottomSheet()} >
            <View><Fontisto name="comments" size={22} /></View>
            <Text className='text-xs'>{post?.comments}</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View className="flex-row items-center gap-1">
          <View><Ionicons name="eye-outline" size={25} /></View>
          <Text className='text-xs'>{post?.reaction - post?.comments}</Text>
        </Animated.View>
      </View>
    </View>
  )
}

export default PostCard