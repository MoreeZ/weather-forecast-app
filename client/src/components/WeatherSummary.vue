<template>
  <div v-if="dailyWeather.length > 0" class="forecast-summary">
    <h2>Forecast Summary</h2>
    <ul>
      <li>
        <p v-if="shouldBringUmbrella(dailyWeather)">You <b>should</b> bring an umbrella.</p>
        <p v-else>There is <b>no need</b> to bring an umbrella.</p>
      </li>
      <li>
        Average Temperature: {{ Math.round(averageTemp) }}°C. Pack for
        <b v-if="Math.round(averageTemp) < 13">Cold</b>
        <b v-else-if="Math.round(averageTemp) > 23">Warm</b>
        <b v-else>Mild</b>
        Weather
      </li>
      <li v-if="getDaysWithTempAbove23(dailyWeather).length > 0">
        <p>Bring <b>light</b> clothes for: {{ getDaysWithTempAbove23(dailyWeather) }}</p>
      </li>
      <li v-if="getDaysWithMildTemp(dailyWeather).length > 0">
        <p>Bring <b>mild</b> clothes for: {{ getDaysWithMildTemp(dailyWeather) }}</p>
      </li>
      <li v-if="getDaysWithTempBelow13(dailyWeather).length > 0">
        <p>Bring <b>warm</b> clothes for: {{ getDaysWithTempBelow13(dailyWeather) }}</p>
      </li>
      <li v-if="getShouldWearMask(dailyPollution)">
        <p>You <b>should</b> bring a mask. PM2_5 is above 10.</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'WeatherSummary',
  props: ['dailyWeather', 'dailyPollution'],
  setup() {
    const averageTemp = ref(0)
    return {
      averageTemp
    }
  },
  updated() {
    this.averageTemp = this.getAverageTemp(this.dailyWeather)
  },
  methods: {
    shouldBringUmbrella(dailyWeather) {
      return dailyWeather.find((day) => day.rain) ? true : false
    },
    getAverageTemp(dailyWeather) {
      const sum = dailyWeather.reduce((a, b) => {
        if (b.temp.day) return a + b.temp.day
        else return a
      }, 0)
      return sum / dailyWeather.length
    },
    getDay(ms) {
      return new Date(ms).toLocaleString('en-us', { weekday: 'long' })
    },
    getDaysWithTempAbove23(dailyWeather) {
      return dailyWeather
        .filter((day) => day.temp.day > 23)
        .map((day) => this.getDay(day.dt * 1000))
        .join(', ')
    },
    getDaysWithTempBelow13(dailyWeather) {
      return dailyWeather
        .filter((day) => day.temp.day < 13)
        .map((day) => this.getDay(day.dt * 1000))
        .join(', ')
    },
    getDaysWithMildTemp(dailyWeather) {
      return dailyWeather
        .filter((day) => day.temp.day >= 13 && day.temp.day <= 23)
        .map((day) => this.getDay(day.dt * 1000))
        .join(', ')
    },
    getShouldWearMask(dailyPollution) {
      return dailyPollution.find((day) => day.components.pm2_5 >= 10) ? true : false
    }
  }
}
</script>
