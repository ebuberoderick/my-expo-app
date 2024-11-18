import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const Button = ({ text, onPress, processing }) => {
  return (
    <TouchableOpacity onPress={onPress} className={`${processing ? "bg-gray-300":"bg-blue"}  py-5 rounded-2xl`}>
      <Text className="text-white text-center capitalize"> { processing ? "Processing..." : text}</Text>
    </TouchableOpacity>
  )
}

export default Button