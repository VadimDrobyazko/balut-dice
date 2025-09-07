<script setup lang="ts">
import { useGameStore } from './store/store.js'

const game = useGameStore()

onMounted(() => {
  game.initFromLocalStorage()
})

const handleSimulate = () => {
  const rtp = game.simulateRTPWithBaseCoeff(1000000, 1)

  window.alert(`RTP with base coefficients: ${rtp.toFixed(2)}%`)
}
</script>

<template>
  <div class="app">
    <NuxtPage />

    <button @click.prevent="handleSimulate">Simulate</button>
  </div>
</template>

<style>
.app {
  height: 100vh;
  background: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
}

button {
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  background: blue;
  color: white;
  font-size: 15px;
  text-align: center;
  text-decoration: none;
  transition: .3s ease;

  &:hover {
    transform: scale(0.95);
  }

  &.router-link-active {
    background: rebeccapurple;
  }
}
</style>