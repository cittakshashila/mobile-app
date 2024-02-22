type CONTACT = {
    incharge: string,
    email: string,
    phno: string,
}

type DETAIL = {
    type: "NON-TECHNICAL" | "TECHNICAL",
    date: string,
    time: [number, number],
}

export type EVENT = {
    title: string,
    description: string,
    rules: Array<string>,
    details: DETAIL,
    prizes: Array<string>,
    contacts: Array<CONTACT>,
    registration: Array<string>,
    guidelines: Array<string>
}
