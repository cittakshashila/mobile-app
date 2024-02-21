import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { FOLDER_URL } from '../lib/constants';

export async function POST(_: ExpoRequest): Promise<ExpoResponse> {
    const json = await fetch(FOLDER_URL).then(res => res.json());
    return ExpoResponse.json(json);
}
