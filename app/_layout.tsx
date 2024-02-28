import { SafeAreaView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Fragment } from 'react';

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

const StackLayout = () => {
    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
                <Stack screenOptions={(navigation) => ({
                    headerStyle: { backgroundColor: 'white' },
                    headerLeft: () => <HeaderLeft props={navigation} />,
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
