import { Link } from "expo-router";
import { Text, View } from "react-native"

const Main = () => {
    return (
        <View className="w-full h-full flex flex-col items-center justify-center">
            <View className="flex flex-col">
                <Link className="underline m-2" href={"/events" as `http${string}`} >  EVENTS! </Link>
                <Link className="underline m-2" href={"/scan" as `http${string}`} >  SCAN TAG! </Link>
            </View>
        </View >
    )
}

export default Main;
