import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Loading = () => {
    return (
        <View className="w-full h-screen flex items-center justify-center" style={styles.container}>
            <ActivityIndicator
                style={styles.spinner}
                size="small"
                color="black" // Change the color as needed
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
        transform: [{ rotate: "45deg" }], // Rotate the spinner (optional)
    },
});

export default Loading;
