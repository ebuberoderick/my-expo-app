import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import Octicons from "react-native-vector-icons/Octicons"
import Foundation from "react-native-vector-icons/Foundation"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import { BlurView } from 'expo-blur';
import { useSelector } from 'react-redux';

const TabBar = ({ state, navigation, descriptors }) => {

    const user = useSelector((state) => state.User?.value);

    const icons = (label, isFocused) => {
        switch (label) {
            case "index":
                return isFocused ? <Foundation name="home" size={28} color="#3591FC" /> : <Octicons name="home" size={24} color="#000" />;
                break;
            case "group":
                return isFocused ? <MaterialCommunityIcons name="account-group" size={28} color="#3591FC" /> : <MaterialCommunityIcons name="account-group-outline" size={30} color="#000" />;
                break
            case "post":
                return <AntDesign name="pluscircleo" size={24} color="#000" />
                break
            case "chat":
                return isFocused ? <Ionicons name="chatbubble-ellipses" size={28} color="#3591FC" /> : <Ionicons name="chatbubble-ellipses-outline" size={30} color="#000" />;
                break
            case "profile":
                return <View style={{height:35,width:35,padding:3}} className={`rounded-full overflow-hidden ${isFocused ? "bg-[#3591FC]" : "bg-gray-500"}`}>
                    <Image source={{uri:user?.user?.avatar}} className="w-full h-full rounded-full" />
                </View>
                break
            default:
                break;
        }
    }


    return (
        <BlurView experimentalBlurMethod='dimezisBlurView' intensity={40} className="absolute bottom-6 overflow-hidden mx-4 rounded-3xl flex-row">
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.name}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, justifyContent: 'center', height: 70, alignItems: 'center' }}
                    >
                        {icons(label, isFocused)}
                    </TouchableOpacity>
                );
            })}
        </BlurView>
    )
}

export default TabBar