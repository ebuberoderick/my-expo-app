import { View, Text, ScrollView, TouchableOpacity, Image, Switch, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import AppLayout from '~/components/layout/AppLayout'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Fontisto from "react-native-vector-icons/Fontisto"
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { SignOut } from '~/hooks/Auth'

const settings = () => {
  const user = useSelector((state) => state.User?.value);
  const router = useRouter()
  const dispatch = useDispatch()

  const out = async () => {
    await SignOut(dispatch)
    router.dismissAll();
    router.replace("/(auth)/login")
  }

  return (
    <AppLayout>
      <ScrollView className="pt-12" indicatorStyle="white">
        <View>
          <View className="flex-grow">
            <View style={{ padding: 5 }} className='flex-row items-center gap-2'>
              <TouchableOpacity onPress={() => router.back()} style={{ height: 35, width: 35 }} className="items-center justify-center border border-gray-300 rounded-full">
                <FontAwesome name="angle-left" size={30} />
              </TouchableOpacity>
              <View className='flex-row gap-1 items-center'>
                <View style={{ width: 40, height: 40 }}>
                  <View className={`rounded-full overflow-hidden`}>
                    <Image source={{ uri: user?.user?.avatar }} className="w-full h-full rounded-full" />
                  </View>
                </View>
                <View>
                  <View className=''>
                    <Text className='font-medium' style={{ fontSize: 14 }}>{user?.user?.fname} {user?.user?.lname}</Text>
                    <View className='flex-row flex-wrap justify-center'>
                      <View className=''>
                        <Text style={{ fontSize: 11 }}>{user?.user?.email}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className='px-3 w-screen gap-5' style={{ paddingTop: 10, paddingBottom: 40 }}>
          <View className='gap-3'>
            <Text className='font-bold'>Account Settings</Text>
            <View className='p-3 gap-2 rounded-lg' style={{ backgroundColor: "#f3f4f6" }}>
              <TouchableOpacity onPress={() => router.push("/extars/profile/add-preference")} className='flex-row gap-3 items-center py-2' >
                <View><AntDesign name="pluscircleo" size={20} color="#94a3b8" /></View>
                <View className='flex-grow'><Text className='font-medium'>Add Preference</Text></View>
                <View><FontAwesome name="angle-right" size={25} color="#94a3b8" /></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/extars/profile/personal-data")} className='flex-row gap-3 items-center py-2' >
                <View><FontAwesome5 name="user-circle" size={20} color="#94a3b8" /></View>
                <View className='flex-grow'><Text className='font-medium'>Personal Data</Text></View>
                <View><FontAwesome name="angle-right" size={25} color="#94a3b8" /></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/extars/profile/change-password")} className='flex-row gap-3 items-center py-2' >
                <View><SimpleLineIcons name="lock-open" size={20} color="#94a3b8" /></View>
                <View className='flex-grow'><Text className='font-medium'>Change Password</Text></View>
                <View><FontAwesome name="angle-right" size={25} color="#94a3b8" /></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/extars/profile/change-location")} className='flex-row gap-3 items-center py-2' >
                <View><MaterialIcons name="my-location" size={20} color="#94a3b8" /></View>
                <View className='flex-grow'><Text className='font-medium'>Change Location</Text></View>
                <View><FontAwesome name="angle-right" size={25} color="#94a3b8" /></View>
              </TouchableOpacity>
            </View>
          </View>
          <View className='gap-3'>
            <Text className='font-bold'>App Settings</Text>
            <View className='p-3 gap-2 rounded-lg' style={{ backgroundColor: "#f3f4f6" }}>
              <TouchableOpacity className='flex-row gap-3 items-center py-2' >
                <View><FontAwesome5 name="star-and-crescent" size={20} color="#94a3b8" /></View>
                <View className='flex-grow'><Text className='font-medium'>Theme</Text></View>
                <View><FontAwesome name="angle-right" size={25} color="#94a3b8" /></View>
              </TouchableOpacity>
              <TouchableOpacity className='flex-row gap-3 items-center py-2' >
                <View><Fontisto name="bell" size={20} color="#94a3b8" /></View>
                <View className='flex-grow'><Text className='font-medium'>Enable Push Notification</Text></View>
                <View><Switch /></View>
              </TouchableOpacity>
            </View>
          </View>
          <View className='gap-3'>
            <Text className='font-bold'>Info</Text>
            <View className='p-3 gap-2 rounded-lg' style={{ backgroundColor: "#f3f4f6" }}>
              <TouchableOpacity className='flex-row gap-3 items-center py-2' >
                <View><AntDesign name="exclamationcircleo" size={20} color="#94a3b8" /></View>
                <View className='flex-grow'><Text className='font-medium'>About</Text></View>
                <View><FontAwesome name="angle-right" size={25} color="#94a3b8" /></View>
              </TouchableOpacity>
              <TouchableOpacity className='flex-row gap-3 items-center py-2' >
                <View><AntDesign name="questioncircleo" size={20} color="#94a3b8" /></View>
                <View className='flex-grow'><Text className='font-medium'>FAQ</Text></View>
                <View><FontAwesome name="angle-right" size={25} color="#94a3b8" /></View>
              </TouchableOpacity>
              <TouchableOpacity className='flex-row gap-3 items-center py-2' >
                <View><MaterialCommunityIcons name="shield-alert-outline" size={20} color="#94a3b8" /></View>
                <View className='flex-grow'><Text className='font-medium'>Privacy and Terms of use</Text></View>
                <View><FontAwesome name="angle-right" size={25} color="#94a3b8" /></View>
              </TouchableOpacity>
            </View>
          </View>
          <View className='gap-3'>
            <Text className='font-bold'>Customer Support</Text>
            <View className='p-3 gap-2 rounded-lg' style={{ backgroundColor: "#f3f4f6" }}>
              <TouchableOpacity className='flex-row gap-3 items-center py-2' >
                <View><Feather name="phone" size={20} color="#94a3b8" /></View>
                <View className='flex-grow'><Text className='font-medium'>08033333333</Text></View>
                <View><FontAwesome name="angle-right" size={25} color="#94a3b8" /></View>
              </TouchableOpacity>
              <TouchableOpacity className='flex-row gap-3 items-center py-2' >
                <View><Ionicons name="mail-outline" size={20} color="#94a3b8" /></View>
                <View className='flex-grow'><Text className='font-medium'>info@tots.com</Text></View>
                <View><FontAwesome name="angle-right" size={25} color="#94a3b8" /></View>
              </TouchableOpacity>
              <TouchableOpacity className='flex-row gap-3 items-center py-2' >
                <View><AntDesign name="exclamationcircleo" size={20} color="#94a3b8" /></View>
                <View className='flex-grow'><Text className='font-medium'>Report Issue</Text></View>
                <View><FontAwesome name="angle-right" size={25} color="#94a3b8" /></View>
              </TouchableOpacity>
              <TouchableOpacity className='flex-row gap-3 items-center py-2' >
                <View><FontAwesome6 name="comments" size={20} color="#94a3b8" /></View>
                <View className='flex-grow'><Text className='font-medium'>Send Feedback</Text></View>
                <View><FontAwesome name="angle-right" size={25} color="#94a3b8" /></View>
              </TouchableOpacity>
            </View>
          </View>
          <View className='gap-3'>
            <View className='p-3 gap-2 rounded-lg' style={{ backgroundColor: "#f3f4f6" }}>
              <TouchableOpacity onPress={() => out()} className='flex-row gap-3 items-center py-2' >
                <View><Feather name="log-out" size={25} color="#ef4444" /></View>
                <View className='flex-grow'><Text className='font-medium text-danger'>Log Out</Text></View>
              </TouchableOpacity>
              <TouchableOpacity className='flex-row gap-3 items-center py-2' >
                <View><Ionicons name="trash-outline" size={25} color="#ef4444" /></View>
                <View className='flex-grow'><Text className='font-medium text-danger'>Delete Account</Text></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {Platform.OS === "android" && <View className="h-12" />}
      </ScrollView>
    </AppLayout>
  )
}

export default settings
