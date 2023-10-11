<template>
  <div id="app">
    <div class="app-wrapper">
      <h1 class="title">Awesomest Weather App</h1>
      <!-- Location and dates input form -->
      <div class="city-input-wrapper">
        <CityInput
          @setWeatherData="dailyWeather = $event"
          @setActiveCity="activeCity = $event"
          @setPollutionData="dailyPollution = $event"
        ></CityInput>
      </div>
      <div class="result-container" v-if="dailyWeather.length > 0">
        <h2 v-if="this.activeCity.length > 0">Results for "{{ this.activeCity }}"</h2>
        <!-- Weather data display -->
        <p class="forecast-message">Forecast for the next five days, starting tomorrow:</p>
        <div class="weather-display-container">
          <WeatherCard
            v-for="(day, index) in dailyWeather"
            :key="index"
            :data="
              Object.assign(day, {
                pm2_5: dailyPollution.length > 0 ? dailyPollution[index].components.pm2_5 : null
              })
            "
          />
        </div>
        <!-- Written summary of weather information -->
        <WeatherSummary
          v-if="dailyWeather.length > 0"
          :dailyWeather="dailyWeather"
          :dailyPollution="dailyPollution"
        />
        <!-- A weather chart created with chart.js -->
        <SummaryChart v-if="dailyWeather.length > 0" :dailyWeather="dailyWeather"></SummaryChart>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import WeatherCard from './components/WeatherCard.vue'
import CityInput from './components/CityInput.vue'
import SummaryChart from './components/SummaryChart.vue'
import WeatherSummary from './components/WeatherSummary.vue'

export default {
  name: 'app',
  setup() {
    const dailyWeather = ref([])
    const dailyPollution = ref([])
    const activeCity = ref('')
    return {
      dailyWeather,
      dailyPollution,
      activeCity
    }
  },
  components: { WeatherCard, CityInput, SummaryChart, WeatherSummary }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Just+Me+Again+Down+Here&family=Open+Sans:wght@300;400;500;600;700&display=swap');
* {
  font-family: 'Open Sans';
}

#app {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

body {
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
  margin: 0;
  padding: 0;
}
.app-wrapper {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 800px;
  padding: 30px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border: rgb(228, 228, 228) 1px solid;
  border-radius: 20px;

  .result-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      color: rgb(18, 18, 18);
      margin: 10px;
    }

    .weather-display-container {
      display: grid;
      padding: 30px;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      gap: 10px;
      width: 100%;
    }

    .forecast-message {
      color: rgb(34, 34, 34);
      margin: 0;
    }

    .forecast-summary {
      display: flex;
      flex-direction: column;
      width: 100%;

      h2 {
        margin: 0px;
      }
    }
  }
}
</style>
