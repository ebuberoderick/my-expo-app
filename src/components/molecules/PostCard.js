import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Animated from 'react-native-reanimated'
import Carousel from "pinar";
import { Image } from 'react-native';
import Fontisto from "react-native-vector-icons/Fontisto"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import { postLike } from '~/services/authService';
import { moment } from '~/hooks/useMoment';


const PostCard = ({ data, openBottomSheet }) => {
  // const locale = DeviceInfo.getDeviceLocale()

  const [post, setPost] = useState(data)
  const [reactedVal, setreactedVal] = useState("")
  const [readShow, setReadShow] = useState(true)
  const [reacted, setReacted] = useState(false)
  const [readvShow, setReadvShow] = useState(7)
  const [rhow, setShow] = useState(0)

  const react = () => {
    postLike({ post_id: post?.id })
    setReacted(!reacted)
    if (reacted) {
      setreactedVal("+")
    } else {
      setreactedVal("-")
    }
  }


  useEffect(() => {
    setShow(readvShow)
    setReacted(data.liked === "1")
  }, [readvShow])


  return (
    <View className="gap-4">
      <View className="flex-row gap-2 items-center">
        <Animated.View>
          <Animated.View className="w-11 h-11 overflow-hidden rounded-full">
            <Image source={{ uri: post?.user?.avatar }} className='w-full h-full' />
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
            <Animated.View className=""><Text className='text-xs'>{moment(post?.created_at)} ago</Text></Animated.View>
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
                      <Image source={{ uri: e }} className='w-full h-full' />
                    </View>
                  ))
                }
              </Carousel>
            </Animated.View>
          </View>
        )
      }
      {
        data?.text && (
          <View className="gap-1">
            <Animated.Text
              onTextLayout={({ nativeEvent: { lines } }) =>
                setReadvShow(lines.length)
              }
              className="text-sm" numberOfLines={readShow ? 3 : 0} ellipsizeMode='clip'>{post?.text}</Animated.Text>
            {readShow ? <Text onPress={() => setReadShow(false)} className="text-sm text-blue">... Read more</Text> : <Text onPress={() => setReadShow(true)} className="text-sm text-blue">show less</Text>}
          </View>
        )
      }

      <View className="flex-row gap-4 items-center">
        <TouchableOpacity onPress={() => react()} className="flex-row items-center gap-1">
          <View><AntDesign name={reacted ? "heart" : "hearto"} color={reacted && "#2877F2"} size={22} /></View>
          <Text className='text-xs'>{reactedVal === "" ? parseInt(post?.likes_count) : (reactedVal === "-" ? parseInt(post?.likes_count) : parseInt(post?.likes_count) - 1)}</Text>
        </TouchableOpacity>
        <Animated.View>
          <TouchableOpacity className="flex-row items-center gap-1" onPress={() => { openBottomSheet(post?.id) }} >
            <View><Fontisto name="comments" size={22} /></View>
            <Text className='text-xs'>{post?.comments_count}</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View className="flex-row items-center gap-1">
          <View><Ionicons name="eye-outline" size={25} /></View>
          <Text className='text-xs'>{post?.views}</Text>
        </Animated.View>
      </View>
    </View>
  )
}

export default PostCard