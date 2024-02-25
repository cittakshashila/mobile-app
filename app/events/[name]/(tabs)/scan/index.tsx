import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import { useGlobalSearchParams } from "expo-router";
import { useEventStore } from "../../../../../lib/store"
import axios from 'axios'

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const params = useGlobalSearchParams()
  const {event, setEvent} = useEventStore()

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
        {text: 'OK', onPress: async () => {
            console.log(params.name, data, event.token)
            try {
                const d = await axios.put(`https://backend-five-beryl.vercel.app/admin/allow`, {
                        event_id: params.name,
                        user_email: data
                    }, {
                        headers: {
                            authorization: `Bearer ${event.token}`
                    }
                })

                console.log(d.data)
            } catch (err) { setError(true) }
            
            setScanned(false)
        }},
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
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barCodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {error && (
        <Button title={"Error"} onPress={() => setError(false)} />
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
