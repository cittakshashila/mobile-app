import { Alert, Button, Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { EVENT_TYPE } from "../../../lib/types";
import { useState } from "react";
import SelectDropdown from 'react-native-select-dropdown'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useRouter } from "expo-router";
import { useEventStore } from "../../../lib/store";
import { SmallLoading } from "../../../lib/components";

const CreateEvent = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const defaultData: EVENT_TYPE = {
        "id": "",
        "title": "",
        "description": "",
        "rules": [],
        "details": {
            "type": "NON-TECHNICAL",
            "date": "",
            "time": [10, 10]
        },
        "prizes": [],
        "contacts": [],
        "guidelines": [],
        "registration": [],
        "glink": "",
        "day": "DAY1",
        "category": "GEN"
    }

    const [createData, setCreateData] = useState<EVENT_TYPE>(defaultData);
    const [buttonType, setButtonType] = useState<"SAVE" | "CONFIRM">("SAVE");

    const [imageIN, setImageIN] = useState<string | null>(null);
    const [imageOUT, setImageOUT] = useState<string | null>(null);

    const [baseIN, setBaseIN] = useState<string | null>(null);
    const [baseOUT, setBaseOUT] = useState<string | null>(null);

    const [date, setDate] = useState<"DAY1" | "DAY2" | "DAY3" | "">("");
    const { event } = useEventStore()

    const pickImageIN = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImageIN(result.assets[0].uri);
            const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: FileSystem.EncodingType.Base64 });
            setBaseIN(base64)
        }
    };

    const pickImageOUT = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImageOUT(result.assets[0].uri);
            const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: FileSystem.EncodingType.Base64 });
            setBaseOUT(base64)
        }
    };

    const InputStyle = "bg-gray-100 py-4 px-2 rounded-md border-2 border-black mb-2";
    const InputLabelStyle = "text-xl font-black mt-2";

    const [toggle, setToggle] = useState<{
        title: boolean,
        description: boolean,
        rules: boolean,
        guidelines: boolean,
        registration: boolean,
        contacts: boolean,
        glink: boolean,
    }>({
        title: true,
        description: true,
        rules: true,
        guidelines: true,
        registration: true,
        contacts: true,
        glink: true,
    })

    const handleCreate = async () => {
        if (buttonType == "CONFIRM") {
            setIsLoading(true);
            for (const key in toggle) {
                if (!toggle[key]) {
                    delete createData[key]
                }
            }

            setCreateData({ ...createData })
            console.log(createData)
            try {
                const res = await fetch("/api/event/PUT" as `http${string}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        token: event?.token,
                        event_name: createData.id,
                        event_data: createData,
                        type: "CREATE"
                    })
                })

                if (imageIN) {
                    const res = await fetch("/api/event/PUT" as `http${string}`, {
                        method: "PUT",
                        body: JSON.stringify({
                            img: baseIN,
                            num: 1,
                            token: event?.token,
                            event_name: createData.id,
                            event_data: createData,
                            type: "CREATE IMAGE"
                        })
                    })
                }
                if (imageOUT) {
                    const res = await fetch("/api/event/PUT" as `http${string}`, {
                        method: "PUT",
                        body: JSON.stringify({
                            img: baseOUT,
                            num: 2,
                            token: event?.token,
                            event_name: createData.id,
                            event_data: createData,
                            type: "CREATE IMAGE"
                        })
                    })
                }

                const data = await res.json();
                console.log(data);
                router.push(`/events` as `http${string}`);
                setCreateData(defaultData);
                return;
            } catch (e) {
                Alert.alert("Error", "Something went wrong");
            } finally {
                setIsLoading(false);
            }
        }
        setButtonType("CONFIRM");
    }

    return (
        <SafeAreaView className="w-full h-full flex flex-col items-center justify-center">
            <ScrollView className="w-full p-2">
                <View className="m-2">
                    <Text className={InputLabelStyle}>ID</Text>
                    <TextInput
                        onChange={(e) => {
                            createData.id = e.nativeEvent.text;
                            setCreateData({ ...createData });
                        }}
                        className={`${InputStyle}`}
                    >
                        {createData.id}
                    </TextInput>
                </View>
                <View className="m-2">
                    <View className="mt-4 w-full flex flex-row items-center justify-between">
                        {toggle.title ?
                            <Text className={InputLabelStyle}>Title</Text> :
                            <Text className={InputLabelStyle + ' italic line-through '}>Title</Text>
                        }
                        <Pressable
                            onPress={() => {
                                toggle.title = !toggle.title
                                setToggle({ ...toggle })
                            }}
                        >
                            {toggle.title ?
                                <Text className="font-bold text-xl">&uarr;</Text> :
                                <Text className="font-bold text-xl">&darr;</Text>
                            }
                        </Pressable>
                    </View>
                    {toggle.title && <TextInput
                        onChange={(e) => {
                            createData.title = e.nativeEvent.text;
                            setCreateData({ ...createData });
                        }}
                        className={`${InputStyle}`}
                    >
                        {createData.title}
                    </TextInput>}

                    <View className="mt-4 w-full flex flex-row items-center justify-between">
                        {toggle.description ?
                            <Text className={InputLabelStyle}>Description</Text> :
                            <Text className={InputLabelStyle + ' italic line-through '}>Description</Text>
                        }
                        <Pressable
                            onPress={() => {
                                toggle.description = !toggle.description
                                setToggle({ ...toggle })
                            }}
                        >
                            {toggle.description ?
                                <Text className="font-bold text-xl">&uarr;</Text> :
                                <Text className="font-bold text-xl">&darr;</Text>
                            }
                        </Pressable>
                    </View>
                    {toggle.description && <TextInput
                        onChange={(e) => {
                            createData.description = e.nativeEvent.text;
                            setCreateData({ ...createData });
                        }}
                        multiline={true}
                        numberOfLines={10}
                        className={`${InputStyle}`}
                    >
                        {createData.description}
                    </TextInput>}

                    <View className="mt-4 w-full flex flex-row items-center justify-between">
                        {toggle.registration ?
                            <Text className={InputLabelStyle}>Registration</Text> :
                            <Text className={InputLabelStyle + ' italic line-through '}>Registration</Text>
                        }
                        <Pressable
                            onPress={() => {
                                toggle.registration = !toggle.registration
                                setToggle({ ...toggle })
                            }}
                        >
                            {toggle.registration ?
                                <Text className="font-bold text-xl">&uarr;</Text> :
                                <Text className="font-bold text-xl">&darr;</Text>
                            }
                        </Pressable>
                    </View>
                    {toggle.registration && createData.registration.map((reg, reg_idx) => (
                        <View key={reg_idx} className="flex flex-row items-center">
                            <TextInput
                                onChange={(e) => {
                                    createData.registration[reg_idx] = e.nativeEvent.text;
                                    setCreateData({ ...createData });
                                }}
                                className={`${InputStyle} w-[82%] mr-2`}
                            >
                                {reg}
                            </TextInput>
                            <Pressable
                                onPress={() => {
                                    createData.registration.splice(reg_idx, 1);
                                    setCreateData({ ...createData });
                                }}
                                className="w-14 h-14 bg-red-500 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                            >
                                <Text className="font-semibold text-xl">X</Text>
                            </Pressable>
                        </View>
                    ))}
                    {toggle.registration && <Pressable
                        onPress={() => {
                            createData.registration.push("");
                            setCreateData({ ...createData });
                        }}
                        className="w-full h-14 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                    >
                        <Text className="font-semibold text-xl">+</Text>
                    </Pressable>}

                    <View className="mt-4 w-full flex flex-row items-center justify-between">
                        {toggle.rules ?
                            <Text className={InputLabelStyle}>Rules</Text> :
                            <Text className={InputLabelStyle + ' italic line-through '}>Rules</Text>
                        }
                        <Pressable
                            onPress={() => {
                                toggle.rules = !toggle.rules
                                setToggle({ ...toggle })
                            }}
                        >
                            {toggle.rules ?
                                <Text className="font-bold text-xl">&uarr;</Text> :
                                <Text className="font-bold text-xl">&darr;</Text>
                            }
                        </Pressable>
                    </View>
                    {toggle.rules && createData.rules.map((rule, rule_idx) => (
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

                    {toggle.rules && <Pressable
                        onPress={() => {
                            createData.rules.push("");
                            setCreateData({ ...createData });
                        }}
                        className="w-full h-14 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                    >
                        <Text className="font-semibold text-xl">+</Text>
                    </Pressable>}

                    <View className="mt-4 w-full flex flex-row items-center justify-between">
                        {toggle.guidelines ?
                            <Text className={InputLabelStyle}>Guidelines</Text> :
                            <Text className={InputLabelStyle + ' italic line-through '}>Guidelines</Text>
                        }
                        <Pressable
                            onPress={() => {
                                toggle.guidelines = !toggle.guidelines
                                setToggle({ ...toggle })
                            }}
                        >
                            {toggle.guidelines ?
                                <Text className="font-bold text-xl">&uarr;</Text> :
                                <Text className="font-bold text-xl">&darr;</Text>
                            }
                        </Pressable>
                    </View>
                    {toggle.guidelines && createData.guidelines.map((g, i) => (
                        <View key={i} className="flex flex-row items-center">
                            <TextInput
                                onChange={(e) => {
                                    createData.guidelines[i] = e.nativeEvent.text;
                                    setCreateData({ ...createData });
                                }}
                                className={`${InputStyle} w-[82%] mr-2`}
                            >
                                {g}
                            </TextInput>
                            <Pressable
                                onPress={() => {
                                    createData.guidelines.splice(i, 1);
                                    setCreateData({ ...createData });
                                }}
                                className="w-14 h-14 bg-red-500 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                            >
                                <Text className="font-semibold text-xl">X</Text>
                            </Pressable>
                        </View>
                    ))}
                    {toggle.guidelines && <Pressable
                        onPress={() => {
                            createData.guidelines.push("");
                            setCreateData({ ...createData });
                        }}
                        className="w-full h-14 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                    >
                        <Text className="font-semibold text-xl">+</Text>
                    </Pressable>}

                    <Text className={InputLabelStyle}>Details</Text>
                    <View className="bg-gray-200 p-4 rounded-md">
                        <View>
                            <Text className="text-[16px] font-black mb-1">Type</Text>
                            <SelectDropdown
                                data={["TECHNICAL", "NON-TECHNICAL", "WORKSHOP", "ONLINE EVENT", "PRO SHOW"]}
                                defaultButtonText={createData.details.type}
                                buttonStyle={{ justifyContent: "flex-start", width: "100%", backgroundColor: "rgb(243 244 246)", borderWidth: 2, borderColor: "black", borderRadius: 5 }}
                                buttonTextStyle={{ color: "black", textAlign: "left" }}
                                dropdownStyle={{ height: 150, backgroundColor: "transparent" }}
                                rowStyle={{ marginBottom: 2, height: 50, backgroundColor: "rgb(243 244 246)", borderColor: "black", borderWidth: 2, borderBottomColor: "black", borderBottomWidth: 2, borderRadius: 5 }}
                                rowTextStyle={{ color: "black", textAlign: "left" }}
                                onSelect={(selectedItem) => {
                                    createData.category = ["TECHNICAL", "NON-TECHNICAL", "ONLINE EVENT"].includes(selectedItem) ? "GEN" : selectedItem == "PRO SHOW" ? "PRO" : "WK"
                                    setCreateData({ ...createData })

                                    createData.details.type = selectedItem;
                                    setCreateData({ ...createData });
                                }}
                            />
                        </View>
                        <Text className="text-[16px] font-black mt-2 mb-1">Date</Text>
                        <View className="flex flex-row items-center justify-between">
                            <Pressable onPress={() => setDate("DAY1")} className={`w-1/4 h-14 ${date === 'DAY1' ? 'bg-red-400' : 'bg-green-400'} rounded-md border-black border-2 items-center justify-center text-center mb-2`}>
                                <Text>DAY1</Text>
                            </Pressable>
                            <Pressable onPress={() => setDate("DAY2")} className={`w-1/4 h-14 ${date === 'DAY2' ? 'bg-red-400' : 'bg-green-400'} rounded-md border-black border-2 items-center justify-center text-center mb-2`}>
                                <Text>DAY2</Text>
                            </Pressable>
                            <Pressable onPress={() => setDate("DAY3")} className={`w-1/4 h-14 ${date === 'DAY3' ? 'bg-red-400' : 'bg-green-400'} rounded-md border-black border-2 items-center justify-center text-center mb-2`}>
                                <Text>DAY3</Text>
                            </Pressable>
                        </View>
                        <Text className="text-[16px] font-black mt-2 mb-1">Time</Text>
                    </View>

                    <View className="mt-4 w-full flex flex-row items-center justify-between">
                        {toggle.contacts ?
                            <Text className={InputLabelStyle}>Contacts</Text> :
                            <Text className={InputLabelStyle + ' italic line-through '}>Contacts</Text>
                        }
                        <Pressable
                            onPress={() => {
                                toggle.contacts = !toggle.contacts
                                setToggle({ ...toggle })
                            }}
                        >
                            {toggle.contacts ?
                                <Text className="font-bold text-xl">&uarr;</Text> :
                                <Text className="font-bold text-xl">&darr;</Text>
                            }
                        </Pressable>
                    </View>
                    <View>
                        {toggle.contacts && createData.contacts.map((contact, contact_idx) => (
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
                        {toggle.contacts && <Pressable
                            onPress={() => {
                                createData.contacts.push({ incharge: "", phno: "" });
                                setCreateData({ ...createData });
                            }}
                            className="w-full mt-2 h-14 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                        >
                            <Text className="font-semibold text-xl">+</Text>
                        </Pressable>}
                        {createData.details.type == "ONLINE EVENT" ?
                            <View>{toggle.glink ?
                                <Text className={InputLabelStyle}>Google Link</Text> :
                                <Text className={InputLabelStyle + ' italic line-through '}>Google Link</Text>

                            }
                                <Pressable
                                    onPress={() => {
                                        toggle.glink = !toggle.glink
                                        setToggle({ ...toggle })
                                    }}
                                    className="w-8 h-8 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"
                                >
                                    <Text className="font-semibold text-xl">{'O'}</Text>
                                </Pressable>
                                {toggle.glink && <TextInput
                                    onChange={(e) => {
                                        createData.title = e.nativeEvent.text;
                                        setCreateData({ ...createData });
                                    }}
                                    className={`${InputStyle}`}
                                >
                                    {createData.title}
                                </TextInput>}
                            </View>
                            : null}
                        <View className="mt-4">
                            <View className={InputStyle} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Button title="PICK 'IN' IMAGE" onPress={pickImageIN} />
                                {imageIN && <Image source={{ uri: imageIN }} style={{ width: 200, height: 200 }} />}
                            </View>
                            <View className={InputStyle + " mt-4"} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Button title="PICK 'OUT' IMAGE" onPress={pickImageOUT} />
                                {imageOUT && <Image source={{ uri: imageOUT }} style={{ width: 200, height: 200 }} />}
                            </View>
                        </View>
                    </View>

                </View>
            </ ScrollView>
            <View className="flex flex-row"><Pressable onPress={handleCreate} style={{ backgroundColor: buttonType === "CONFIRM" ? "#ef4444" : "black" }} className="mt-2 border-2 border-black py-6 w-[360px] rounded-md">{!isLoading ? <Text className="text-white text-center font-black">{buttonType}</Text> : <SmallLoading />}</Pressable></View>
        </SafeAreaView>
    )
}

export default CreateEvent;
