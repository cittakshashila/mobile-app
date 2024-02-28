import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Alert, TextInput, Pressable } from "react-native";
import { API_URL } from "../../../../../lib/constants";
import { useGlobalSearchParams } from "expo-router";
import axios from "axios";
import { useEventStore } from "../../../../../lib/store/events";
import { SmallLoading } from "../../../../../lib/components";

const Mail = () => {
    const params = useGlobalSearchParams()

    const { event } = useEventStore()
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [context, setContext] = useState<string>(`Announcement regarding: `)
    const [content, setContent] = useState<string>("")

    const InputStyle = "bg-gray-100 py-4 px-2 rounded-md border-2 border-black mb-2";

    useEffect(() => {
        setTimeout(() => {
            setSuccess(false)
            setError(false)
        })
    }, [success, error])

    const sendMail = async () => {
        setIsLoading(true)
        if (!!!content || !!!context) {
            setIsLoading(false);
            return;
        }
        try {
            await axios.post(`${API_URL}/support/emergency`, {
                body: content,
                subject: context,
                event_id: params.name
            }, {
                headers: {
                    "Authorization": `Bearer ${event?.token}`
                },
                timeout: 10000
            })
            setSuccess(true)
        } catch (err) {
            setError(true)
        } finally {
            setIsLoading(true)
        }
    }

    return (
        <View className="flex flex-col items-center justify-center w-full h-full">
            <View style={styles.container}>
                <Text className="font-bold mb-2">Subject</Text>
                <TextInput
                    multiline={true}
                    numberOfLines={2}
                    onChange={(e) => {
                        setContext(e.nativeEvent.text)
                    }}
                    className={InputStyle}
                >
                    {context}
                </TextInput>
                <Text className="font-bold my-2">Body</Text>
                <TextInput
                    onChange={(e) => {
                        setContent(e.nativeEvent.text)
                    }}
                    multiline={true}
                    numberOfLines={10}
                    className={InputStyle + " h-[200px]"}
                >
                    {content}
                </TextInput>
                {error &&
                    <Button title={"Error"} onPress={() => {
                        setError(false)
                    }}
                        className="bg-red-100"
                    />
                }
                {success && (
                    <Button title={"User Allowed Successfully"} onPress={() => {
                        setSuccess(false)
                    }} />
                )}
            </View>
            <Pressable onPress={sendMail} className="w-[90%] fixed bottom-0 bg-black p-6 m-2 rounded-md">{!isLoading ? <Text className="font-black text-center text-white">SEND</Text> : <SmallLoading />}</Pressable>
        </View>
    )
}

export default Mail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        width: "80%",
    },
});
