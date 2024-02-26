export type EVENT = {
    id: string,
    title: string,
    description: string,
    rules: Array<string>,
    details: DETAIL,
    prizes: Array<string>,
    contacts: Array<CONTACT>,
    registration: Array<string>,
    guidelines: Array<string>,
    glink?: string,
    day: "DAY1" | "DAY2" | "DAY3";
    category: "WK" | "GEN" | "PRO";
}

type CONTACT = {
    incharge: string;
    phno: string;
};

type DETAIL = {
    type: "WORKSHOP" | "PRO SHOW" | "NON-TECHNICAL" | "TECHNICAL" | "ONLINE EVENT";
    date: string;
    time: [number, number];
};
