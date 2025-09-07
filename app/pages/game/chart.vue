<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useGameStore } from '../../store/store'

const game = useGameStore()

const chartOptions = ref({
  chart: {
    id: 'balance-chart',
    animations: {
      enabled: true,
      easing: 'linear',
      speed: 500
    }
  },
  xaxis: {
    categories: [] as number[]
  },
  yaxis: {
    title: {
      text: 'Balance'
    }
  },
  stroke: {
    curve: 'smooth'
  },
  tooltip: {
    enabled: true
  }
})

const chartSeries = computed(() => [
  {
    name: 'Balance',
    data: game.history.map(val => parseFloat(val.toFixed(2)))
  }
])

onMounted(() => {
  chartOptions.value.xaxis.categories = game.history.map((_, i) => i + 1)
})
</script>

<template>
  <div class="chart">
    <ApexCharts
        type="line"
        height="350"
        :options="chartOptions"
        :series="chartSeries"
    />
  </div>
</template>

<style scoped>
.chart {
  padding: 20px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 798px;
  min-height: 513px;

  .vue-apexcharts {
    width: 100%;
    height: 100%;
  }
}
</style>
