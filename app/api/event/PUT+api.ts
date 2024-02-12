import { ExpoRequest, ExpoResponse } from "expo-router/server";
import { call } from "../../_layout";

export async function PUT(req: ExpoRequest): Promise<ExpoResponse> {
    const { event_name, event_data, type } = await req.json();
    try {
        const data = await call.event(event_name, event_data, type);
        return ExpoResponse.json(data);
    } catch (e) {
        return ExpoResponse.json(e);
    }
}
