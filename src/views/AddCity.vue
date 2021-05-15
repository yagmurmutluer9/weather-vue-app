<template>
  <div class="grid">

  <div class="city-link" v-for="(city, index) in cities" :key="index">
  <City :city="city" v-bind:edit="edit"/>
  </div>
  </div>
</template>

<script>

import City from '../components/City';

export default {
  name: 'AddCity',
  props: ['cities', 'edit'],
  created() {
    console.log(this.cities)
  },
  components: {
    City
  }
}
</script>

<style lang="scss" scoped>

.grid {
  display: grid;
  padding-top: 80px;
  background-color: #31363dd7;
  min-height: 100vh;
  width: 100%;
  grid-auto-rows: 250px;
  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
