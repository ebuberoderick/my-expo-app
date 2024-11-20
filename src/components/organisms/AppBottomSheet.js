import React, { useCallback, useMemo, forwardRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";


const keyExtractor = (item) => item;

const AppBottomSheet = forwardRef((props, sheetRef) => {
    // hooks
    // const sheetRef = useRef(null);

    // variables
    const data = useMemo(
        () =>
            Array(50)
                .fill(0)
                .map((_, index) => `index-${index}`),
        []
    );

    // render
    const renderItem = useCallback(({ item }) => {
        return (
            <View key={item} style={styles.itemContainer}>
                <Text>{item}</Text>
            </View>
        );
    }, []);


    const renderBackdrop = useCallback(
        (props) => (
            <BlurView {...props} experimentalBlurMethod='dimezisBlurView' intensity={30} className="flex-1 h-screen w-screen">
                <TouchableOpacity className="flex-1 z-0" onPress={() => sheetRef.current?.dismiss()}></TouchableOpacity>
            </BlurView>
        ),
        []
    );


    return (
        <BottomSheetModal
            ref={sheetRef}
            $modal
            snapPoints={["40%", "75%"]}
            enablePanDownToClose
            backdropComponent={renderBackdrop}
            enableDynamicSizing={false}
        >
            <BottomSheetFlatList
                data={data}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                scrollIndicatorInsets={false}
            // estimatedItemSize={200}
            />
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 200
    },
    contentContainer: {
        backgroundColor: "white",
    },
    itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: "#e7e",
    },
});

export default AppBottomSheet;
