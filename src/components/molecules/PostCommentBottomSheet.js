import { View, Text } from 'react-native'
import React from 'react'
import AppBottomSheet from '../organisms/AppBottomSheet'

const PostCommentBottomSheet = ({sheetRef}) => {
    return (
        <AppBottomSheet snapPoints={["45%", "75%"]} ref={sheetRef}>
            <Text>hi</Text>
        </AppBottomSheet>
    )
}

export default PostCommentBottomSheet