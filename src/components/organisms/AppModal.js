import { Modal, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-web';

const AppModal = ({ visible,children }) => {
  // const pan = Gesture.Pan();
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ y: 0 });
  const [selectedId, setSelectedId] = useState();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withSpring(offset.value.y) },
      ],
      // backgroundColor: isPressed.value ? 'yellow' : 'blue',
    };
  });

  const start = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      offset.value = {
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        y: offset.value.y,
      };
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

    const outerTap = Gesture.Tap()
    .onStart(() => {
      console.log('outer tap');
    })
    .requireExternalGestureToFail(gesture);

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <GestureHandlerRootView>
        <BlurView intensity={30} tint="light" experimentalBlurMethod='dimezisBlurView' className="flex-1 justify-end h-screen w-screen absolute top-0 bottom-0 right-0 left-0 z-50 bg-black">
          <GestureDetector gesture={gesture}>
            <Animated.View style={[animatedStyles]} className="bg-white relative rounded-t-3xl w-full p-3 flex-grow max-h-[80%]" >
              <TouchableOpacity onPress={() => console.log("hi")} className="w-1/6 mx-auto bg-black h-2 rounded-full" />
              <GestureDetector gesture={outerTap}>
                <ScrollView>
                  {children}
                </ScrollView>
              </GestureDetector>
            </Animated.View>
          </GestureDetector>
        </BlurView>
      </GestureHandlerRootView>
    </Modal>
  )
}

export default AppModal

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
});