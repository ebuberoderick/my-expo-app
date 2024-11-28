import { View, Text, TouchableOpacity, Modal, ScrollView, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppLayout from '~/components/layout/AppLayout'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import Button from '~/components/organisms/Button'
import { useRouter } from 'expo-router'
import { fetchPrefrence } from '~/services/authService'
import PrefernceChip from '~/components/organisms/PrefernceChip'
import * as ImagePicker from 'expo-image-picker';

const Post = () => {
  const router = useRouter()
  const [selectedImg, setSelectedImg] = useState([])
  const [list, setList] = useState([])
  const [isVisible, setModalVisiblity] = useState(false)
  const [preview, setPreview] = useState(false)
  const [prefernceList, setPrefernceList] = useState([])
  const [postText, setPostText] = useState("")
  const [contentErr, setContentErr] = useState("")
  const [prefErr, setPrefErr] = useState("")


  const gotoPreview = () => {
    setContentErr("")
    setPrefErr("")
    if (postText !== "" || selectedImg.length > 0 && list.length > 2) {
      setPreview(true)
    }
    if ((postText === "" || selectedImg.length < 1)) {
      setContentErr("No Post Content")
    }
    if (list.length < 3) {
      setPrefErr("Please select at least 3 preferences")
    }
  }


  const postNow = async () => {

  }

  const getPrefrence = async () => {
    const { status, data } = await fetchPrefrence().catch(err => console.log(err))
    if (status) {
      const saveData = []
      await data.data[0].forEach(element => {
        saveData.push({ value: element.id, label: element.name })
      });
      setPrefernceList([...saveData])
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true
    });
    if (!result.canceled) {
      const arr = []
      result.assets.forEach(element => {
        arr.push(element)
      });
      setSelectedImg(prv => [...arr, ...prv])
    }
  };

  useEffect(() => {
    getPrefrence()
  }, [])


  return (
    <AppLayout>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View className='flex-1 bg-white'>
          <View className='p-3'>
            <View className='border relative' style={{ paddingRight: 50, borderRadius: 25, borderColor: "#94a3b8" }}>
              <TextInput numberOfLines={1} className='w-full' style={{ paddingLeft: 22 }} placeholderTextColor="#94a3b8" placeholder='Search Prefrence' />
              <View className='absolute p-3 h-full' style={{ right: 5 }}>
                <Ionicons name="search" size={25} />
              </View>
            </View>
          </View>
          <ScrollView className='flex-grow'>
            <View className="flex-wrap pt-3 px-3 flex-row" style={{ rowGap: 14 }}>
              {
                prefernceList.map((data, i) => (
                  <View key={i}>
                    {
                      list.some(el => el.value === data.value) ? "" : (
                        <View style={{ marginRight: 14 }}>
                          <PrefernceChip inversed compare={list} onPress={(e) => setList(ex => ([...ex, e]))} value={data} text={data.label} />
                        </View>
                      )
                    }
                  </View>
                ))

              }
            </View>
          </ScrollView>
          <View className='px-3 pt-3' style={{ paddingBottom: 30 }}>
            <Button text="Done" onPress={() => setModalVisiblity(false)} />
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={preview}>
        <View className='flex-1 bg-white'>
          <View className="h-14 items-center px-3 gap-3 flex-row sticky top-0">
            <View className="flex-grow">
              <View className='flex-row items-center relative gap-3'>
                <Text className='text-center flex-grow absolute w-full z-0 font-bold text-lg'>Post Preview</Text>
                <TouchableOpacity onPress={() => setPreview(false)} style={{ height: 40, width: 40 }} className="items-center justify-center border border-gray-300 rounded-full">
                  <FontAwesome name="angle-left" size={30} style={{ position: 'relative', right: 1 }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ScrollView className='flex-grow'>

          </ScrollView>
          <View className='px-3 pt-3' style={{ paddingBottom: 30 }}>
            <Button text="Post" onPress={postNow} />
          </View>
        </View>
      </Modal>


      <View className='pt-12 flex-1 px-3'>
        <View className='flex-grow'>
          <View className="h-14 items-center gap-3 flex-row sticky top-0">
            <View className="flex-grow">
              <View className='flex-row items-center relative gap-3'>
                <Text className='text-center flex-grow absolute w-full z-0 font-bold text-lg'>Post</Text>
                <TouchableOpacity onPress={() => router.back()} style={{ height: 40, width: 40 }} className="items-center justify-center border border-gray-300 rounded-full">
                  <FontAwesome name="angle-left" size={30} style={{ position: 'relative', right: 1 }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className='gap-4'>
            <View>
              <TouchableOpacity onPress={() => setModalVisiblity(true)}>
                <Text className='text-blue text-lg'>Add Preference</Text>
              </TouchableOpacity>
              <View className="flex-wrap pt-3 flex-row gap-4">
                {
                  list.map((data, i) => (
                    <PrefernceChip showClose compare={list} onPress={(e) => setList(prev => prev.filter(item => item.value !== e))} key={i} value={data.value} text={data.label} />
                  ))
                }
              </View>
            </View>
            <View className='gap-2'>
              <Text>Content</Text>
              <View className='border' style={{ borderRadius: 9, paddingHorizontal: 8, borderColor: "#cbd5e1" }}>
                <TextInput onChangeText={(e) => setPostText(e)} numberOfLines={11} multiline placeholder='Enter Post body' style={{ height: 200, textAlignVertical: 'top' }} />
              </View>
            </View>
            <View className='flex-row flex-wrap gap-3'>
              {
                selectedImg.map((img, i) => (
                  <TouchableOpacity key={i} onPress={() => setSelectedImg(prev => prev.filter(item => item.uri !== img.uri))} className='justify-center relative overflow-hidden items-center' style={{ height: 65, width: "14.6%", borderRadius: 14 }}>
                    <Image source={{ uri: img.uri }} className='w-full h-full relative z-0' />
                    <View className='absolute w-3 h-3 bg-danger rounded-full border z-1' style={{ borderColor: "#fff", padding: 2, top: 3, right: 3 }}><Ionicons name="close" color={"#fff"} size={13} /></View>
                  </TouchableOpacity>
                ))
              }
              <TouchableOpacity onPress={pickImage} className='justify-center items-center' style={{ height: 65, width: "14.6%", borderRadius: 14, borderWidth: 1, borderStyle: 'dashed' }}>
                <View style={{ alignSelf: 'center' }} className='justify-center items-center flex flex-row p-3'>
                  <Ionicons name="image-outline" size={25} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className='pt-3' style={{ paddingBottom: 30 }}>
          <Button text="Preview" onPress={gotoPreview} />
        </View>
      </View>
    </AppLayout>
  )
}

export default Post