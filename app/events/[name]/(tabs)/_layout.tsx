import { Tabs, useGlobalSearchParams } from "expo-router"
import { AntDesign } from '@expo/vector-icons';
import { useEventStore } from '../../../../lib/store/events'

const EditIcon = () => {
    return (<AntDesign name="edit" size={24} color="black" />)
}

const ScanIcon = () => {
    return (<AntDesign name="scan1" size={24} color="black" />)
}

const ListIcon = () => {
    return (<AntDesign name="bars" size={24} color="black" />)
}

const HomeIcon = () => {
    return (<AntDesign name="home" size={24} color="black" />)
}

const MailIcon = () => {
    return (<AntDesign name="mail" size={24} color="black" />)
}

export default () => {
    const params = useGlobalSearchParams()
    const { event } = useEventStore()
    return (
        <Tabs screenOptions={{
            headerShown: false,
        }}>
            <Tabs.Screen name="index" options={{
                tabBarIcon: HomeIcon,
                tabBarLabel: "Event"
            }} />
            <Tabs.Screen name="edit/index" options={{
                tabBarIcon: EditIcon,
                tabBarItemStyle: { display: event?.isAdmin ? "flex" : "none" },
                tabBarLabel: "Edit",
            }} />
            <Tabs.Screen name="scan/index" options={{
                tabBarIcon: ScanIcon,
                tabBarLabel: "Scan"
            }} />
            <Tabs.Screen name="emergency/index" options={{
                tabBarIcon: MailIcon,
                tabBarItemStyle: { display: event?.isAdmin ? "flex" : "none" },
                tabBarLabel: "Mail"
            }} />
            <Tabs.Screen name="list/index" options={{
                tabBarIcon: ListIcon,
                tabBarLabel: "List"
            }} />
        </Tabs>
    )
}
