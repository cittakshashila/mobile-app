import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native"
import { useState } from "react";
import { useEventStore } from "../lib/store";
import { useRouter } from "expo-router";
import { API_URL } from "../lib/constants";
import axios from "axios";

const Main = () => {
    const [UID, setUID] = useState<string>();
    const [pwd, setPwd] = useState<string>();
    const [error, setError] = useState<string>();
    const setEventStore = useEventStore((state) => state.setEvents)
    const router = useRouter();

    const Submit = async () => {
        if (!UID || !pwd) {
            setError("Please fill all fields");
            return;
        }
        const { data } = await axios.post(API_URL + '/admin/event/login', {
            admin_id: UID,
            password: pwd
        });
        setEventStore({ token: data.body.token , isAdmin: data.body.isAdmin, event: data.body.event })
        router.push("/events");
    }
    return (
        <SafeAreaView className="w-full h-full flex flex-col items-center justify-center">
            <Text className="text-4xl font-black">~LOGIN~</Text>
            {!!error && <Text className="text-xl mt-2 text-red-400 font-medium">{error}</Text>}
            <View className="w-full flex flex-col items-center justify-center my-4">
                <TextInput onChange={(e) => { setUID(e.nativeEvent.text); }} className="w-[90%] placeholder:text-black rounded-md border-black border-2 p-6 bg-white my-2" placeholder="ID" />
                <TextInput onChange={(e) => { setPwd(e.nativeEvent.text); }} secureTextEntry={true} className="w-[90%] placeholder:text-black rounded-md border-black border-2 p-6 bg-white my-2" placeholder="Password" />
            </View>
            <Pressable onPress={Submit} className="w-[90%]  bg-black p-6 my-2 rounded-md"><Text className="font-black text-center text-white">SUBMIT</Text></Pressable>
        </SafeAreaView>
    )
}
export default Main;
