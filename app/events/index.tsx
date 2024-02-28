import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useEventStore } from "../../lib/store/events";
import { useEffect, useState } from "react";
import { Loading } from "../../lib/components";
import { useRouter } from "expo-router";
import { API_URL, CLIENT_URL, MEDIA_URL } from "../../lib/constants";
import { PARSE } from "../../lib/utils";
import axios from "axios";

const Events = () => {
    type Type = "All" | "TECHNICAL" | "NON-TECHNICAL" | "WORKSHOP" | "PRO SHOW" | "ONLINE EVENT";
    type infoType = { name: string; type: Type };
    const [data, setData] = useState<Record<string, infoType> | null>(null);
    const useEvent = useEventStore((state) => state.event);
    const router = useRouter();
    const [cnt, setCnt] = useState<string>("GET")

    if (!useEvent) {
        router.push("/");
        return (<Text>User not found!</Text>);
    }
    const fCnt = async () => {
        try {
            const {data} = await axios.get(`${API_URL}/admin/total-reg`,{
                    headers:{  Authorization: `Bearer ${useEvent?.token}`}
                })
            setCnt(String(data.body.data.totalregisterations))
        } catch (err) {
        }
    }
    useEffect(() => {
        const GET = async () => {
            const res = await fetch(CLIENT_URL + '/api/events/folder');
            let resData = PARSE((await res.json()).payload.blob.rawLines) as Record<string, infoType>;
            if (!(useEvent.isAdmin)) {
                const filteredEntries = Object.entries(resData).filter(([key, _]) => useEvent.event.includes(key));
                resData = Object.fromEntries(filteredEntries);
            }
            setData(resData);
        }
        GET();
    }, []);
    if (!data) return <Loading />
    return (
        <View className="w-full h-full flex flex-col items-center justify-center">
            <ScrollView className="w-full">
                <View className="flex mt-2 flex-row items-center justify-between">
                    <View className="flex mt-2 flex-row items-center justify-start">
                        <Text className="text-[40px] ml-2 font-black">Events</Text>
                        <Text className="mr-2 text-[10px] font-black">({Object.keys(data).length})</Text>
                    </View>
                    <Pressable onPress={fCnt} className="bg-black mt-2 border-2 border-black py-6 h-full w-[60px] mr-2 rounded-md"><Text className="text-white text-center font-black">{cnt}</Text></Pressable>
                </View>
                <View>
                    {Object.entries(data).map(([key, event], event_idx) => {
                        return (
                            <TouchableOpacity onPress={() => router.push(`/events/${key}` as `http${string}`)} key={event_idx} className="m-2 relative bg-gray-100" >
                                <Image key={event_idx} alt={`${event.name}`} className="w-full bg-gray-300" height={200} source={{ uri: MEDIA_URL(key, 1) }} />
                                <View style={{ backgroundColor: "rgba(0,0,0,0.6)" }} className="bg-black absolute w-full h-fit p-2 top-[78%] rounded-b-md">
                                    <Text className="text-white text-lg text-center"> {event.name} </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                    )}
                </View>
            </ScrollView >
            {useEvent.isAdmin && <View className="flex flex-row"><Pressable onPress={() => router.push("/events/create" as `http${string}`)} className="bg-black mt-2 border-2 border-black py-6 w-[360px] rounded-md"><Text className="text-white text-center font-black">CREATE!</Text></Pressable></View>}
        </View >
    )
}

export default Events;
