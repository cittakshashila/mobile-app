import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { FOLDER_URL } from "../../lib/constants";
import { FOLDER_TYPE } from "../../lib/types";

const Event = () => {
    const [data, setData] = useState<Array<FOLDER_TYPE> | null>(null);
    useEffect(() => {
        const GET = async () => {
            const res = await fetch(FOLDER_URL);
            const data = await res.json();
            setData(data.payload.tree.items);
        }
        GET();
    }, [])
    return (
        <View>
            {
                data ?
                    (<View>
                        {data.map((event, event_idx) => {
                            return (
                                <Text key={event_idx} className="underline">
                                    <Link href={`/events/${event.name}`} >{event.name}</Link>
                                </Text>
                            )
                        }
                        )}
                    </View>) :
                    (<View><Text>Loading...</Text></View>)
            }
        </View>
    )
}

export default Event;
