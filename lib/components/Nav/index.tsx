import { Link } from "expo-router";
import { useNavigation } from "expo-router"
import { Image, Text, View } from "react-native"

const Nav = () => {
    const router = useNavigation();
    return (
        <View className="absolute z-[1000] top-10 flex flex-row items-center justify-around w-full mt-4 shadow-md pb-2">
            <Text onPress={() => { router.goBack() }} className="font-black text-lg">&larr; </Text>
            <Link href="/"><Image width={20} height={32} source={{ uri: "https://cdn.discordapp.com/attachments/1196051219836305498/1199789835649548408/tk24-logo.png" }} /></Link>
            <Text className="font-black opacity-0 text-lg"> &rarr; </Text>
        </View>
    )
}

export default Nav;
