import SelectDropdown from 'react-native-select-dropdown'
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { PARSE } from '../../../../lib/utils';
import { EVENT_TYPE } from '../../../../lib/types';
import { Loading } from '../../../../lib/components';

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
                    event_name: JSON.parse(tempData).id,
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
            <ScrollView className="w-full px-4 py-2">
                <View className="py-2">
                    <Text className={InputLabelStyle}>Title</Text>
                    <TextInput
                        onChange={(e) => {
                            data.title = e.nativeEvent.text;
                            setData({ ...data });
                        }}
                        className={`${InputStyle}`}
                    >
                        {data.title}
                    </TextInput>

                    <Text className={InputLabelStyle}>Tagline</Text>
                    <TextInput
                        onChange={(e) => {
                            data.tagline = e.nativeEvent.text;
                            setData({ ...data });
                        }}
                        className={`${InputStyle}`}
                    >
                        {data.tagline}
                    </TextInput>

                    <Text className={InputLabelStyle}>Fee</Text>
                    <TextInput
                        onChange={(e) => {
                            data.fee = parseInt(e.nativeEvent.text);
                            setData({ ...data });
                        }}
                        keyboardType="numeric"
                        className={`${InputStyle}`}
                    >
                        {data.fee}
                    </TextInput>

                    <Text className={InputLabelStyle}>Description</Text>
                    <TextInput
                        onChange={(e) => {
                            data.description = e.nativeEvent.text;
                            setData({ ...data });
                        }}
                        multiline={true}
                        numberOfLines={10}
                        className={`${InputStyle}`}
                    >
                        {data.description}
                    </TextInput>

                    <Text className={InputLabelStyle}>Rules</Text>
                    {data.rules.map((rule, rule_idx) => (
                        <View key={rule_idx} className="flex flex-row items-center">
                            <TextInput
                                onChange={(e) => {
                                    data.rules[rule_idx] = e.nativeEvent.text;
                                    setData({ ...data });
                                }}
                                className={`${InputStyle} w-[82%] mr-2`}
                            >
                                {rule}
                            </TextInput>
                            <Pressable
                                onPress={() => {
                                    data.rules.splice(rule_idx, 1);
                                    setData({ ...data });
                                }}
                                className="w-14 h-14 bg-red-500 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                            >
                                <Text className="font-semibold text-xl">X</Text>
                            </Pressable>
                        </View>
                    ))}
                    <Pressable
                        onPress={() => {
                            data.rules.push("");
                            setData({ ...data });
                        }}
                        className="w-full h-14 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                    >
                        <Text className="font-semibold text-xl">+</Text>
                    </Pressable>
                    <Text className={InputLabelStyle}>Prize</Text>
                    {data.prizes.map((prize, prize_idx) => (
                        <View key={prize_idx} className="flex flex-row items-center">
                            <TextInput
                                onChange={(e) => {
                                    data.prizes[prize_idx] = e.nativeEvent.text;
                                    setData({ ...data });
                                }}
                                className={`${InputStyle} w-[82%] mr-2`}
                            >
                                {prize}
                            </TextInput>
                            <Pressable
                                onPress={() => {
                                    data.prizes.splice(prize_idx, 1);
                                    setData({ ...data });
                                }}
                                className="w-14 h-14 bg-red-500 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                            >
                                <Text className="font-semibold text-xl">X</Text>
                            </Pressable>
                        </View>
                    ))}
                    <Pressable
                        onPress={() => {
                            data.prizes.push("");
                            setData({ ...data });
                        }}
                        className="w-full h-14 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                    >
                        <Text className="font-semibold text-xl">+</Text>
                    </Pressable>

                    <Text className={InputLabelStyle}>Details</Text>
                    <View className="bg-gray-300 p-4 rounded-md">
                        <View>
                            <Text className="text-[16px] font-black mb-1">Type</Text>
                            <SelectDropdown
                                data={["TECHNICAL", "NON-TECHNICAL"]}
                                defaultButtonText={data.details.type}
                                buttonStyle={{ justifyContent: "flex-start", width: "100%", backgroundColor: "rgb(243 244 246)", borderWidth: 2, borderColor: "black", borderRadius: 5 }}
                                buttonTextStyle={{ color: "black", textAlign: "left" }}
                                dropdownStyle={{ height: 150, backgroundColor: "transparent" }}
                                rowStyle={{ marginBottom: 2, height: 50, backgroundColor: "rgb(243 244 246)", borderColor: "black", borderWidth: 2, borderBottomColor: "black", borderBottomWidth: 2, borderRadius: 5 }}
                                rowTextStyle={{ color: "black", textAlign: "left" }}
                                onSelect={(selectedItem) => {
                                    data.details.type = selectedItem;
                                    setData({ ...data });
                                }}
                            />
                        </View>
                        <Text className="text-[16px] font-black mt-2 mb-1">Date</Text>
                        <Text className="text-[16px] font-black mt-2 mb-1">Time</Text>
                    </View>

                    <Text className={InputLabelStyle}>Contact</Text>
                    <View>
                        {data.contacts.map((contact, contact_idx) => (
                            <View key={contact_idx} className="mb-2 bg-gray-300 p-4 rounded-md">
                                <Text className="text-[16px] font-black mb-1">Co-ordinator</Text>
                                <TextInput
                                    onChange={(e) => {
                                        data.contacts[contact_idx].incharge = e.nativeEvent.text;
                                        setData({ ...data });
                                    }}
                                    className={InputStyle}
                                >
                                    {contact.incharge}
                                </TextInput>
                                <Text className="text-[16px] font-black mb-1">Email</Text>
                                <TextInput
                                    keyboardType="email-address"
                                    onChange={(e) => {
                                        data.contacts[contact_idx].email = e.nativeEvent.text;
                                        setData({ ...data });
                                    }}
                                    className={InputStyle}
                                >
                                    {contact.email}
                                </TextInput>
                                <Text className="text-[16px] font-black mb-1">Phone-no</Text>
                                <TextInput
                                    keyboardType="number-pad"
                                    onChange={(e) => {
                                        data.contacts[contact_idx].phno = e.nativeEvent.text;
                                        setData({ ...data });
                                    }}
                                    className={InputStyle}
                                >
                                    {contact.phno}
                                </TextInput>
                                <Pressable
                                    onPress={() => {
                                        data.contacts.splice(contact_idx, 1);
                                        setData({ ...data });
                                    }}
                                    className="w-full h-14 bg-red-500 rounded-md border-black border-2 flex flex-col mt-2 items-center justify-center text-center mb-2"
                                >
                                    <Text className="font-semibold text-xl">X</Text>
                                </Pressable>
                            </View>
                        ))}
                        <Pressable
                            onPress={() => {
                                data.contacts.push({ incharge: "", email: "", phno: "" });
                                setData({ ...data });
                            }}
                            className="w-full mt-2 h-14 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                        >
                            <Text className="font-semibold text-xl">+</Text>
                        </Pressable>
                    </View>

                    <Text className={InputLabelStyle}>Link</Text>
                    {data.links.map((link, link_idx) => (
                        <View key={link_idx} className="flex flex-row items-center">
                            <TextInput
                                onChange={(e) => {
                                    data.links[link_idx] = e.nativeEvent.text;
                                    setData({ ...data });
                                }}
                                className={`${InputStyle} w-[82%] mr-2`}
                            >
                                {link}
                            </TextInput>
                            <Pressable
                                onPress={() => {
                                    data.links.splice(link_idx, 1);
                                    setData({ ...data });
                                }}
                                className="w-14 h-14 bg-red-500 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                            >
                                <Text className="font-semibold text-xl">X</Text>
                            </Pressable>
                        </View>
                    ))}
                    <Pressable
                        onPress={() => {
                            data.links.push("");
                            setData({ ...data });
                        }}
                        className="w-full h-14 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                    >
                        <Text className="font-semibold text-xl">+</Text>
                    </Pressable>
                </View>
            </ ScrollView>
            <View className="flex flex-row"><Pressable onPress={handleSave} style={{ backgroundColor: buttonType === "CONFIRM" ? "#ef4444" : "black" }} className="mt-2 border-2 border-black py-6 w-[360px] rounded-md"><Text className="text-white text-center font-black">{buttonType}</Text></Pressable></View>
        </SafeAreaView>
    )
}

export default EditEvent;
