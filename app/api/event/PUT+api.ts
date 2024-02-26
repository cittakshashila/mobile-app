import { ExpoRequest, ExpoResponse } from "expo-router/server";
import { call } from "../../_layout";
import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../../../lib/constants";

export const revalidate = 1;
export async function PUT(req: ExpoRequest): Promise<ExpoResponse> {
    const data = await req.json();
    const { token } = data

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
        const d = await call.event(data.event_name, data.event_data, data.type, { img: data.img, num: data.num });
        return ExpoResponse.json(d);
    } catch (e) {
        return ExpoResponse.json(e);
    }
}
