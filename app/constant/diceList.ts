import {diceRollEnum} from "../enums/diceRollEnum";
import type {Comb} from "../types/Comb";

export const diceList: Record<diceRollEnum, Comb> = {
  [diceRollEnum.PAIR]: 'Pair',
  [diceRollEnum.TRIPLE]: 'Triple',
  [diceRollEnum.FULL_HOUSE]: 'Full House',
  [diceRollEnum.BAULT]: 'Balut',
  [diceRollEnum.STRAIGHT]: 'Straight',
  [diceRollEnum.OTHER]: 'Other',
}
