import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Stack, Tabs, useRouter } from 'expo-router';
import { Link } from 'expo-router';
import { Fragment, useEffect } from 'react';
import { API } from '../lib/utils';
import { useEventStore } from '../lib/store';

const HeaderIcon = () => {
    return (
        <Link className="w-fit h-full" href='/'><Image width={20} height={32} source={{ uri: "https://cdn.discordapp.com/attachments/1196051219836305498/1199789835649548408/tk24-logo.png" }} /></Link>
    )
}

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

export const call = new API("YOUR TOKEN GOES HERE");

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const StackLayout = () => {
    const useEvent = useEventStore((state) => state.event);
    const router = useRouter();
    useEffect(() => {
        if (useEvent) {
            router.push("/events" as `http${string}`);
        }
    }, [])
    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
                <Stack screenOptions={(navigation) => ({
                    headerStyle: { backgroundColor: 'white' },
                    headerLeft: () => <HeaderLeft props={navigation} />,
                    headerTitle: () => <HeaderIcon />,
                })}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="events/index" />
                    <Stack.Screen name="events/create/index" options={{}} />
                    <Stack.Screen name="events/[name]/(tabs)" />
                </Stack>
            </SafeAreaView>
        </Fragment>
    )
}
export default StackLayout;
