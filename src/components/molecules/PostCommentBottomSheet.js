import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useRef, useState } from 'react'
import AppBottomSheet from '../organisms/AppBottomSheet'
import Octicons from "react-native-vector-icons/Octicons"
import Fontisto from "react-native-vector-icons/Fontisto"
import { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native'

const PostCommentBottomSheet = ({ sheetRef, data }) => {

    const [movedown, updateMovedown] = useState(false)
    console.log(data);

    const input = useRef(null)

    const onFocus = (input) => {
        updateMovedown(true);
        input.current.focus();
    };

    // const onBlur = (input) => {
    //     updateMovedown(false);
    // };


    return (
        <AppBottomSheet withFooter movedown={movedown} FooterContent={() => (
            <View className='p-3 w-full absolute bottom-0 flex-row gap-3 '>
                <View className='border border-gray-300 flex-row flex-grow rounded-3xl'>
                    <View className='p-2'>
                        <View className='w-10 h-10 items-center justify-center bg-blue rounded-full'></View>
                    </View>
                    <View className='flex-grow'>
                        <TextInput onPress={() => onFocus(input)} ref={input} numberOfLines={10} multiline style={{ paddingVertical: 10, paddingHorizontal: 0 }} placeholder='Write your comment' />
                    </View>
                </View>
                <View>
                    <View className='w-14 h-14 items-center justify-center bg-blue rounded-full'>
                        <Octicons name="paper-airplane" size={18} color={"#fff"} />
                    </View>
                </View>
            </View>
        )} snapPoints={["45%", "75%"]} ref={sheetRef}>
            <View className='relative'>
                <View className=''>
                    <BottomSheetScrollView className="px-4 w-screen">
                        <View className='gap-2'>
                            <View className='flex-row items-center gap-2'>
                                <View>
                                    <View className='w-12 h-12 bg-blue rounded-full'></View>
                                </View>
                                <View>
                                    <Text className='font-bold'>Ebube Roderick</Text>
                                    <Text className='text-gray-500 text-xs'>@bube 10mins</Text>
                                </View>
                            </View>
                            <Text className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore fuga aliquid possimus, enim harum aperiam corrupti. Culpa cumque excepturi a. Recusandae vel culpa iure eveniet, animi hic repellendus dolorum rem.</Text>
                            <View className='flex-row'>
                                <TouchableOpacity className='flex-row gap-1 items-center'>
                                    <View>
                                        <Fontisto name="heart-alt" size={14} />
                                        {/* <Fontisto name="heart" size={14} color={"#2877F2"} /> */}
                                    </View>
                                    <View><Text className='text-xs'>2,234</Text></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </BottomSheetScrollView>
                </View>
            </View>
        </AppBottomSheet>
    )
}

export default PostCommentBottomSheet