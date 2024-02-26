import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native"
import { useState } from "react";
import { useEventStore } from "../lib/store";
import { useRouter } from "expo-router";
import { API_URL } from "../lib/constants";
import axios from "axios";
import { SmallLoading } from "../lib/components";

const Main = () => {
    const [UID, setUID] = useState<string>();
    const [pwd, setPwd] = useState<string>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const setEventStore = useEventStore((state) => state.setEvents)
    const router = useRouter();

    const Submit = async () => {
        setIsLoading(true);
        if (!UID || !pwd) {
            setError("Please fill all fields");
            setIsLoading(false);
            return;
        }
        try {
            const { data } = await axios.post(API_URL + '/admin/event/login', {
                admin_id: UID,
                password: pwd
            });
            setEventStore({ token: data.body.token, isAdmin: data.body.isAdmin, event: data.body.event })
            router.push("/events");
        } catch (e) {
            setError("Invalid Credentials");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <SafeAreaView className="w-full h-full flex flex-col items-center justify-center">
            <Text className="text-4xl font-black">~LOGIN~</Text>
            {!!error && <Text className="text-xl mt-2 text-red-400 font-medium">{error}</Text>}
            <View className="w-full flex flex-col items-center justify-center my-4">
                <View className="w-full flex flex-col items-center justify-center">
                    <Text className="text-left w-full ml-12 font-black">ID</Text>
                    <TextInput onChange={(e) => { setUID(e.nativeEvent.text); }} className="w-[90%] rounded-md border-black border-2 py-6 px-4 bg-white my-2" />
                </View>
                <View className="w-full flex flex-col items-center justify-center mt-4">
                    <Text className="text-left w-full ml-12 font-black">PASSWORD</Text>
                    <TextInput onChange={(e) => { setPwd(e.nativeEvent.text); }} secureTextEntry={true} className="w-[90%] rounded-md border-black border-2 py-6 px-4 bg-white my-2" />
                </View>
            </View>
            <Pressable onPress={Submit} className="w-[90%]  bg-black p-6 my-2 rounded-md">{!isLoading ? <Text className="font-black text-center text-white">SUBMIT</Text> : <SmallLoading />}</Pressable>
        </SafeAreaView>
    )
}
export default Main;
