import { SafeAreaView, Pressable, TouchableOpacity, Text } from 'react-native';
import { Stack } from 'expo-router';
import { Fragment } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";

const HeaderLeft = ({ props }: any) => {
    return (
        <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            accessible={true}
            accessibilityLabel="Go back"
            accessibilityRole="button"
            accessibilityHint="Navigates to the previous screen"
        />
    );
};

const Logout = () => {
    const router = useRouter();
    return (
        <Pressable onPress={async () => {
            await SecureStore.deleteItemAsync("token");
            router.replace("/");
            return;
        }}><Text className="text-red-500">Logout</Text></Pressable>
    )
}

const StackLayout = () => {
    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
                <Stack screenOptions={(navigation) => ({
                    headerStyle: { backgroundColor: 'white' },
                    headerLeft: () => <HeaderLeft props={navigation} />,
                    headerRight: () => <Logout />,
                })}>
                    <Stack.Screen name="index" options={{
                        headerTitle: "TK(24)",
                        headerRight: () => null
                    }} />
                    <Stack.Screen name="events/index" options={{
                        headerTitle: "Event list - TK(24)",
                    }} />
                    <Stack.Screen name="events/create/index" options={{
                        headerTitle: "Create Event - TK(24)",
                    }} />
                    <Stack.Screen name="events/[name]/(tabs)" options={{
                        headerTitle: "Event - TK(24)",
                    }} />
                </Stack>
            </SafeAreaView>
        </Fragment>
    )
}
export default StackLayout;
