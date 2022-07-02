import { STICKER_GENERATED_ID_LENGTH } from "./conts";

export const makeID = (id: number, year: string) => {
    let zeroFill = new Array(STICKER_GENERATED_ID_LENGTH - 2).fill(0).join("");

    let zeroFilledId = (zeroFill + id.toString()).slice(-zeroFill.length);

    return year.slice(-2) + zeroFilledId;
}

export const extractID = (id: string) => {
    return id.slice((id.length - 2) * -1).replace(/^0+/, '');
}

export const incrementID = (id: string) => {
    let extracted_id = extractID(id);

    return makeID(Number.parseInt(extracted_id) + 1, id.slice(0, 2));
}