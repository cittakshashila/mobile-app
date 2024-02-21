import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { EVENT_TYPE } from "../../../lib/types";
import { useState } from "react";
import SelectDropdown from 'react-native-select-dropdown'
import { useRouter } from "expo-router";
import { call } from "../../_layout";
import { octokit } from "../../../lib/utils";
import { REPO_NAME, REPO_OWNER } from "../../../lib/constants";

const CreateEvent = () => {

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

    const router = useRouter();

    const [createData, setCreateData] = useState<EVENT_TYPE>(defaultData);
    const [buttonType, setButtonType] = useState<"SAVE" | "CONFIRM">("SAVE");
    const [create, setCreate] = useState<boolean>(false);

    const InputStyle = "bg-gray-100 py-4 px-2 rounded-md border-2 border-black mb-2";
    const InputLabelStyle = "text-xl font-black mt-2";

    const [toggle, setToggle] = useState<{
        title: boolean,
        description: boolean,
        rules: boolean,
        guidelines: boolean,
        registrations: boolean,
    }>({
        title: true,
        description: true,
        rules: true,
        guidelines: true,
        registrations: true,
    })

    const handleCreate = async () => {
        if (buttonType == "CONFIRM") {
            const res = await fetch("/api/event/PUT" as `http${string}`, {
                method: "PUT",
                body: JSON.stringify({
                    event_name: createData.title,
                    event_data: createData,
                    type: "CREATE"
                })
            })
            const data = await res.json();
            console.log(data);
            router.push(`/events` as `http${string}`);
            setCreateData(defaultData);
            return;
        }
        setButtonType("CONFIRM");
    }

    return (
        <SafeAreaView className="w-full h-full flex flex-col items-center justify-center">
            <ScrollView className="w-full p-2">
                <View className="m-2">
                    <View className="">
                        { toggle.title ? 
                            <Text className={InputLabelStyle}>Title</Text> :
                            <Text className={InputLabelStyle}>Title</Text>
                        }
                        <Pressable
                            onPress={() => {
                                toggle.title = !toggle.title
                                setToggle({ ...toggle })
                            }}
                            className="w-8 h-8 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                        >
                            <Text className="font-semibold text-xl">TOGGLE</Text>
                        </Pressable>
                    </View>
                    { toggle.title && <TextInput
                        onChange={(e) => {
                            createData.title = e.nativeEvent.text;
                            setCreateData({ ...createData });
                        }}
                        className={`${InputStyle}`}
                    >
                        {createData.title}
                    </TextInput> }

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
                                    setCreateData({ ...createData });
                                }}
                            />
                        </View>
                        <Text className="text-[16px] font-black mt-2 mb-1">Date</Text>
                        <Text className="text-[16px] font-black mt-2 mb-1">Time</Text>
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
            </ ScrollView>
            <View className="flex flex-row"><Pressable onPress={handleCreate} style={{ backgroundColor: buttonType === "CONFIRM" ? "#ef4444" : "black" }} className="mt-2 border-2 border-black py-6 w-[360px] rounded-md"><Text className="text-white text-center font-black">{buttonType}</Text></Pressable></View>
        </SafeAreaView>
    )
}

export default CreateEvent;
