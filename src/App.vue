<template>
  <div class="main">
    <Modal
      v-if="modalOpen"
      v-on:close-modal="toggleModal"
      v-bind:APIKEY="APIKEY"
    />
    <Navigation
      v-on:add-city="toggleModal"
      v-on:edit-city="toggleEdit"
      v-bind:addCityActive="addCityActive"
      :isDay="isDay"
      :isNight="isNight"

    />
    <router-view
      v-bind:cities="cities"
      v-bind:edit="edit"
      v-bind:APIKEY="APIKEY"
      v-on:is-day="dayTime"
      v-on:is-night="nightTime"
      v-on:resetDays="resetDays"
    />
  </div>
</template>

<script>
import axios from "axios";
import db from "./firebase/firebase";
import Navigation from "./components/Navigation.vue";
import Modal from "./components/Modal.vue";

export default {
  name: "App",
  components: {
    Navigation,
    Modal,
  },
  data() {
    return {
      APIKEY: "613e681981238320aeb717754f08b48c",
      cities: [],
      modalOpen: null,
      edit: null,
      addCityActive: null,
      isDay: null,
      isNight: null,
    };
  },
  created() {
    this.getCityWeather();
    this.checkRoute();
  },
  methods: {
    getCityWeather() {
      let firebaseDB = db.collection("cities");

      firebaseDB.onSnapshot((snap) => {
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === "added" && !doc.doc.Nd) {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  doc.doc.data().city
                }&appid=${this.APIKEY}`
              );

              const data = response.data;

              firebaseDB
                .doc(doc.doc.id)
                .update({
                  currentWeather: data,
                })
                .then(() => {
                  this.cities.push(doc.doc.data());
                });
            } catch (err) {
              console.log(err);
            }
          } else if (doc.type === "added" && doc.doc.Nd) {
            this.cities.push(doc.doc.data());
          } else if (doc.type === "removed") {
            this.cities = this.cities.filter(
              (city) => city.city !== doc.doc.data().city
            );
          }
        });
      });
    },

    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },

    toggleEdit() {
      this.edit = !this.edit;
    },
    checkRoute() {
      if (this.$route.name === "AddCity") {
        this.addCityActive = true;
      } else {
        this.addCityActive = false;
      }
    },
    dayTime() {
     this.isDay = !this.isDay;
    },
    nightTime() {
     this.isNight = !this.isNight;
    },
    resetDays() {
      this.isNight = false;
      this.isDay = false;
    }

  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", san-serif;
}


.day {
  transition: 500ms ease all;
  background-color: rgb(59, 150, 249);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

}
.night {
  transition: 500ms ease all;
  background-color: rgb(20, 42, 95);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

}

.main {
  height: 100vh;

  .container {
    padding: 0 20px;
  }
}
</style>
