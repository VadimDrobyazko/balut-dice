<script setup lang="ts">
import { useGameStore } from '../../store/store'
const game = useGameStore()
</script>


<template>
  <div class="result">
    <table>
      <thead>
        <tr>
          <th>ALL_USER_WINS</th>
          <th>ALL_USER_BETS</th>
          <th>RTP</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{{ game.totalWins.toFixed(0) }}</th>
          <th>{{ game.totalBets }}</th>
          <th>{{ game.getRTP().toFixed(2) }}%</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.result {
  background: white;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 798px;
  min-height: 513px;

  table {
    border-collapse: collapse;
    width: 100%;

    th, tr {
      border: 1px solid black;
      padding: 20px;
    }
  }

  table thead tr {
    background: grey;
  }
}
</style>