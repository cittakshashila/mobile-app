import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const SmallLoading = () => {
    return (
        <View className="flex py-2 items-center justify-center" style={styles.container}>
            <ActivityIndicator
                style={styles.spinner}
                size="small"
                color="white"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    spinner: {
        transform: [{ rotate: "45deg" }],
    },
});

export default SmallLoading;
