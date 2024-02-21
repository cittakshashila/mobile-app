import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { INFO_URL } from '../../../lib/constants';

export async function GET(req: ExpoRequest): Promise<ExpoResponse> {
    const name = req.expoUrl.searchParams.get("name");
    const json = await fetch(INFO_URL(name || "")).then(res => res.json());
    return ExpoResponse.json(json);
}
