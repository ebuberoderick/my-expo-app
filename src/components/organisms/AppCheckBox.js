import { View, Text } from 'react-native'
import React, { forwardRef, useState } from 'react'
import Checkbox from 'expo-checkbox';

const AppCheckBox = () => {
    const [isSelected, setSelection] = useState(false);

    return (
        <View>
            
            <Text>Custom colored checkbox</Text>
        </View>
    )
}

export default AppCheckBox