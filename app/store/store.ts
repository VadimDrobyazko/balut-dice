import { defineStore } from 'pinia'
import { diceRollEnum } from '../enums/diceRollEnum';
import { diceList } from "../constant/diceList";

export type RollResult = {
  dice: diceRollEnum[]
  combination: string
  winAmount: number
}

export const useGameStore = defineStore('game', {
  state: () => ({
    balance: 100,
    currentBet: 0,
    totalBets: 0,
    totalWins: 0,
    history: [] as number[],
    lastRoll: null as RollResult | null,
  }),

  actions: {
    roll(bet: number) {
      if (bet <= 0 || bet > this.balance) {
        alert('Invalid bet!')
        return
      }

      this.currentBet = bet
      this.balance -= bet
      this.totalBets += bet

      const dice: diceRollEnum[] = Array.from({ length: 5 }, () => (Math.floor(Math.random() * 6) + 1) as diceRollEnum)

      const combination = this.getCombination(dice)

      const coefficients: Record<string, number> = {
        'Pair': 2,
        'Triple': 2.5,
        'Full House': 3,
        'Balut': 4,
        'Straight': 5,
        'Other': 0
      }

      const winAmount = bet * (coefficients[combination] || 0)
      this.balance += winAmount
      this.totalWins += winAmount
      this.history.push(this.balance)

      this.lastRoll = { dice, combination, winAmount }
    },

    getCombination(dice: diceRollEnum[]): string {
      const counts = new Map<number, number>()
      dice.forEach(d => counts.set(d, (counts.get(d) || 0) + 1))
      const values = Array.from(counts.values()).sort((a, b) => b - a)

      if (values[0] === diceRollEnum.BAULT) return diceList[diceRollEnum.BAULT];
      if (this.isStraight(dice)) return diceList[diceRollEnum.STRAIGHT]
      if (values[0] === diceRollEnum.BAULT && values[1] === diceRollEnum.FULL_HOUSE) return diceList[diceRollEnum.FULL_HOUSE]
      if (values[0] === diceRollEnum.FULL_HOUSE) return diceList[diceRollEnum.TRIPLE]
      if (values[0] === diceRollEnum.PAIR) return diceList[diceRollEnum.PAIR]

      return 'Other'
    },

    isStraight(dice: diceRollEnum[]): boolean {
      const sorted = Array.from(new Set(dice)).sort((a, b) => a - b)
      const straight1 = [1, 2, 3, 4, 5]
      const straight2 = [2, 3, 4, 5, 6]

      return JSON.stringify(sorted) === JSON.stringify(straight1) ||
        JSON.stringify(sorted) === JSON.stringify(straight2)
    },

    getRTP(): number {
      if (this.totalBets === 0) return 0
      return (this.totalWins / this.totalBets) * 100
    },

    resetGame() {
      this.balance = 100
      this.currentBet = 0
      this.totalBets = 0
      this.totalWins = 0
      this.history = []
      this.lastRoll = null
    }
  }
})
