import { Null_Address } from "../../shared/config"

export const isPairExist = (pairAddress) => {
    if(pairAddress === Null_Address) {
        return false
    } else {
        return true
    }
}