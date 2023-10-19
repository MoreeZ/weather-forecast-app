<template>
  <div class="weather-card">
    <div class="img-container">
      <img :src="`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`" />
    </div>
    <h3 class="weekday">{{ getDay(data.dt * 1000) }}</h3>
    <p class="date">{{ getDate(data.dt * 1000) }}</p>
    <span class="temperature">{{ Math.round(data.temp.day) }}°C</span>
    <p class="weather-detail"><b>Wind:</b> {{ data.wind_speed }}km/h</p>
    <p class="weather-detail"><b>Rain:</b> {{ data.rain ? data.rain : 0 }}mm</p>
    <p class="weather-detail"><b>PM2_5:</b> {{ data.pm2_5 ? data.pm2_5 : 0 }}μg/m3</p>
  </div>
</template>

<script>
export default {
  methods: {
    // Takes date in ms and returns a the day of the week.
    getDay(ms) {
      return new Date(ms).toLocaleString('en-us', { weekday: 'long' })
    },
    // Takes date in ms and returns a readable date string dd/mm/yyyy
    getDate(ms) {
      const date = new Date(ms)
      const yyyy = date.getFullYear()
      let mm = date.getMonth() + 1 // Months start at 0!
      let dd = date.getDate()
      if (dd < 10) dd = '0' + dd
      if (mm < 10) mm = '0' + mm
      const formated = dd + '/' + mm + '/' + yyyy
      return formated
    }
  },
  props: ['data'],
  name: 'WeatherCard'
}
</script>

<style scoped>
.weather-card {
  border-radius: 5px;
  border: 2px rgb(187, 187, 187) solid;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.img-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.weekday {
  margin: 0;
}
.date {
  margin: 3px 0px;
  font-size: 11px;
  color: rgb(45, 45, 45);
}
.temperature {
  position: absolute;
  top: 8px;
  right: 12px;
  font-weight: bold;
}
.weather-detail {
  margin: 0px;
  margin-top: 3px;
  font-size: 14px;
  color: rgb(45, 45, 45);
}
</style>
