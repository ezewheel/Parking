import { IParking } from "./parking"

export interface ISlot {
    id: number,
    description: string,
    parking: IParking | undefined,
    isAvailable: boolean
}