import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert, TextInput, Pressable } from "react-native";
import { Camera } from "expo-camera";
import { useGlobalSearchParams } from "expo-router";
import { useEventStore } from "../../../../../lib/store/events";
import axios from 'axios';
import { API_URL } from "../../../../../lib/constants";
import { SmallLoading } from "../../../../../lib/components";

export default function App() {
    const InputStyle = "bg-gray-100 py-4 px-2 rounded-md border-2 border-black mb-2";
    const [email, setEmail] = useState<string>("")
    const [active, setActive] = useState<boolean>(true);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [scanned, setScanned] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const params = useGlobalSearchParams()
    const { event } = useEventStore()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => setError(false), 2000)
    }, [error]);

    useEffect(() => {
        setTimeout(() => setSuccess(false), 2000)
    }, [success]);

    const scan = async (data: string) => {
        try {
            console.log(`${API_URL}/admin/allow`)
            await axios.put(`${API_URL}/admin/allow`, {
                event_id: params.name,
                user_email: data
            }, {
                headers: {
                    authorization: `Bearer ${event?.token}`
                }
            })
            setSuccess(true)

        } catch (err) { setError(true) }
        finally { 
            setIsLoading(false)
            setEmail("")
        }
    }

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        setIsLoading(true)
        setScanned(true)
        Alert.alert('Register', `Mark ${data} as visited for event ${params.name}`, [
            {
                text: 'Cancel',
                onPress: async () => {
                    setScanned(false)
                    setIsLoading(false)
                    setEmail("")
                },
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => scan(data)
            },
        ]);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    if (active) return (
        <View className="w-full h-full relative">
            <View style={styles.container}>
                <Camera
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {error && (
                    <Button title={"Error"} onPress={() => {
                        setError(false)
                        setScanned(false)
                    }} />
                )}
                {success && (
                    <Button title={"User Allowed Successfully"} onPress={() => {
                        setSuccess(false)
                        setScanned(false)
                    }} />
                )}
            </View>
            <Pressable onPress={() => setActive(false)} className="fixed bottom-0 w-screen bg-black p-6 my-2 rounded-md"><Text className="text-center text-white">SWITCH TO INPUT</Text></Pressable>
        </View>
    );

    return (
        <View className="w-full h-full relative">
            <View style={styles.container}>
                <TextInput
                    onChange={(e) => {
                        setEmail(e.nativeEvent.text)
                    }}
                    className={InputStyle}
                >
                    {email}
                </TextInput>
                <Pressable onPress={() => handleBarCodeScanned({ data: email })} className="w-screen  bg-black p-6 my-2 rounded-md">{!isLoading ? <Text className="font-black text-center text-white">ALLOW</Text> : <SmallLoading />}</Pressable>
                {error && 
                    <Button title={"Error"} onPress={() => {
                        setError(false)
                        setScanned(false)
                    }} />
                }
                {success && (
                    <Button title={"User Allowed Successfully"} onPress={() => {
                        setSuccess(false)
                        setScanned(false)
                    }} />
                )}
            </View>
            <Pressable onPress={() => setActive(true)} className="fixed bottom-0 w-screen bg-black p-6 my-2 rounded-md"><Text className="text-center text-white">SWITCH TO SCANNER</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
});
