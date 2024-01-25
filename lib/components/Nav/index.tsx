import { Link } from "expo-router";
import { Image, Text, View } from "react-native"

const Nav = () => {
    return (
        <View className="absolute z-[1000] top-10 flex flex-row items-center justify-around w-full mt-4 shadow-md pb-2">
            <Link href="/"><Image width={20} height={32} source={{ uri: "https://cdn.discordapp.com/attachments/1196051219836305498/1199789835649548408/tk24-logo.png" }} /></Link>
        </View>
    )
}

export default Nav;
