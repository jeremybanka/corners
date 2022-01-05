import corners from "."
import { chamfer, round } from "./utils/svg"

export const rounded = corners(round).size(20)
export const chamfered = corners(chamfer).size(20)
export const semiChamfered = corners(null, chamfer).size(20)
export const demiChamfered = corners(chamfer, null).size(20)
