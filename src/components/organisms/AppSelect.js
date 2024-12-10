import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AppBottomSheet from './AppBottomSheet'

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const DropdownComponent = ({ icon, placeholder, error, onChange, options }) => {
    const [value, setValue] = useState(null);
    const desRef = useRef(null)

    const updateSelect = (v) => {
        setValue(v)
        onChange(v)
        desRef.current.dismiss()
    }

    


    return (
        <View>
            <View className='flex-row justify-between items-center' style={{ paddingRight: 2 }}>
                <TouchableOpacity onPress={() => desRef.current.present()} className='w-full flex-row gap-1 justify-center' style={{ borderColor: error ? "#ef4444" : "#cbd5e1", ...styles.dropdown }}>
                    {icon && <Text>{icon}</Text>}
                    <Text className='flex-grow text-xl' style={{ color: value?.label === undefined && "#cbd5e1" }}>{value?.label === undefined ? placeholder : value?.label}</Text>
                    <Text className=''><FontAwesome name="angle-down" size={20} /></Text>
                </TouchableOpacity>
            </View>
            <AppBottomSheet ref={desRef}>
                <ScrollView className='gap-2 p-3' style={{ maxHeight: 600 }}>
                    {
                        options.map((i, x) => (
                            <TouchableOpacity onPress={() => updateSelect(i)} key={x}>
                                <Text className='text-lg py-1'>{i.label}</Text>
                            </TouchableOpacity>
                        ))
                    }
                    <View className='h-10' />
                </ScrollView>
            </AppBottomSheet>
            {error && <Text className="text-danger text-sm">{error}</Text>}
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
    }
});