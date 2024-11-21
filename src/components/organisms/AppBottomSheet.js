import React, { useCallback, forwardRef } from "react";
import { TouchableOpacity } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";

const AppBottomSheet = forwardRef(({ children, snapPoints }, sheetRef) => {
    const renderBackdrop = useCallback(
        (props) => (
            <BlurView {...props} experimentalBlurMethod='dimezisBlurView' intensity={30} className="flex-1 h-screen w-screen">
                <TouchableOpacity className="flex-1 z-0" onPress={() => sheetRef.current?.dismiss()}></TouchableOpacity>
            </BlurView>
        ),
        []
    );
    if (snapPoints) {
        return (
            <BottomSheetModal
                ref={sheetRef}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                enableDynamicSizing={false}
                snapPoints={snapPoints}
            >
                {children}
            </BottomSheetModal>
        );
    } else {
        return (
            <BottomSheetModal
                ref={sheetRef}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
            >
                {children}
            </BottomSheetModal>
        );
    }

});

export default AppBottomSheet;