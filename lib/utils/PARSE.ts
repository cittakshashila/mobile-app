export const PARSE = (data: Array<string>): Record<string, any> => {
    const jsonString: string = data.join("").replace(/\s*(\{|\}|\[|\]|,|:)\s*/g, '$1');
    const jsonObject: Record<string, any> = JSON.parse(jsonString);
    return jsonObject;
}
