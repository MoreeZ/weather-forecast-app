<template>
  <div v-if="dailyWeather.length > 0" class="forecast-summary">
    <h2>Forecast Summary</h2>
    <ul>
      <!-- If it rains mention to grab an umbrella -->
      <li>
        <p v-if="shouldBringUmbrella(dailyWeather)">
          You <b>should</b> bring an umbrella.
        </p>
        <p v-else>There is <b>no need</b> to bring an umbrella.</p>
      </li>
      <!-- Render 5-day average temperature -->
      <li>
        Average Temperature: {{ Math.round(averageTemp) }}°C. Pack for
        <b v-if="Math.round(averageTemp) < 13">Cold</b>
        <b v-else-if="Math.round(averageTemp) > 23">Warm</b>
        <b v-else>Mild</b>
        Weather
      </li>
      <!-- If temperatur > 23, mention to pack light clothes -->
      <li v-if="getDaysWithTempAbove23(dailyWeather).length > 0">
        <p>
          Bring <b>light</b> clothes for:
          {{ getDaysWithTempAbove23(dailyWeather) }}
        </p>
      </li>
      <!-- If temperatur <= 23 && >= 12, mention to pack mild clothes -->
      <li v-if="getDaysWithMildTemp(dailyWeather).length > 0">
        <p>
          Bring <b>mild</b> clothes for: {{ getDaysWithMildTemp(dailyWeather) }}
        </p>
      </li>
      <!-- If temperatur < 13, mention to pack warm clothes -->
      <li v-if="getDaysWithTempBelow13(dailyWeather).length > 0">
        <p>
          Bring <b>warm</b> clothes for:
          {{ getDaysWithTempBelow13(dailyWeather) }}
        </p>
      </li>
      <!-- If PM2_5 is above 10 mention to bring a mask -->
      <li>
        <p v-if="getShouldWearMask(dailyPollution)">
          You <b>should</b> bring a mask. PM2_5 is above 10.
        </p>
        <p v-else>You <b>don't have to</b> bring a mask. PM2_5 is below 10.</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "WeatherSummary",
  props: ["dailyWeather", "dailyPollution"],
  setup() {
    const averageTemp = ref(0);
    return {
      averageTemp,
    };
  },
  updated() {
    this.averageTemp = this.getAverageTemp(this.dailyWeather);
  },
  methods: {
    // check dailyWeather and return true if it will rain in the next 5 days.
    shouldBringUmbrella(dailyWeather) {
      return dailyWeather.find((day) => day.rain) ? true : false;
    },
    // check dailyWeather and return the average temperature.
    getAverageTemp(dailyWeather) {
      const sum = dailyWeather.reduce((a, b) => {
        if (b.temp.day) return a + b.temp.day;
        else return a;
      }, 0);
      return sum / dailyWeather.length;
    },
    // Takes in date in ms and returns the day of the week.
    getDay(ms) {
      return new Date(ms).toLocaleString("en-us", { weekday: "long" });
    },
    // check dailyWeather and return days where temperature is over 23
    getDaysWithTempAbove23(dailyWeather) {
      return dailyWeather
        .filter((day) => day.temp.day > 23)
        .map((day) => this.getDay(day.dt * 1000))
        .join(", ");
    },
    // check dailyWeather and return days where temperature is between 13 and 23
    getDaysWithTempBelow13(dailyWeather) {
      return dailyWeather
        .filter((day) => day.temp.day < 13)
        .map((day) => this.getDay(day.dt * 1000))
        .join(", ");
    },
    // check dailyWeather and return days where temperature is below 13
    getDaysWithMildTemp(dailyWeather) {
      return dailyWeather
        .filter((day) => day.temp.day >= 13 && day.temp.day <= 23)
        .map((day) => this.getDay(day.dt * 1000))
        .join(", ");
    },
    // checks dailyPollution data and return true if pm2_5 is above 10 otherwise false
    getShouldWearMask(dailyPollution) {
      return dailyPollution.find((day) => day.components.pm2_5 >= 10)
        ? true
        : false;
    },
  },
};
</script>
