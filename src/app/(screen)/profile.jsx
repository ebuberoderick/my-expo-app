import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import AppLayout from '../../components/layout/AppLayout'
import AntDesign from "react-native-vector-icons/AntDesign"
import { TouchableOpacity } from 'react-native'

const Profile = () => {
  return (
    <AppLayout>
      <ScrollView className=" " indicatorStyle="white">
        <View className="h-14 items-center px-4 gap-3 flex-row sticky top-0">
          <View className="flex-grow">

          </View>
          <TouchableOpacity className="relative">
            <AntDesign name="setting" size={30} />
          </TouchableOpacity>
        </View>
        <View className="px-3 mt-4 pb-32">

        </View>
      </ScrollView>
    </AppLayout>
  )
}

export default Profile