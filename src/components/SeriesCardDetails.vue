<template>
  <!--  Series Card Details  -->
  <div class="series">
    <v-img @click="showPopup" v-show="item.poster_path !== null"
           :src="posterURL" height="330" width="230"/>
    <v-img @click="showPopup" v-show="item.poster_path == null"
           src="../assets/no-image.png" height="330" width="230"/>

    <v-card-subtitle class="cardSubtitle">Series</v-card-subtitle>
    <v-card-title @click="showPopup" class="cardTitle">{{ item.name }}</v-card-title>
    <v-card-text class="cardDate">{{ item.first_air_date }}</v-card-text>
  </div>
</template>

<script>
import {Series} from "@/models/LibraryItems";

export default {
  name: "SeriesCardDetails",
  props: {
    item: Series
  },
  data() {
    return {
      posterURL: 'https://image.tmdb.org/t/p/w780'+this.item.poster_path,
    }
  },
  methods: {
    showPopup() {
      this.$emit('showPopup')
    }
  }
}
</script>

<style scoped>
</style>