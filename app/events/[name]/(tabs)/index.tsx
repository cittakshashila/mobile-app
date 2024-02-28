import { useEffect, useState } from "react";
import { Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native"
import { CLIENT_URL, INFO_URL, MEDIA_URL } from "../../../../lib/constants";
import { PARSE } from "../../../../lib/utils";
import { EVENT_TYPE } from "../../../../lib/types";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { Loading } from "../../../../lib/components";
import { useEventStore } from "../../../../lib/store/events";

const event = () => {
    const { event } = useEventStore()
    const [data, setData] = useState<EVENT_TYPE | null>(null);
    const [buttonType, setButtonType] = useState<"DELETE" | "CONFIRM">("DELETE");

    const router = useRouter();

    const params = useGlobalSearchParams();

    useEffect(() => {
        const CALL = async () => {
            const res = await fetch(CLIENT_URL + "/api/events/" + params.name as `http${string}`);
            const data = await res.json();
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
                            <Text className="text-[30px] font-black mt-4"> {data.title} </Text>
                            <View className="bg-black p-4 rounded-md mt-4">
                                <Text className="text-white font-black text-center"> {data.category}</Text>
                            </View>
                            <View className="mt-4 p-4 bg-gray-200 rounded-md">
                                <Text>{data.description}</Text>
                            </View>
                            {data.rules && data.rules.length > 0 &&
                                <View className="mt-4 p-4 bg-gray-200 rounded-md">
                                    <Text className="text-[15px] font-black">Rules</Text>
                                    <View className="mt-2">
                                        {data.rules.map((rule, rule_idx) => (
                                            <Text key={rule_idx}>- {rule}</Text>
                                        ))}
                                    </View>
                                </View>
                            }
                            {data.guidelines && data.guidelines.length > 0 &&
                                <View className="mt-4 p-4 bg-gray-200 rounded-md">
                                    <Text className="text-[15px] font-black">Guildlines</Text>
                                    <View className="mt-2">
                                        {data.guidelines.map((guide, guide_idx) => (
                                            <Text key={guide_idx}>- {guide}</Text>
                                        ))}
                                    </View>
                                </View>
                            }
                            {data.registration && data.registration.length > 0 &&
                                <View className="mt-4 p-4 bg-gray-200 rounded-md">
                                    <Text className="text-[15px] font-black">Registration</Text>
                                    <View className="mt-2">
                                        {data.registration.map((reg, reg_idx) => (
                                            <Text key={reg_idx}>- {reg}</Text>
                                        ))}
                                    </View>
                                </View>
                            }
                            <View className="mt-4 p-4 bg-gray-200 rounded-md">
                                <Text className="text-[15px] font-black">Details</Text>
                                <View className="mt-2 bg-gray-300 p-4 rounded-md">
                                    <Text><Text className="font-bold">Type</Text>: {data.details.type}</Text>
                                    <Text><Text className="font-bold">Date</Text>: {data.details.date}</Text>
                                </View>
                            </View>
                            <View className="mt-4 p-4 bg-gray-200 rounded-md">
                                <Text className="text-[15px] font-black">Contact</Text>
                                <View className="mt-2">
                                    {data.contacts.map((contact, contact_idx) => (
                                        <View key={contact_idx} className="mt-2 bg-gray-300 p-4 rounded-md">
                                            <Text><Text className="font-bold">Co-ordinator</Text>: {contact.incharge}</Text>
                                            <Text><Text className="font-bold">Phone-no</Text>: {contact.phno}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="w-full flex flex-col items-center justify-center">
                    <Text className="text-[20px] font-black mt-4">In</Text>
                    <Image className="mt-2 rounded-md" source={{ uri: MEDIA_URL(data.id, 1) }} style={{ width: 300, height: 200 }} />
                    <Text className="text-[20px] font-black mt-4">Out</Text>
                    <Image className="mt-2 rounded-md" source={{ uri: MEDIA_URL(data.id, 2) }} style={{ width: 300, height: 200 }} />
                </View>
            </ScrollView >
        </SafeAreaView >
    )
}

export default event;


