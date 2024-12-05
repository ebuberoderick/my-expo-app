import { View, Text, TouchableOpacity, TouchableHighlight, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Fontisto from "react-native-vector-icons/Fontisto"
import Feather from "react-native-vector-icons/Feather"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { moment } from '~/hooks/useMoment'


const CommentChip = ({ commentList }) => {

    const user = useSelector((state) => state.User?.value);
    const [loading, updateloading] = useState(true)
    const comRly = useRef(null)
    const xt = useRef(null)
    const [replies, setReplies] = useState({})
    const [showLenght, setshowLenght] = useState(0)
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
                                {
                                    console.log(comment.replies)
                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => react(comment?.id)} className='flex-row gap-1 items-center'>
                                <View>
                                    {checkReacted(comment.likes) === true ? <Fontisto name="heart" size={14} color={"#2877F2"} /> : <Fontisto name="heart-alt" size={14} />}
                                </View>
                                <View><Text className='text-xs'>{comment.likes.length}</Text></View>
                            </TouchableOpacity>
                            {
                                comment.replies.length > 0 && (
                                    <TouchableOpacity onPress={() => { showLenght > 0 ? setshowLenght(0) : setshowLenght(6) }} className='flex-row gap-1 items-center'>
                                        <View><Text className='text-xs'>Replies</Text></View>
                                        <View><FontAwesome name="angle-down" /></View>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                        <View className='pl-6 gap-2'>
                            {
                                comment.replies?.splice(0, showLenght).map((rp, i) => (
                                    <View key={i} className='gap-1'>
                                        <View className='flex-row items-center gap-2'>
                                            <View>
                                                <View className='w-7 h-7 bg-blue rounded-full'>
                                                    <Image source={{ uri: rp?.user?.avatar }} className="w-full h-full rounded-full" />
                                                </View>
                                            </View>
                                            <View>
                                                <Text className='font-bold text-xs'>{rp?.user?.fname} {rp?.user?.lname}</Text>
                                                <Text className='text-gray-500 text-xs'>@{rp?.user?.username} {moment(rp?.created_at)} ago</Text>
                                            </View>
                                        </View>
                                        <Text className='text-xs'>{rp?.text}</Text>
                                        <TouchableOpacity className='flex-row gap-1 items-center'>
                                            <View>
                                                <Fontisto name="heart-alt" size={14} />
                                            </View>
                                            <View><Text className='text-xs'>{rp.comment_likes_count}</Text></View>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            }

                        </View>
                    </View>
                ))
            }
        </View>
    )
}

export default CommentChip