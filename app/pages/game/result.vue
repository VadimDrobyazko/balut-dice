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
          <th>...</th>
          <th>...</th>
          <th>...</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.result {
  width: 100%;
  background: white;
  padding: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

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