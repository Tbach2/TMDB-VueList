<template>
  <div class="movie">
    <v-img @click="showPopup" v-show="item.poster_path !== null"
           :src="posterURL" height="330" width="230"/>
    <v-img @click="showPopup" v-show="item.poster_path == null"
           src="../assets/no-image.png"  height="330" width="230"/>
    <v-card-subtitle class="cardSubtitle">Movie</v-card-subtitle>
    <v-card-title @click="showPopup" class="cardTitle">{{ item.title }}</v-card-title>
    <v-card-text class="cardDate">{{ item.release_date }}</v-card-text>
  </div>
</template>
<script>
import {Movie} from "@/models/LibraryItems";

export default {
  name: "MovieCardDetails",
  props: {
    item: Movie
  },
  data() {
    return {
      posterURL: 'https://image.tmdb.org/t/p/w780'+this.item.poster_path,
    }
  },
  methods: {
    showPopup() {
      this.$emit('showPopup')
    },
  }
}
</script>

<style scoped>

</style>