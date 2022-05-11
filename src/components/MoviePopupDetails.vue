<template>
  <v-container class="movie">
    <v-row>
      <v-img v-show="item.poster_path !== null" class="popupImage" position="absolute"
             :src="posterURL" alt="poster" max-height="350" max-width="230"/>
      <v-img v-show="item.poster_path == null" class="popupImage" position="absolute"
             src="../assets/no-image.png" alt="poster" max-height="350" max-width="230"/>
      <v-col>
        <v-card-subtitle class="popupSubtitle">Movie</v-card-subtitle>
        <v-card-title class="popupTitle">{{ item.title }}</v-card-title>
        <v-card-subtitle class="popupDate">{{ item.release_date }}</v-card-subtitle>
        <v-divider/>
        <v-card-text class="popupOverview">{{item.overview}}</v-card-text>
        <average-rating :vote-average="voteAverage"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AverageRating from "@/components/AverageRating";
import {Movie} from "@/models/LibraryItems";

export default {
  name: "MoviePopupDetails",
  components: {AverageRating},
  props: {item: Movie},
  data() {
    return {
      voteAverage: this.item.vote_average,
      posterURL: 'https://image.tmdb.org/t/p/w780'+this.item.poster_path,
    }
  }
}
</script>

<style scoped>

</style>