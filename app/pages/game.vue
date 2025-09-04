<template>
  <div class="layout">
    <div class="sidebar">
      <div class="dice box">
        <h2>Dice</h2>
        <ul>
          <li>?</li>
          <li>?</li>
          <li>?</li>
          <li>?</li>
          <li>?</li>
        </ul>
      </div>

      <div class="price box">
        <h2>Prices</h2>
        <ul class="list">
          <li><span>Pair</span><span>x2</span></li>
          <li><span>Triple</span><span>x2.5</span></li>
          <li><span>Full House</span><span>x3</span></li>
          <li><span>Balut</span><span>x4</span></li>
          <li><span>Straight</span><span>x5</span></li>
          <li><span>Other</span><span>x0</span></li>
        </ul>
      </div>

      <div class="bet box">
        <h2>Bet</h2>
        <form>
          <input type="number" inputmode="numeric" min="1" required value="15" />
          <button>ROLL</button>
        </form>
      </div>

      <div class="balance box">
        <h2>Your Balance</h2>
        <span></span>
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