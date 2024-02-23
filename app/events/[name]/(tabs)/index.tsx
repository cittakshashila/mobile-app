import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native"
import { INFO_URL } from "../../../../lib/constants";
import { PARSE } from "../../../../lib/utils";
import { EVENT_TYPE } from "../../../../lib/types";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { Loading } from "../../../../lib/components";

const event = () => {

    const [data, setData] = useState<EVENT_TYPE | null>(null);
    const [buttonType, setButtonType] = useState<"DELETE" | "CONFIRM">("DELETE");

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
    const handleDelete = async () => {
        if (buttonType === "CONFIRM") {
            // TODO: DELETE
            router.push("/events" as `http${string}`);
            return;
        }
        setButtonType("CONFIRM");
        return;
    }
    return (
        <SafeAreaView className="w-full h-full flex flex-col items-center justify-center">
            <Text>NAVEEN PATHOKO 💋</Text>
            <View className="flex flex-row"><Pressable onPress={handleDelete} style={{ backgroundColor: buttonType === "CONFIRM" ? "#b91c1c" : "#ef4444" }} className="mt-2 border-2 border-black py-6 w-[360px] rounded-md"><Text className="text-white text-center font-black">{buttonType}</Text></Pressable></View>
        </SafeAreaView>
    )
}

export default event;


