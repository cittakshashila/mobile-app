import { Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Link } from 'expo-router';
import { Fragment } from 'react';
import { Entypo } from '@expo/vector-icons';

const HeaderIcon = () => {
    return (
        <Link href='/'><Image width={20} height={32} source={{ uri: "https://cdn.discordapp.com/attachments/1196051219836305498/1199789835649548408/tk24-logo.png" }} /></Link>
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
        >
            <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
    );
};

const StackLayout = () => {
    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
                <Stack screenOptions={(navigation) => ({
                    headerStyle: { backgroundColor: 'white' },
                    headerLeft: () => <HeaderLeft props={navigation} />,
                    headerTitle: () => <HeaderIcon />,
                })}>
                    <Stack.Screen name="index" options={{ headerLeft: () => <Text className="font-black">TK</Text>, headerRight: () => <Text className="font-black">24</Text> }} />
                    <Stack.Screen name="events/index" />
                    <Stack.Screen name="events/create/index" options={{ headerShown: false, presentation: "modal" }} />
                    <Stack.Screen name="events/[name]/index" />
                    <Stack.Screen name="events/[name]/edit/index" options={{ headerShown: false, presentation: "modal" }} />
                </Stack>
            </SafeAreaView>
        </Fragment>
    )
}
export default StackLayout;
