import { defineStore } from 'pinia'
import type {Comb} from "../types/Comb";

type Probs = Record<Comb, number>;

export type RollResult = {
  dice: number[]
  combination: string
  winAmount: number
}

export const useGameStore = defineStore('game', {
  state: () => ({
    balance: 55000,
    currentBet: 0,
    totalBets: 0,
    totalWins: 0,
    history: [] as number[],
    lastRoll: null as RollResult | null,



    baseCoefficients: {
      'Pair': 2,
      'Triple': 2.5,
      'Full House': 3,
      'Balut': 4,
      'Straight': 5,
      'Other': 0
    } as Record<Comb, number>,

    probs: {
      'Pair': 0.35,
      'Triple': 0.25,
      'Full House': 0.15,
      'Balut': 0.05,
      'Straight': 0.10,
      'Other': 0.10
    } as Probs
  }),
  getters: {
    adjustedCoefficients(state) {
      const expectedRTP = (Object.keys(state.baseCoefficients) as Comb[])
        .reduce((sum, k) => sum + state.baseCoefficients[k] * state.probs[k], 0);

      const factor = 0.95 / expectedRTP;

      const result: Record<Comb, number> = {} as Record<Comb, number>;
      (Object.keys(state.baseCoefficients) as Comb[]).forEach(k => {
        result[k] = state.baseCoefficients[k] * factor;
      });

      return result;
    }
  },
  actions: {
    initFromLocalStorage() {
      const saved = localStorage.getItem('gameState')
      if (saved) {
        const parsed = JSON.parse(saved)
        this.balance = parsed.balance ?? this.balance
        this.totalBets = parsed.totalBets ?? this.totalBets
        this.totalWins = parsed.totalWins ?? this.totalWins
        this.history = parsed.history ?? this.history
      }
    },

    saveToLocalStorage() {
      localStorage.setItem('gameState', JSON.stringify({
        balance: this.balance,
        totalBets: this.totalBets,
        totalWins: this.totalWins,
        history: this.history
      }))
    },

    roll(bet: number) {
      if (bet <= 0 || bet > this.balance) return

      this.currentBet = bet
      this.balance -= bet
      this.totalBets += bet

      const dice: number[] = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * 6) + 1
      )
      const combination = this.getCombination(dice)

      const coef = this.adjustedCoefficients[combination as Comb] || 0
      const winAmount = bet * coef

      this.balance += winAmount
      this.totalWins += winAmount
      this.history.push(this.balance)
      this.lastRoll = { dice, combination, winAmount }

      this.saveToLocalStorage()
    },

    getCombination(dice: number[]): string {
      const counts = new Map<number, number>();
      dice.forEach(d => counts.set(d, (counts.get(d) || 0) + 1));

      const freq = Array.from(counts.values()).sort((a, b) => b - a);
      const unique = Array.from(counts.keys()).sort((a, b) => a - b);

      const isStraight = JSON.stringify(unique) === JSON.stringify([1,2,3,4,5]) ||
        JSON.stringify(unique) === JSON.stringify([2,3,4,5,6]);

      if (freq[0] === 5) return 'Balut';
      if (freq[0] === 4) return 'Full House';
      if (freq[0] === 3 && freq[1] === 2) return 'Full House';
      if (freq[0] === 3) return 'Triple';
      if (freq[0] === 2) return 'Pair';
      if (isStraight) return 'Straight';
      return 'Other';
    },

    getRTP(): number {
      if (this.totalBets === 0) return 0;
      return (this.totalWins / this.totalBets) * 100;
    },

    simulateRTPWithBaseCoeff(trials: number = 1000000, bet: number = 15) {
      let totalBets = 0;
      let totalWins = 0;

      for (let i = 0; i < trials; i++) {
        const dice: number[] = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
        const combination = this.getCombination(dice) as Comb;
        const coef = this.baseCoefficients[combination] || 0;

        totalBets += bet;
        totalWins += bet * coef;
      }

      const rtp = (totalWins / totalBets) * 100;
      return rtp;
    }
  }
});
