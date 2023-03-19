import { chamfer, round } from "./corners"
import { corners } from "../react/interface"

export const rounded = corners(round).size(20)
export const chamfered = corners(chamfer).size(20)
export const semiChamfered = corners(null, chamfer).size(20)
export const demiChamfered = corners(chamfer, null).size(20)
