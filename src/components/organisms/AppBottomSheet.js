import React, { useCallback, forwardRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { BottomSheetFooter, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";

const AppBottomSheet = forwardRef(({ children, snapPoints, withFooter, FooterContent, movedown }, sheetRef) => {
    const renderBackdrop = useCallback(
        (props) => (
            <BlurView {...props} experimentalBlurMethod='dimezisBlurView' intensity={30} className="flex-1 h-screen w-screen">
                <TouchableOpacity className="flex-1 z-0" onPress={() => sheetRef.current?.dismiss()}></TouchableOpacity>
            </BlurView>
        ),
        []
    );


    const renderFooter = useCallback(
        props => (
            <BottomSheetFooter {...props} style={{ position: "absolute", top: movedown && "50%" }} bottomInset={0}>
                <FooterContent />
            </BottomSheetFooter>
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
                footerComponent={withFooter && renderFooter}
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
                <BottomSheetView>
                    {children}
                </BottomSheetView>
            </BottomSheetModal>
        );
    }

});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    input: {
        marginTop: 8,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
        backgroundColor: 'rgba(151, 151, 151, 0.25)',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    footerContainer: {
        padding: 12,
        margin: 12,
        borderRadius: 12,
        backgroundColor: '#80f',
    },
    footerText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '800',
    },
});


export default AppBottomSheet;