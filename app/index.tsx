import { Link } from "expo-router";
import { Text, View } from "react-native"

const Main = () => {
    return (
        <View className="w-full h-full flex flex-col items-center justify-center">
            <Text className="underline">
                <Link href={"/events" as `http${string}`} >  EVENTS! </Link>
            </Text>
        </View >
    )
}

export default Main;
