import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { USER_TYPE } from "../../../../../lib/types";
import { useEffect, useState } from "react";
import { Loading } from "../../../../../lib/components";
import { setString } from 'expo-clipboard';
import axios from 'axios';
import { API_URL } from '../../../../../lib/constants';
import { useEventStore } from '../../../../../lib/store/events';
import { useGlobalSearchParams } from 'expo-router';

const List = () => {
    const [data, setData] = useState<Array<USER_TYPE> | null>(null);
    const { event } = useEventStore()
    const params = useGlobalSearchParams()

    const copyToClipboard = (text: string) => {
        setString(text);
        Alert.alert('Copied to Clipboard', text);
    };

    const truncate = (text: string, limit: number) => text.length > limit ? `${text.substring(0, limit)}...` : text;
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`${API_URL}/admin/get-users/${params.name}`, {
                headers: {
                    Authorization: `Bearer ${event?.token}`
                }
            })
            setData(data.body.data)
        }
        fetchData()
    }, [])
    if (!data) return <Loading />
    if (data.length === 0) return <View className="w-full h-full flex flex-col items-center justify-center"><Text className="text-[30px] text-center">No data found</Text></View>
    return (
        <ScrollView>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#f0f0f0', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                    <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Name</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Phone</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Email</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>College</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Attended</Text>
                </View>
                {data.map((user, user_idx) => (
                    <View key={user_idx} style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => copyToClipboard(user.name)}>
                            <Text style={{ textAlign: 'center' }}>{truncate(user.name, 10)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => copyToClipboard(user.phone_no)}>
                            <Text style={{ textAlign: 'center' }}>{truncate(user.phone_no, 6)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => copyToClipboard(user.email)}>
                            <Text style={{ textAlign: 'center' }}>{truncate(user.email, 6)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => copyToClipboard(user.clg_name)}>
                            <Text style={{ textAlign: 'center' }}>{truncate(user.clg_name, 6)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => copyToClipboard(user.is_present ? "true" : "false")}>
                            <Text style={{ textAlign: 'center' }}>{truncate(user.is_present ? "true" : "false", 6)}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>);
}

export default List;
