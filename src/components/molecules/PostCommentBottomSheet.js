import { View, Text, TouchableOpacity, TouchableHighlight, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AppBottomSheet from '../organisms/AppBottomSheet'
import Octicons from "react-native-vector-icons/Octicons"
import Fontisto from "react-native-vector-icons/Fontisto"
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"
import { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import { BlurView } from 'expo-blur'
import UseFormHandler from '~/hooks/useFormHandler'
import { fetchPostComment, postComment, postCommentLike, postCommentReply } from '~/services/authService'
import { moment } from '~/hooks/useMoment'
import CommentPreloader from '../perloader/CommentPreloader'

const PostCommentBottomSheet = ({ sheetRef, post_id }) => {

    const user = useSelector((state) => state.User?.value);
    const [movedown, updateMovedown] = useState(false)
    const [loading, updateloading] = useState(true)
    const comRly = useRef(null)
    const xt = useRef(null)
    const [replies, setReplies] = useState({})
    const [commentList, setCommentList] = useState([])

    const input = useRef(null)

    const fetchComments = async (id) => {
        const { data, status } = await fetchPostComment({ post_id: id })
        if (status) {
            setCommentList(data.data[0].data);
        }
        updateloading(false)
    }


    const checkReacted = async (list) => {
        // console.log(list.length);

        const val = true
        return val
    }

    const onFocus = (input) => {
        updateMovedown(true);
        input.current.focus();
    };

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
            input.current.blur();
            input.current.clear()
            if (postForm.value.comment_id !== undefined) {
                const { status, data } = await postCommentReply(value).catch(() => postForm.setProccessing(false))
                if (status) {
                    setReplies({})
                    fetchComments(postForm.value.post_id)
                }
            } else {
                const { status, data } = await postComment(value).catch(() => postForm.setProccessing(false))
                if (status) {
                    fetchComments(postForm.value.post_id)
                }
            }
            postForm.value.text = ''
        }
    })

    const react = async (i) => {
        await postCommentLike({ post_id, comment_id: i })
        fetchComments(postForm.value.post_id)


        // setReacted(!reacted)
        // if (reacted) {
        //     setreactedVal("+")
        // } else {
        //     setreactedVal("-")
        // }
    }


    useEffect(() => {
        postForm.value.comment_id = replies?.id
    }, [replies])

    useEffect(() => {
        updateloading(true)
        postForm.value.post_id = post_id
        fetchComments(post_id)
    }, [post_id])


    return (
        <AppBottomSheet withFooter movedown={movedown} FooterContent={() => (
            <View className='w-full absolute bottom-0'>
                <BlurView experimentalBlurMethod='dimezisBlurView' intensity={20} className='p-3 w-full flex-row gap-3 '>
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
            </View>
        )} snapPoints={["45%", "75%"]} ref={sheetRef}>
            <View className='relative'>
                <View className=''>
                    {
                        Object.keys(replies).length > 0 && (
                            <View ref={xt} className='bg-white p-3 w-full relative top-2'>
                                <View className='bg-gray-200 p-2 rounded-md pr-5'>
                                    <TouchableOpacity style={{ position: 'absolute', top: 5, right: 5 }} onPress={() => { setReplies({}); input.current.blur() }}>
                                        <Ionicons name="close-circle-outline" size={20} />
                                    </TouchableOpacity>
                                    <Text className='text-xs' numberOfLines={3} >
                                        {replies?.text}
                                    </Text>
                                </View>
                            </View>
                        )
                    }
                    <BottomSheetScrollView className="px-4 w-screen">
                        {loading && <CommentPreloader />}
                        {!loading && commentList.length < 1 && (
                            <View className='gap-3' style={{ paddingTop: 100 }}>
                                <View className='justify-center w-full items-center'><Fontisto name="comments" size={90} color={"#e3e3e3"} /></View>
                                <View>
                                    <Text className='text-center text-gray-400'>No comment yet</Text>
                                    <Text className='text-center text-gray-400'>Be the first to commnet</Text>
                                </View>
                            </View>
                        )}
                        {
                            !loading && commentList.length > 0 && (
                                <View className='gap-2 pb-24'>
                                    {
                                        commentList?.map((comment, i) => (
                                            <View key={i} className='gap-2'>
                                                <View className='flex-row items-center gap-2'>
                                                    <View>
                                                        <View className='w-10 h-10 bg-blue rounded-full'>
                                                            <Image source={{ uri: comment?.user?.avatar }} className="w-full h-full rounded-full" />
                                                        </View>
                                                    </View>
                                                    <View>
                                                        <Text className='font-bold text-sm'>{comment?.user?.fname} {comment?.user?.lname}</Text>
                                                        <Text className='text-gray-500 text-xs'>@{comment?.user?.username} {moment(comment?.created_at)} ago</Text>
                                                    </View>
                                                </View>
                                                <Text className='text-sm'>{comment?.text}</Text>
                                                <View className='flex-row items-center gap-3'>
                                                    <TouchableOpacity onPress={() => { setReplies(comment); input.current.focus() }} className='flex-row gap-1 items-center'>
                                                        <View>
                                                            <Feather name="refresh-cw" size={18} />
                                                        </View>
                                                        <View><Text className='text-xs'>{comment.replies.length}</Text></View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => react(comment?.id)} className='flex-row gap-1 items-center'>
                                                        <View>
                                                            {checkReacted(comment.likes) === true ? <Fontisto name="heart" size={14} color={"#2877F2"} /> : <Fontisto name="heart-alt" size={14} />}
                                                        </View>
                                                        <View><Text className='text-xs'>{comment.likes.length}</Text></View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ))
                                    }
                                </View>
                            )
                        }

                    </BottomSheetScrollView>
                </View>
            </View>
        </AppBottomSheet>
    )
}

export default PostCommentBottomSheet