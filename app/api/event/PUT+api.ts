import { ExpoRequest, ExpoResponse } from "expo-router/server";
import { call } from "../../_layout";
import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../../../lib/constants";
import { useEventStore } from "../../../lib/store";

export async function PUT(req: ExpoRequest): Promise<ExpoResponse> {
    const { event_name, event_data, type, token } = await req.json();

    try {
        jwt.verify(token, TOKEN_SECRET, (err: any) => {
            if (err)
              return ExpoResponse
                .json({ statusCode: 403, body: { message: "Forbidden" } });
        });
    } catch (e) {
        return ExpoResponse.json(e);
    }

    try {
        const data = await call.event(event_name, event_data, type);
        return ExpoResponse.json(data);
    } catch (e) {
        return ExpoResponse.json(e);
    }
}
