import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { FOLDER_INFO_URL } from '../../../lib/constants';

export async function GET(_: ExpoRequest): Promise<ExpoResponse> {
    const json = await fetch(FOLDER_INFO_URL).then(res => res.json());
    return ExpoResponse.json(json);
}
