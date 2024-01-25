import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown'
import { FOLDER_URL, MEDIA_URL } from "../../lib/constants";
import { EVENT_TYPE, FOLDER_TYPE } from "../../lib/types";
import { Loading } from "../../lib/components";

const Event = () => {
    const defaultData: EVENT_TYPE = {
        "title": "",
        "tagline": "",
        "description": "",
        "rules": [],
        "details": {
            "type": "NON-TECHNICAL",
            "date": "",
            "time": [10, 10]
        },
        "prizes": [],
        "contacts": [],
        "links": [],
        "fee": 0
    }
    const [data, setData] = useState<Array<FOLDER_TYPE> | null>(null);
    const [createData, setCreateData] = useState<EVENT_TYPE>(defaultData);
    const [buttonType, setButtonType] = useState<"SAVE" | "CONFIRM" | "DEFAULT">("DEFAULT");
    const [create, setCreate] = useState<boolean>(false);

    const InputStyle = "bg-gray-100 py-4 px-2 rounded-md border-2 border-black mb-2";
    const InputLabelStyle = "text-xl font-black mt-2";

    const router = useRouter();
    useEffect(() => {
        const GET = async () => {
            const res = await fetch(FOLDER_URL);
            const data = await res.json();
            setData(data.payload.tree.items);
        }
        GET();
    }, [])

    const handleCreate = async () => {
        if (buttonType == "CONFIRM") {
            // TODO: SAVE
            setButtonType("DEFAULT");
            setCreate(false);
            return;
        }
        if (buttonType == "DEFAULT") {
            setCreate(true);
            setButtonType("SAVE");
            return;
        }
        setButtonType("CONFIRM");
    }
    if (!data) return <Loading />
    return (
        <View className="w-full h-full flex flex-col items-center justify-center">
            {!create && <View className="flex flex-row items-center justify-between">
                <Text className="text-2xl ml-2 font-black">Events</Text>
                <Text className="mr-2 text-[10px] font-black">({data.length})</Text>
            </View>}
            <ScrollView className="w-[350px]">
                {!create ? (
                    <View>
                        {data.map((event, event_idx) => {
                            return (
                                <TouchableOpacity onPress={() => router.push(`/events/${event.name}`)} key={event_idx} className="m-2 relative bg-gray-100" >
                                    <Image className="border-2 border-black w-full" height={200} source={{ uri: MEDIA_URL(event.name, 1) }} />
                                    <View style={{ backgroundColor: "rgba(0,0,0,0.6)" }} className="bg-black absolute w-full h-fit p-2 top-[78%] rounded-b-md">
                                        <Text className="text-white text-lg text-center"> {event.name} </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                        )}
                    </View>
                ) : (
                    <View>
                        <Text className={InputLabelStyle}>Title</Text>
                        <TextInput
                            onChange={(e) => {
                                createData.title = e.nativeEvent.text;
                                setCreateData({ ...createData });
                            }}
                            className={`${InputStyle}`}
                        >
                            {createData.title}
                        </TextInput>

                        <Text className={InputLabelStyle}>Tagline</Text>
                        <TextInput
                            onChange={(e) => {
                                createData.tagline = e.nativeEvent.text;
                                setCreateData({ ...createData });
                            }}
                            className={`${InputStyle}`}
                        >
                            {createData.tagline}
                        </TextInput>

                        <Text className={InputLabelStyle}>Fee</Text>
                        <TextInput
                            onChange={(e) => {
                                createData.fee = parseInt(e.nativeEvent.text);
                                setCreateData({ ...createData });
                            }}
                            keyboardType="numeric"
                            className={`${InputStyle}`}
                        >
                            {createData.fee}
                        </TextInput>

                        <Text className={InputLabelStyle}>Description</Text>
                        <TextInput
                            onChange={(e) => {
                                createData.description = e.nativeEvent.text;
                                setCreateData({ ...createData });
                            }}
                            multiline={true}
                            numberOfLines={10}
                            className={`${InputStyle}`}
                        >
                            {createData.description}
                        </TextInput>

                        <Text className={InputLabelStyle}>Rules</Text>
                        {createData.rules.map((rule, rule_idx) => (
                            <View key={rule_idx} className="flex flex-row items-center">
                                <TextInput
                                    onChange={(e) => {
                                        createData.rules[rule_idx] = e.nativeEvent.text;
                                        setCreateData({ ...createData });
                                    }}
                                    className={`${InputStyle} w-[82%] mr-2`}
                                >
                                    {rule}
                                </TextInput>
                                <Pressable
                                    onPress={() => {
                                        createData.rules.splice(rule_idx, 1);
                                        setCreateData({ ...createData });
                                    }}
                                    className="w-14 h-14 bg-red-500 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                                >
                                    <Text className="font-semibold text-xl">X</Text>
                                </Pressable>
                            </View>
                        ))}
                        <Pressable
                            onPress={() => {
                                createData.rules.push("");
                                setCreateData({ ...createData });
                            }}
                            className="w-full h-14 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                        >
                            <Text className="font-semibold text-xl">+</Text>
                        </Pressable>
                        <Text className={InputLabelStyle}>Prize</Text>
                        {createData.prizes.map((prize, prize_idx) => (
                            <View key={prize_idx} className="flex flex-row items-center">
                                <TextInput
                                    onChange={(e) => {
                                        createData.prizes[prize_idx] = e.nativeEvent.text;
                                        setCreateData({ ...createData });
                                    }}
                                    className={`${InputStyle} w-[82%] mr-2`}
                                >
                                    {prize}
                                </TextInput>
                                <Pressable
                                    onPress={() => {
                                        createData.prizes.splice(prize_idx, 1);
                                        setCreateData({ ...createData });
                                    }}
                                    className="w-14 h-14 bg-red-500 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                                >
                                    <Text className="font-semibold text-xl">X</Text>
                                </Pressable>
                            </View>
                        ))}
                        <Pressable
                            onPress={() => {
                                createData.prizes.push("");
                                setCreateData({ ...createData });
                            }}
                            className="w-full h-14 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                        >
                            <Text className="font-semibold text-xl">+</Text>
                        </Pressable>

                        <Text className={InputLabelStyle}>Details</Text>
                        <View className="bg-gray-200 p-4 rounded-md">
                            <View>
                                <Text className="text-[16px] font-black mb-1">Type</Text>
                                <SelectDropdown
                                    data={["TECHNICAL", "NON-TECHNICAL"]}
                                    defaultButtonText={createData.details.type}
                                    buttonStyle={{ justifyContent: "flex-start", width: "100%", backgroundColor: "rgb(243 244 246)", borderWidth: 2, borderColor: "black", borderRadius: 5 }}
                                    buttonTextStyle={{ color: "black", textAlign: "left" }}
                                    dropdownStyle={{ height: 150, backgroundColor: "transparent" }}
                                    rowStyle={{ marginBottom: 2, height: 50, backgroundColor: "rgb(243 244 246)", borderColor: "black", borderWidth: 2, borderBottomColor: "black", borderBottomWidth: 2, borderRadius: 5 }}
                                    rowTextStyle={{ color: "black", textAlign: "left" }}
                                    onSelect={(selectedItem) => {
                                        createData.details.type = selectedItem;
                                        setData({ ...data });
                                    }}
                                />
                            </View>
                            <Text className="text-[16px] font-black mt-2 mb-1">Date</Text>
                            <DateTimePicker
                                value={new Date()}
                                mode='date'
                                display='spinner'
                                textColor='black'
                                style={{ backgroundColor: "rgb(243 244 246)", borderWidth: 2, borderColor: "black", borderRadius: 5 }}
                                onChange={date => {
                                    createData.details.date = new Date(date.nativeEvent.timestamp).toDateString();
                                    setCreateData({ ...createData });
                                }}
                            />
                            <Text className="text-[16px] font-black mt-2 mb-1">Time</Text>
                            <DateTimePicker
                                value={new Date()}
                                mode='time'
                                display='spinner'
                                textColor='black'
                                style={{ backgroundColor: "rgb(243 244 246)", borderWidth: 2, borderColor: "black", borderRadius: 5 }}
                                onChange={time => {
                                    createData.details.time = [new Date(time.nativeEvent.timestamp).getHours(), new Date(time.nativeEvent.timestamp).getMinutes()];
                                    setCreateData({ ...createData });
                                }}
                            />
                        </View>

                        <Text className={InputLabelStyle}>Contact</Text>
                        <View>
                            {createData.contacts.map((contact, contact_idx) => (
                                <View key={contact_idx} className="mb-2 bg-gray-200 p-4 rounded-md">
                                    <Text className="text-[16px] font-black mb-1">Co-ordinator</Text>
                                    <TextInput
                                        onChange={(e) => {
                                            createData.contacts[contact_idx].incharge = e.nativeEvent.text;
                                            setCreateData({ ...createData });
                                        }}
                                        className={InputStyle}
                                    >
                                        {contact.incharge}
                                    </TextInput>
                                    <Text className="text-[16px] font-black mb-1">Email</Text>
                                    <TextInput
                                        keyboardType="email-address"
                                        onChange={(e) => {
                                            createData.contacts[contact_idx].email = e.nativeEvent.text;
                                            setCreateData({ ...createData });
                                        }}
                                        className={InputStyle}
                                    >
                                        {contact.email}
                                    </TextInput>
                                    <Text className="text-[16px] font-black mb-1">Phone-no</Text>
                                    <TextInput
                                        keyboardType="number-pad"
                                        onChange={(e) => {
                                            createData.contacts[contact_idx].phno = e.nativeEvent.text;
                                            setCreateData({ ...createData });
                                        }}
                                        className={InputStyle}
                                    >
                                        {contact.phno}
                                    </TextInput>
                                    <Pressable
                                        onPress={() => {
                                            createData.contacts.splice(contact_idx, 1);
                                            setCreateData({ ...createData });
                                        }}
                                        className="w-full h-14 bg-red-500 rounded-md border-black border-2 flex flex-col mt-2 items-center justify-center text-center mb-2"
                                    >
                                        <Text className="font-semibold text-xl">X</Text>
                                    </Pressable>
                                </View>
                            ))}
                            <Pressable
                                onPress={() => {
                                    createData.contacts.push({ incharge: "", email: "", phno: "" });
                                    setCreateData({ ...createData });
                                }}
                                className="w-full mt-2 h-14 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                            >
                                <Text className="font-semibold text-xl">+</Text>
                            </Pressable>
                        </View>

                        <Text className={InputLabelStyle}>Link</Text>
                        {createData.links.map((link, link_idx) => (
                            <View key={link_idx} className="flex flex-row items-center">
                                <TextInput
                                    onChange={(e) => {
                                        createData.links[link_idx] = e.nativeEvent.text;
                                        setCreateData({ ...createData });
                                    }}
                                    className={`${InputStyle} w-[82%] mr-2`}
                                >
                                    {link}
                                </TextInput>
                                <Pressable
                                    onPress={() => {
                                        createData.links.splice(link_idx, 1);
                                        setCreateData({ ...createData });
                                    }}
                                    className="w-14 h-14 bg-red-500 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                                >
                                    <Text className="font-semibold text-xl">X</Text>
                                </Pressable>
                            </View>
                        ))}
                        <Pressable
                            onPress={() => {
                                createData.links.push("");
                                setCreateData({ ...createData });
                            }}
                            className="w-full h-14 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                        >
                            <Text className="font-semibold text-xl">+</Text>
                        </Pressable>
                    </View>

                )}
            </ScrollView >
            {data && <View className="flex flex-row"><Pressable onPress={handleCreate} style={{ backgroundColor: buttonType === "CONFIRM" ? "#ef4444" : "black", width: create ? 270 : 360 }} className="mt-2 border-2 border-black py-6 w-[270px] rounded-md"><Text className="text-white text-center font-black">{!create ? "CREATE!" : buttonType}</Text></Pressable>{create && <Pressable onPress={() => { setCreate(false); setButtonType("DEFAULT"); setCreateData(defaultData); }} className="border-black border-2 rounded-md bg-red-500 w-[70px] ml-2 h-[70px] mt-2"><Text className="p-4 font-bold text-lg text-center mt-1">X</Text></Pressable>}</View>}
        </View >
    )
}

export default Event;
