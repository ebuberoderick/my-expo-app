import { View, Text, TouchableOpacity, TouchableHighlight, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AppBottomSheet from '../organisms/AppBottomSheet'
import Octicons from "react-native-vector-icons/Octicons"
import Fontisto from "react-native-vector-icons/Fontisto"
import { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import { BlurView } from 'expo-blur'
import UseFormHandler from '~/hooks/useFormHandler'
import { fetchPostComment, postComment } from '~/services/authService'

const PostCommentBottomSheet = ({ sheetRef, post_id }) => {

    const user = useSelector((state) => state.User?.value);
    console.log(post_id);

    const [movedown, updateMovedown] = useState(false)
    const [commentList, setCommentList] = useState([])

    const input = useRef(null)

    const fetchComments = async () => {
        const {data,status} = await fetchPostComment(post_id)
        console.log(data);
    }

    const onFocus = (input) => {
        updateMovedown(true);
        input.current.focus();
    };

    // const onBlur = (input) => {
    //     updateMovedown(false);
    // };


    const postForm = UseFormHandler({
        required: {
            text: 'Please Enter Your First Name',
        },
        initialValues: {
            text: '',
            post_id: post_id,
            comment_id: 0
        },
        onSubmit: async (value) => {
            const { status, data } = await postComment(value).catch(() => postForm.setProccessing(false))
            console.log("hi");

        }
    })

    useEffect(() => {
        // if (data?.comments) {
        //     setCommentList(data?.comments)
        // }
        postForm.value.post_id = post_id
        fetchComments()
    }, [post_id])


    return (
        <AppBottomSheet withFooter movedown={movedown} FooterContent={() => (
            <BlurView experimentalBlurMethod='dimezisBlurView' intensity={20} className='p-3 w-full absolute bottom-0 flex-row gap-3 '>
                <View className='border border-gray-300 flex-row flex-grow rounded-3xl'>
                    <View className='p-2'>
                        <View className='w-10 h-10 items-center justify-center bg-blue rounded-full'>
                            <Image source={{ uri: user?.user?.avatar }} className="w-full h-full rounded-full" />
                        </View>
                    </View>
                    <View className='flex-grow'>
                        <TextInput onChangeText={(e) => postForm.value.text = e} onPress={() => onFocus(input)} ref={input} numberOfLines={10} multiline style={{ paddingVertical: 10, paddingHorizontal: 0 }} placeholder='Write your comment' />
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => postForm.submit()} className='w-14 h-14 items-center justify-center bg-blue rounded-full'>
                        <Octicons name="paper-airplane" size={18} color={"#fff"} />
                    </TouchableOpacity>
                </View>
            </BlurView>
        )} snapPoints={["45%", "75%"]} ref={sheetRef}>
            <View className='relative'>
                <View className=''>
                    <BottomSheetScrollView className="px-4 w-screen">
                        <View className='gap-2'>
                            {
                                commentList?.map((comment, i) => (
                                    <View key={i} className='gap-2'>
                                        <View className='flex-row items-center gap-2'>
                                            <View>
                                                <View className='w-12 h-12 bg-blue rounded-full'>
                                                    {/* <Image alt={comment.} /> */}
                                                </View>
                                            </View>
                                            <View>
                                                <Text className='font-bold'>Ebube Roderick</Text>
                                                <Text className='text-gray-500 text-xs'>@bube 10mins</Text>
                                            </View>
                                        </View>
                                        <Text className='text-sm'>{comment?.text}</Text>
                                        <View className='flex-row'>
                                            <TouchableOpacity className='flex-row gap-1 items-center'>
                                                <View>
                                                    <Fontisto name="heart-alt" size={14} />
                                                    {/* <Fontisto name="heart" size={14} color={"#2877F2"} /> */}
                                                </View>
                                                <View><Text className='text-xs'>{comment.likes.length}</Text></View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                    </BottomSheetScrollView>
                </View>
            </View>
        </AppBottomSheet>
    )
}

export default PostCommentBottomSheet