<template>
  <form class="city-input-form" @submit.prevent>
    <p>Plase enter the location and dates to receive a <i>5 day weather forecast</i></p>
    <div class="input-field">
      <label class="input-label" for="city">Location:</label>
      <input
        type="text"
        name="city"
        id="city"
        list="capitals"
        v-model="city"
        placeholder="City name"
      />
      <datalist id="capitals">
        <option v-for="capital in capitals" :key="capital">{{ capital }}</option>
      </datalist>
    </div>
    <button @click="submit">
      <DotLoader v-if="isLoading" /> <span v-else>Check Weather</span>
    </button>
    <p class="error-message" v-if="errorMsg.length > 0">{{ errorMsg }}</p>
  </form>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import DotLoader from './DotLoader.vue'
import capitals from '../data/capitals'

const isLoading = ref(false)
const errorMsg = ref('')
const lastSearchValue = ref('')

const getWeather = async function (cityStr) {
  let result = await axios.get(`/weather/${cityStr}`)
  return result.data.daily
}

const getPollution = async function (cityStr) {
  let result = await axios.get(`/pollution/${cityStr}`)
  return result.data.list
}

const parseCityName = (nameStr) => {
  let wordsArr = nameStr.split(' ')
  for (var i = 0; i < wordsArr.length; i++) {
    wordsArr[i] = wordsArr[i].charAt(0).toUpperCase() + wordsArr[i].slice(1)
  }
  return wordsArr.join(' ')
}

export default {
  name: 'CityInput',
  components: { DotLoader },
  data() {
    return {
      city: '',
      isLoading,
      capitals,
      errorMsg,
      lastSearchValue
    }
  },
  methods: {
    async submit() {
      if (!this.isLoading && this.city !== this.lastSearchValue) {
        this.isLoading = true
        try {
          this.lastSearchValue = this.city
          this.city = parseCityName(this.city)
          const weatherData = await getWeather(this.city)
          this.$emit('setWeatherData', weatherData.slice(1, 6))
          const pollutionData = await getPollution(this.city)
          this.$emit('setPollutionData', pollutionData.slice(1, 6))
          this.$emit('setActivethis.city', this.city)
          this.errorMsg = ''
        } catch (err) {
          console.error(err)
          this.errorMsg =
            'Failed to load information for: "' +
            this.city +
            '".\nPlease ensure that the name you entered is correct.'
        }
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss">
.city-input-form {
  padding: 10px;
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  p {
    text-align: center;
    color: rgb(37, 37, 37);
  }

  .input-field {
    display: flex;
    width: 100%;
    align-items: center;

    label {
      margin-right: 10px;
      vertical-align: middle;
    }
    input {
      flex: 1;
      padding: 7px;
      border-radius: 3px;
    }
  }

  button {
    width: 100%;
    padding: 10px;
    border-radius: 3px;
    background-color: rgb(243, 101, 0);
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      opacity: 0.9;
    }
    &:active {
      opacity: 0.5;
    }
  }
}
</style>
