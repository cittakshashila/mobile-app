import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { Camera } from "expo-camera";
import { useGlobalSearchParams } from "expo-router";
import { useEventStore } from "../../../../../lib/store/events";
import axios from 'axios';
import { API_URL } from "../../../../../lib/constants";

export default function App() {
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [scanned, setScanned] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const params = useGlobalSearchParams()
    const { event, setEvent } = useEventStore()

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        setScanned(true)
        Alert.alert('Register', `Mark ${data} as visited for event ${params.name}`, [
            {
                text: 'Cancel',
                onPress: async () => {
                    setScanned(false)
                },
                style: 'cancel',
            },
            {
                text: 'OK', onPress: async () => {
                    try {
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

                }
            },
        ]);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
});
















































































































































































































































































































































































































































































