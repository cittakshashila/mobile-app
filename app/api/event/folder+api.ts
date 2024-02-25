import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { FOLDER_URL } from '../../../lib/constants';

export const revalidate = 1;
export async function GET(_: ExpoRequest): Promise<ExpoResponse> {
    const json = await fetch(FOLDER_URL).then(res => res.json());
    return ExpoResponse.json(json);
}
