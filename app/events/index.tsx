import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { FOLDER_URL, MEDIA_URL } from "../../lib/constants";
import { FOLDER_TYPE } from "../../lib/types";
import { Loading } from "../../lib/components";

const Event = () => {
    const [data, setData] = useState<Array<FOLDER_TYPE> | null>(null);
    const router = useRouter();

    useEffect(() => {
        const GET = async () => {
            const res = await fetch("/api/event/folder" as `http${string}`);
            const data = await res.json();
            console.log(data);
            setData(data.payload.tree.items);
        }
        GET();
    }, [])

    if (!data) return <Loading />
    return (
        <View className="w-full h-full flex flex-col items-center justify-center">
            <ScrollView className="w-full">
                <View className="flex mt-2 flex-row items-center justify-start">
                    <Text className="text-[40px] ml-2 font-black">Events</Text>
                    <Text className="mr-2 text-[10px] font-black">({data.length})</Text>
                </View>
                <View className="">
                    {data.map((event, event_idx) => {
                        return (
                            <TouchableOpacity onPress={() => router.push(`/events/${event.name}` as `http${string}`)} key={event_idx} className="m-2 relative bg-gray-100" >
                                <Image key={event_idx} alt={`${event.name}`} className="w-full bg-gray-300" height={200} source={{ uri: MEDIA_URL(event.name, 1) }} />
                                <View style={{ backgroundColor: "rgba(0,0,0,0.6)" }} className="bg-black absolute w-full h-fit p-2 top-[78%] rounded-b-md">
                                    <Text className="text-white text-lg text-center"> {event.name} </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                    )}
                </View>
            </ScrollView >

            <View className="flex flex-row"><Pressable onPress={() => router.push("/events/create" as `http${string}`)} className="bg-black mt-2 border-2 border-black py-6 w-[360px] rounded-md"><Text className="text-white text-center font-black">CREATE!</Text></Pressable></View>
        </View >
    )
}

export default Event;
