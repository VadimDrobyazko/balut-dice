<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '../store/store'

const game = useGameStore()
const bet = ref(15)
const isRolling = ref(false)

const handleRoll = () => {
  if (isRolling.value) return
  isRolling.value = true

  setTimeout(() => {
    game.roll(bet.value)
    isRolling.value = false
  }, 1000)
}
</script>

<template>
  <div class="layout">
    <div class="sidebar">
      <div class="dice box">
        <h2>Dice</h2>
        <ul>
          <li
              v-for="(elem, i) in (game.lastRoll?.dice || [2, 2, 2, 2, 2])"
              :key="i"
              :class="{ 'cube-roll': isRolling }"
          >
            {{ isRolling ? '' : elem }}
          </li>
        </ul>
      </div>

      <div class="price box">
        <h2>Prices</h2>
        <ul class="list">
          <li
              v-for="(coef, name) in game.baseCoefficients"
              :key="name"
          >
            <span>{{ name }}</span>
            <span>x{{ coef.toFixed(2) }}</span>
          </li>
        </ul>
      </div>

      <div class="bet box">
        <h2>Bet</h2>
        <form @submit.prevent="handleRoll">
          <input
              type="number"
              inputmode="numeric"
              min="1"
              required
              v-model.number="bet"
          />
          <button type="submit"> {{ isRolling ? 'Rolling...' : 'ROLL' }}</button>
        </form>
      </div>

      <div class="balance box">
        <h2>Your Balance</h2>
        <span>{{ game.balance.toFixed(2) }}</span>
      </div>
    </div>

    <main class="main">
      <nav class="nav">
        <NuxtLink to="/game/chart" class="link">Chart</NuxtLink>
        <NuxtLink to="/game/result" class="link">Result</NuxtLink>
      </nav>

      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 50%;
  width: 80%;
  gap: 40px;
  background: grey;
}

.layout-content {
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 40px;
}

.sidebar {
  background: white;
  padding: 20px;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.main {
  flex: 1;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.dice {
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;

    li {
      position: relative;
      min-width: 40px;
      min-height: 40px;
      border-radius: 5px;
      border: 1px solid black;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.box {
  padding: 10px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  flex-direction: column;
  width: 100%;


  h2 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
  }
}

.price {
  .list {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 5px;
    width: 100%;

    li {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
    }
  }
}

@keyframes rollAnimation {
  0%   { transform: rotateX(0deg) rotateY(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

.cube-roll {
  animation: rollAnimation 0.5s linear infinite;
}

.bet {
  form {
    display: flex;
    align-items: stretch;
    gap: 10px;
    justify-content: center;

    input {
      outline: none;
      border: 1px solid black;
      border-radius: 5px;
      box-shadow: inset 0px 0px 16px -11px #000000;
      width: 80px;
    }

    button {
      outline: none;
      border: 1px solid black;
      border-radius: 5px;
      text-align: center;
      padding: 10px 20px;
      cursor: pointer;
      transition: transform .3s ease;
      color: white;
      background: linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%);

      &:hover {
        transform: scale(0.95);
      }
    }
  }
}

.link {
  padding: 10px 20px;
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
<script
    setup
    lang="ts"
>
</script>