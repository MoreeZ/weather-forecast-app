<template>
  <h2>Temperature Chart</h2>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { ref } from 'vue'
const dailyWeather = ref([])

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const getDay = (ms) => {
  return new Date(ms).toLocaleString('en-us', { weekday: 'long' })
}

const setChartData = (weatherData) => ({
  labels: weatherData.map((day) => getDay(day.dt * 1000)),
  datasets: [
    {
      label: 'Max Temp (°C)',
      backgroundColor: '#f2c2cb',
      borderColor: '#f2c2cb',
      data: weatherData.map((day) => day.temp.max)
    },
    {
      label: 'Avg Temp (°C)',
      backgroundColor: '#ffca42',
      borderColor: '#ffca42',
      data: weatherData.map((day) => day.temp.day)
    },
    {
      label: 'Min Temp (°C)',
      backgroundColor: '#c2e2f2',
      borderColor: '#c2e2f2',
      data: weatherData.map((day) => day.temp.min)
    }
  ]
})

export default {
  name: 'SummaryChart',
  props: ['dailyWeather'],
  components: { Bar },
  setup(props) {
    dailyWeather.value = props.dailyWeather
  },
  watch: {
    dailyWeather: function (newDailyWeather) {
      this.chartData = setChartData(newDailyWeather)
    }
  },
  data() {
    return {
      chartData: setChartData(dailyWeather.value),
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>
