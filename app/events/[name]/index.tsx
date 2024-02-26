import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native"
import { INFO_URL } from "../../../lib/constants";
import { PARSE } from "../../../lib/utils";
import { EVENT_TYPE } from "../../../lib/types";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { Loading } from "../../../lib/components";

const event = () => {

    const [data, setData] = useState<EVENT_TYPE | null>(null);
    const [buttonType, setButtonType] = useState<"CONFIRM">("CONFIRM");

    const router = useRouter();

    const params = useGlobalSearchParams();

    useEffect(() => {
        const CALL = async () => {
            const res = await fetch("/api/event/" + params.name as `http${string}`);
            const data = await res.json();
            console.log(data);
            setData(PARSE(data.payload.blob.rawLines) as EVENT_TYPE);
        }
        CALL();
    }, [])
    if (!data) return <Loading />
    return (
        <SafeAreaView className="w-full h-full px-2 flex flex-col items-center justify-center">
            <ScrollView className="px-4 p w-full">
                <View>
                    <View>
                        <View>
                            <Text className="text-[30px] font-black mt-4"> {data.title}</Text>
                            <Text> {data.tagline} </Text>
                            <View className="bg-black p-4 rounded-md mt-4">
                                <Text className="text-white font-black text-center">{data.fee} ₹</Text>
                            </View>
                            <View className="mt-4 p-4 bg-gray-200 rounded-md">
                                <Text>{data.description}</Text>
                            </View>
                            <View className="mt-4 p-4 bg-gray-200 rounded-md">
                                <Text className="text-[15px] font-black">Rules</Text>
                                <View className="mt-2">
                                    {data.rules.map((rule, rule_idx) => (
                                        <Text key={rule_idx}>- {rule}</Text>
                                    ))}
                                </View>
                            </View>
                            <View className="mt-4 p-4 bg-gray-200 rounded-md">
                                <Text className="text-[15px] font-black">Prize</Text>
                                <View className="mt-2">
                                    {data.prizes.map((prize, prize_idx) => (
                                        <Text key={prize_idx}>- {prize}</Text>
                                    ))}
                                </View>
                            </View>
                            <View className="mt-4 p-4 bg-gray-200 rounded-md">
                                <Text className="text-[15px] font-black">Details</Text>
                                <View className="mt-2 bg-gray-300 p-4 rounded-md">
                                    <Text><Text className="font-bold">Type</Text>: {data.details.type}</Text>
                                    <Text><Text className="font-bold">Date</Text>: {data.details.date}</Text>
                                    <Text><Text className="font-bold">Time</Text>: {data.details.time[0] % 12}:{data.details.time[1]} {data.details.time[0] > 12 ? "PM" : "AM"}</Text>
                                </View>
                            </View>
                            <View className="mt-4 p-4 bg-gray-200 rounded-md">
                                <Text className="text-[15px] font-black">Contact</Text>
                                <View className="mt-2">
                                    {data.contacts.map((contact, contact_idx) => (
                                        <View key={contact_idx} className="mt-2 bg-gray-300 p-4 rounded-md">
                                            <Text><Text className="font-bold">Co-ordinator</Text>: {contact.incharge}</Text>
                                            <Text><Text className="font-bold">Email</Text>: {contact.email}</Text>
                                            <Text><Text className="font-bold">Phone-no</Text>: {contact.phno}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            <View className="mt-4 p-4 bg-gray-200 rounded-md">
                                <Text className="text-[15px] font-black">Links</Text>
                                <View className="mt-2">
                                    {data.links.map((link, link_idx) => (
                                        <Text key={link_idx}>- {link}</Text>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView >
            <View className="flex flex-row"><Pressable onPress={() => router.push(`/events/${params.name}/edit` as `http${string}`)} className="bg-black mt-2 border-2 border-black py-6 w-[360px] rounded-md"><Text className="text-white text-center font-black">EDIT!</Text></Pressable></View>
        </SafeAreaView >
    )
}

export default event;


