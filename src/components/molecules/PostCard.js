import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Animated from 'react-native-reanimated'
import Carousel from "pinar";
import { Image } from 'react-native';

const PostCard = ({ data }) => {

  const [post, setPost] = useState(data)
  const [readShow, setReadShow] = useState()

  const colorString = (length) => {
    let result = '';
    const characters = 'abcdef0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }


  const pics = [
    "https://media.geeksforgeeks.org/wp-content/uploads/20200316135008/red7.png",
    "https://media.geeksforgeeks.org/wp-content/uploads/20200316135014/yellow3.png",
    "https://media.geeksforgeeks.org/img-practice/MaskGroup58@2x-min-1637846347.png",
    "https://media.geeksforgeeks.org/img-practice/banner/dsa-self-paced-course-overview-image.png",
    "https://media.geeksforgeeks.org/img-practice/banner/complete-interview-preparation-thumbnail.png",
    "https://media.geeksforgeeks.org/img-practice/banner/Amazon-Test-Series-thumbnail.png",
    "https://media.geeksforgeeks.org/img-practice/banner/dsa-self-paced-thumbnail.png"
  ];
  function showImage() {
    var a = Math.floor(Math.random() * pics.length);
    var img = pics[a];
    return img
  }


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
        <View className="gap-1">
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
              <Carousel showsControls={false} dotStyle={{ borderWidth: 1, borderColor: "#fff", width: 8, height: 8, gap: 4, borderRadius: 99, marginHorizontal: 3 }} activeDotStyle={{ backgroundColor: "#fff", width: 8, height: 8, borderRadius: 99, marginHorizontal: 3 }} >
                {
                  data?.image?.map((e, i) => (
                    <View key={i} className='w-full flex-1' style={{ backgroundColor: "#" + colorString(6) }}>
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
                setReadShow(lines.length > 3)
              }
              className="text-sm" numberOfLines={readShow ? 3 : 0} ellipsizeMode='clip'>{post?.body}</Animated.Text>
            {readShow && <Text onPress={() => setReadShow(false)} className="text-sm text-blue">... Read more</Text>}
          </View>
        )
      }

      <View className="flex-row gap-4">
        <Animated.View className="w-12 h-6 bg-gray-500 dark:bg-gray-800"></Animated.View>
        <Animated.View className="w-12 h-6 bg-gray-500 dark:bg-gray-800"></Animated.View>
        <Animated.View className="w-12 h-6 bg-gray-500 dark:bg-gray-800"></Animated.View>
      </View>
    </View>
  )
}

export default PostCard