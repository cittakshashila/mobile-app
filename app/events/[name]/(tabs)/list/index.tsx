import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { USER_TYPE } from "../../../../../lib/types";
import { useEffect, useState } from "react";
import { Loading } from "../../../../../lib/components";
import { setString } from 'expo-clipboard';

const List = () => {
    const [data, setData] = useState<Array<USER_TYPE> | null>(null);
    const copyToClipboard = (text: string) => {
        setString(text);
        Alert.alert('Copied to Clipboard', text);
    };

    const truncate = (text: string, limit: number) => text.length > limit ? `${text.substring(0, limit)}...` : text;
    useEffect(() => {
        setData([{
            name: "Naveen",
            phone_no: "1234567890",
            email: "naveen@gmail.com",
            clg_name: "CITC"
        }, {
            name: "Rahul",
            phone_no: "1234567890",
            email: "rahul@gmail.com",
            clg_name: "CITC"
        }])
    }, [])
    if (!data) return <Loading />
    return (
        <ScrollView>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#f0f0f0' }}>
                    <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Name</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Phone</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Email</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>College</Text>
                </View>
                {data.map((user, user_idx) => (
                    <View key={user_idx} style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => copyToClipboard(user.name)}>
                            <Text style={{ textAlign: 'center' }}>{truncate(user.name, 10)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => copyToClipboard(user.phone_no)}>
                            <Text style={{ textAlign: 'center' }}>{truncate(user.phone_no, 10)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => copyToClipboard(user.email)}>
                            <Text style={{ textAlign: 'center' }}>{truncate(user.email, 6)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => copyToClipboard(user.clg_name)}>
                            <Text style={{ textAlign: 'center' }}>{truncate(user.clg_name, 6)}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>);
}

export default List;
