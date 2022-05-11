<template>
  <!--  Series Popup Details  -->
  <v-container class="series">
    <v-row>
      <v-img v-show="item.poster_path !== null" class="popupImage" position="absolute"
             :src="posterURL" alt="poster" max-height="350" max-width="230"/>
      <v-img v-show="item.poster_path == null" class="popupImage" position="absolute"
             src="../assets/no-image.png" alt="poster" max-height="350" max-width="230"/>
      <v-col>
        <v-card-subtitle class="popupSubtitle">Series</v-card-subtitle>
        <v-card-title class="popupTitle">{{ item.name }}</v-card-title>
        <v-card-subtitle class="popupDate">{{ item.first_air_date }}</v-card-subtitle>
        <v-divider/>
        <v-card-text class="popupOverview">{{item.overview}}</v-card-text>
        <average-rating :vote-average="voteAverage"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AverageRating from "@/components/AverageRating";
import {Series} from "@/models/LibraryItems";

export default {
  name: "SeriesPopupDetails",
  components: {AverageRating},
  props: {
    item: Series
  },
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