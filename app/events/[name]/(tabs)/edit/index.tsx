import SelectDropdown from 'react-native-select-dropdown'
// import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { PARSE } from '../../../../../lib/utils';
import { EVENT_TYPE } from '../../../../../lib/types';
import { Loading } from '../../../../../lib/components';

const EditEvent = () => {

    const [buttonType, setButtonType] = useState<"SAVE" | "CONFIRM">("SAVE");
    const [tempData, setTempData] = useState<string>("");
    const [data, setData] = useState<EVENT_TYPE | null>(null);

    const router = useRouter();

    const InputStyle = "bg-gray-200 py-4 px-2 rounded-md border-2 border-black mb-2";
    const InputLabelStyle = "text-xl font-black mt-2";

    const params = useGlobalSearchParams();

    useEffect(() => {
        const CALL = async () => {
            const res = await fetch("/api/event/" + params.name as `http${string}`);
            const D = await res.json();
            setData(PARSE(D.payload.blob.rawLines) as EVENT_TYPE);
            setTempData(JSON.stringify(PARSE(D.payload.blob.rawLines) as EVENT_TYPE));
        }
        CALL();
    }, [])


    if (!data) return <Loading />

    const handleSave = async () => {
        if (buttonType == "CONFIRM") {
            if (tempData == JSON.stringify(data)) {
                router.push(`/events/${params.name}` as `http${string}`);
                return;
            }
            const res = await fetch("/api/event/PUT" as `http${string}`, {
                method: "PUT",
                body: JSON.stringify({
                    event_name: JSON.parse(tempData).title,
                    event_data: data,
                    type: "UPDATE"
                })
            })
            router.push(`/events/${params.name}` as `http${string}`);
            return;
        }
        setButtonType("CONFIRM");
        return;
    }

    return (
        <SafeAreaView className="w-full h-full flex flex-col items-center justify-center">
            <Text> NAVEEN PATHUKO 💋 </Text>
        </SafeAreaView>
    )
}

export default EditEvent;
