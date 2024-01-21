import { SafeAreaView, View } from 'react-native';
import { Slot } from 'expo-router';

const Layout = () => {
    return (
        <SafeAreaView className="w-screen h-screen flex-1 items-center justify-center bg-white">
            <View>
                <Slot />
            </View >
        </SafeAreaView>
    )
}
export default Layout;
