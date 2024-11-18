import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign"


const PrefernceChip = ({ onPress, text, compare, showClose,value }) => {

    const [pickedColor, setPickedColor] = useState("")

    isExist = compare.indexOf(value) !== -1;

    const colorString = (length) => {
        let result = '';
        const characters = 'abcdef0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const genColor = () => {
        const x = "#" + colorString(6)
        var c = x.substring(1);
        var rgb = parseInt(c, 16);
        var r = (rgb >> 16) & 0xff;
        var g = (rgb >> 8) & 0xff;
        var b = (rgb >> 0) & 0xff;
        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        if (luma < 100) {
            setPickedColor(x)
        } else {
            genColor()
        }
    }

    useEffect(() => {
        genColor()
    }, [])

    return (
        <View className="relative">
            {isExist && <AntDesign name="checkcircle" className="absolute -top-1 -right-2" color="#2877F2" size={20} />}
            {!isExist && showClose && <AntDesign name="closecircle" className="absolute -top-1 -right-2" color="#ef4444" size={20} />}
            <TouchableOpacity onPress={() => onPress(value)} className="py-2 px-6 border rounded-md" style={{ backgroundColor: pickedColor + "43", borderColor: pickedColor + "50" }}>
                <Text style={{ color: pickedColor }}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PrefernceChip