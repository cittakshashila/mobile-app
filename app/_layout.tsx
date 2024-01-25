import { SafeAreaView, Text, View } from 'react-native';
import { Slot } from 'expo-router';
import { Nav } from '../lib/components';

const Layout = () => {
    return (
        <SafeAreaView className="w-screen h-screen flex-1 items-center justify-center bg-white">
            <Nav />
            <View className="mt-[50px]">
                <Slot />
            </View >
        </SafeAreaView>
    )
}
export default Layout;
