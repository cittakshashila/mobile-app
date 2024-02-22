import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Stack } from 'expo-router';
import { Link } from 'expo-router';
import { Fragment } from 'react';
import { Entypo } from '@expo/vector-icons';
import { API } from '../lib/utils';
import Constants from 'expo-constants'

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

export const call = new API("");
console.log(process.env.GITHUB_TOKEN)

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
                    <Stack.Screen name="index" />
                    <Stack.Screen name="events/index" />
                    <Stack.Screen name="events/create/index" options={{}} />
                    <Stack.Screen name="events/[name]/index" />
                    <Stack.Screen name="events/[name]/edit/index" options={{}} />
                </Stack>
            </SafeAreaView>
        </Fragment>
    )
}
export default StackLayout;
