import { Link } from "expo-router";
import { Text, View } from "react-native"

const Main = () => {
    return (
        <View>
            <Text className="underline">
                <Link href="/events" >  EVENTS! </Link>
            </Text>
        </View >
    )
}

export default Main;
