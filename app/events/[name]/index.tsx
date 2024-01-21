import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native"
import { INFO_URL } from "../../../lib/constants";
import { PARSE } from "../../../lib/utils/PARSE";
import { EVENT_TYPE } from "../../../lib/types";
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useGlobalSearchParams } from "expo-router";

const event = () => {
    const [data, setData] = useState<EVENT_TYPE | null>(null);
    const [edit, setEdit] = useState<boolean>(false);

    const params = useGlobalSearchParams();

    const InputStyle = "bg-gray-100 py-4 px-2 rounded-md border-2 border-black mb-2";
    const InputLabelStyle = "text-xl font-black";
    useEffect(() => {
        const CALL = async () => {
            const res = await fetch(INFO_URL(params.name as string));
            const D = await res.json();
            // console.log(PARSE(D.payload.blob.rawLines) as EVENT_TYPE);
            // console.log(D.payload.blob.rawLines);
            // console.log(D)
            setData(PARSE(D.payload.blob.rawLines) as EVENT_TYPE);
        }
        CALL();
    }, [])
    return (
        <View className="flex flex-col items-center justify-center">
            <ScrollView className="px-2 w-full mt-8">
                <View>
                    {!data ? <Text>LOADING...</Text> :
                        (
                            <View>
                                {!edit ? <Text className="text-[30px] font-black"> {data.title}</Text> : <View><Text className={InputLabelStyle}>Title</Text><TextInput onChange={(e) => { data.title = e.nativeEvent.text; setData({ ...data }); }} className={`${InputStyle}`}>{data.title}</TextInput></View>}
                                {!edit ? <Text> {data.tagline} </Text> : <View><Text className={InputLabelStyle}>Tagline</Text><TextInput onChange={(e) => { data.tagline = e.nativeEvent.text; setData({ ...data }); }} className={`${InputStyle}`}>{data.tagline}</TextInput></View>}
                                {!edit ? <View className="bg-black p-4 rounded-md mt-4"><Text className="text-white font-black text-center">{data.fee} ₹</Text></View> : <View><Text className={InputLabelStyle}>Fee</Text><TextInput onChange={(e) => { data.fee = parseInt(e.nativeEvent.text); setData({ ...data }); }} keyboardType="numeric" className={`${InputStyle}`}>{data.fee}</TextInput></View>}
                                {!edit ? <View className="mt-4 p-4 bg-gray-100 rounded-md"><Text>{data.description}</Text></View> : <View><Text className={InputLabelStyle}>Description</Text><TextInput onChange={(e) => { data.description = e.nativeEvent.text; setData({ ...data }); }} multiline={true} numberOfLines={10} className={`${InputStyle}`}>{data.description}</TextInput></View>}
                                {!edit ?
                                    (<View className="mt-4 p-4 bg-gray-100 rounded-md">
                                        <Text className="text-[15px] font-black">Rules</Text>
                                        <View className="mt-2">
                                            {data.rules.map((rule, rule_idx) => (
                                                <Text key={rule_idx}>- {rule}</Text>
                                            ))}
                                        </View>
                                    </View>) : (
                                        <View>
                                            <Text className={InputLabelStyle}>Rules</Text>
                                            {data.rules.map((rule, rule_idx) => (
                                                <View key={rule_idx} className="flex flex-row items-center">
                                                    <TextInput onChange={(e) => {
                                                        data.rules[rule_idx] = e.nativeEvent.text;
                                                        setData({ ...data });
                                                    }} className={`${InputStyle} w-[82%] mr-2`}>{rule}</TextInput>
                                                    <Pressable onPress={() => {
                                                        data.rules.splice(rule_idx, 1);
                                                        setData({ ...data });
                                                    }} className="w-14 h-14 bg-red-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"><Text className="font-semibold text-xl">X</Text></Pressable>
                                                </View>
                                            ))}
                                            <Pressable onPress={() => {
                                                data.rules.push("");
                                                setData({ ...data });
                                            }} className="w-full h-14 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"><Text className="font-semibold text-xl">+</Text></Pressable>
                                        </View>
                                    )}
                                {!edit ?
                                    (<View className="mt-4 p-4 bg-gray-100 rounded-md">
                                        <Text className="text-[15px] font-black">Prize</Text>
                                        <View className="mt-2">
                                            {data.prizes.map((prize, prize_idx) => (
                                                <Text key={prize_idx}>- {prize}</Text>
                                            ))}
                                        </View>
                                    </View>
                                    ) : (
                                        <View>
                                            <Text className={InputLabelStyle}>Prize</Text>
                                            {data.prizes.map((prize, prize_idx) => (
                                                <View key={prize_idx} className="flex flex-row items-center">
                                                    <TextInput onChange={(e) => {
                                                        data.prizes[prize_idx] = e.nativeEvent.text;
                                                        setData({ ...data });
                                                    }} className={`${InputStyle} w-[82%] mr-2`}>{prize}</TextInput>
                                                    <Pressable onPress={() => {
                                                        data.prizes.splice(prize_idx, 1);
                                                        setData({ ...data });
                                                    }} className="w-14 h-14 bg-red-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"><Text className="font-semibold text-xl">X</Text></Pressable>
                                                </View>
                                            ))}
                                            <Pressable onPress={() => {
                                                data.prizes.push("");
                                                setData({ ...data });
                                            }} className="w-full h-14 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"><Text className="font-semibold text-xl">+</Text></Pressable>
                                        </View>
                                    )}
                                {!edit ?
                                    (<View className="mt-4 p-4 bg-gray-100 rounded-md">
                                        <Text className="text-[15px] font-black">Details</Text>
                                        <View className="mt-2 bg-gray-200 p-4 rounded-md">
                                            <Text><Text className="font-bold">Type</Text>: {data.details.type}</Text>
                                            <Text><Text className="font-bold">Date</Text>: {data.details.date}</Text>
                                            <Text><Text className="font-bold">Time</Text>: {data.details.time[0] % 12}:{data.details.time[1]} {data.details.time[0] > 12 ? "PM" : "AM"}</Text>
                                        </View>
                                    </View>) : (
                                        (<View>
                                            <Text className={InputLabelStyle}>Details</Text>
                                            <View className="bg-gray-200 p-4 rounded-md">
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
                                                <View>
                                                    <Text className="text-[16px] font-black mt-2 mb-1">Date</Text>
                                                    <DateTimePicker
                                                        value={new Date(data.details.date)}
                                                        mode='date'
                                                        display='spinner'
                                                        textColor='black'
                                                        style={{ backgroundColor: "rgb(243 244 246)", borderWidth: 2, borderColor: "black", borderRadius: 5 }}
                                                        onChange={date => {
                                                            data.details.date = new Date(date.nativeEvent.timestamp).toDateString();
                                                            setData({ ...data });
                                                        }} />
                                                </View>
                                                <View>
                                                    <Text className="text-[16px] font-black mt-2 mb-1">Time</Text>
                                                    <DateTimePicker
                                                        value={new Date(data.details.date)}
                                                        mode='time'
                                                        display='spinner'
                                                        textColor='black'
                                                        style={{ backgroundColor: "rgb(243 244 246)", borderWidth: 2, borderColor: "black", borderRadius: 5 }}
                                                        onChange={time => {
                                                            data.details.time = [new Date(time.nativeEvent.timestamp).getHours(), new Date(time.nativeEvent.timestamp).getMinutes()];
                                                            setData({ ...data });
                                                        }} />
                                                </View>
                                            </View>
                                        </View>)
                                    )
                                }
                                {!edit ?
                                    (<View className="mt-4 p-4 bg-gray-100 rounded-md">
                                        <Text className="text-[15px] font-black">Contact</Text>
                                        <View className="mt-2">
                                            {data.contacts.map((contact, contact_idx) => (
                                                <View key={contact_idx} className="mt-2 bg-gray-200 p-4 rounded-md">
                                                    <Text><Text className="font-bold">Co-ordinator</Text>: {contact.incharge}</Text>
                                                    <Text><Text className="font-bold">Email</Text>: {contact.email}</Text>
                                                    <Text><Text className="font-bold">Phone-no</Text>: {contact.phno}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>) : (
                                        <View className="mt-2">
                                            <Text className={InputLabelStyle}>Contact</Text>
                                            <View>
                                                {data.contacts.map((contact, contact_idx) => (
                                                    <View key={contact_idx} className="mb-2 bg-gray-200 p-4 rounded-md">
                                                        <View>
                                                            <Text className="text-[16px] font-black mb-1">Co-ordinator</Text>
                                                            <TextInput onChange={(e) => { data.contacts[contact_idx].incharge = e.nativeEvent.text; setData({ ...data }); }} className={InputStyle}>{contact.incharge}</TextInput>
                                                        </View>
                                                        <View>
                                                            <Text className="text-[16px] font-black mb-1">Email</Text>
                                                            <TextInput keyboardType="email-address" onChange={(e) => { data.contacts[contact_idx].email = e.nativeEvent.text; setData({ ...data }); }} className={InputStyle}>{contact.email}</TextInput>
                                                        </View>
                                                        <View>
                                                            <Text className="text-[16px] font-black mb-1">Phone-no</Text>
                                                            <TextInput keyboardType="number-pad" onChange={(e) => { data.contacts[contact_idx].phno = e.nativeEvent.text; setData({ ...data }); }} className={InputStyle}>{contact.phno}</TextInput>
                                                        </View>
                                                        <Pressable onPress={() => {
                                                            data.contacts.splice(contact_idx, 1);
                                                            setData({ ...data });
                                                        }} className="w-full h-14 bg-red-400 rounded-md border-black border-2 flex flex-col mt-2 items-center justify-center text-center mb-2"><Text className="font-semibold text-xl">X</Text></Pressable>
                                                    </View>
                                                ))}
                                                <Pressable onPress={() => {
                                                    data.contacts.push({ incharge: "", email: "", phno: "" });
                                                    setData({ ...data });
                                                }} className="w-full mt-2 h-14 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"><Text className="font-semibold text-xl">+</Text></Pressable>
                                            </View>
                                        </View>
                                    )}
                                {!edit ?
                                    (<View className="mt-4 p-4 bg-gray-100 rounded-md">
                                        <Text className="text-[15px] font-black">Links</Text>
                                        <View className="mt-2">
                                            {data.links.map((link, link_idx) => (
                                                <Text key={link_idx}>- {link}</Text>
                                            ))}
                                        </View>
                                    </View>) :
                                    (<View>
                                        <Text className={InputLabelStyle}>Link</Text>
                                        <View>
                                            {data.links.map((link, link_idx) => (
                                                <View key={link_idx} className="flex flex-row items-center">
                                                    <TextInput onChange={(e) => { data.links[link_idx] = e.nativeEvent.text; setData({ ...data }); }} className={`${InputStyle} w-[82%] mr-2`}>{link}</TextInput>
                                                    <Pressable onPress={() => { data.links.splice(link_idx, 1); setData({ ...data }); }} className="w-14 h-14 bg-red-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"><Text className="font-semibold text-xl">X</Text></Pressable>
                                                </View>
                                            ))}
                                            <Pressable onPress={() => { data.links.push(""); setData({ ...data }); }} className="w-full h-14 bg-green-400 rounded-md border-black border-2 flex flex-col items-center justify-center text-center mb-2"><Text className="font-semibold text-xl">+</Text></Pressable>
                                        </View>
                                    </View>
                                    )}
                            </View>
                        )}
                </View>
            </ScrollView>
            {data && <Pressable onPress={() => setEdit(!edit)} className="mt-2 bg-black py-6 w-[350px] rounded-md"><Text className="text-white text-center font-black">{!edit ? "EDIT!" : "SAVE"}</Text></Pressable>}
        </View>
    )
}

export default event;


