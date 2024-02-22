import { Tabs } from "expo-router"
import { AntDesign } from '@expo/vector-icons';

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

export default () => {
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
                tabBarLabel: "Edit"
            }} />
            <Tabs.Screen name="scan/index" options={{
                tabBarIcon: ScanIcon,
                tabBarLabel: "Scan"
            }} />
            <Tabs.Screen name="list/index" options={{
                tabBarIcon: ListIcon,
                tabBarLabel: "List"
            }} />
        </Tabs>
    )
}
