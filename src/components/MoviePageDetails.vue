<template>
  <div class="moviePageDetails">
    <v-card-subtitle class="detailsSubtitle">
      <tr>
        <td class="detailsType">Movie</td>
        <td class="detailsSubtitleSpacer">•</td>
        <td class="detailsGenres" v-for="genre in item.genres" :key="genre.id">{{ genre.name }}</td></tr>
    </v-card-subtitle>
    <v-card-title class="detailsTitle">{{ item.title }}</v-card-title>
    <v-card-subtitle class="detailsDate">{{ item.release_date }}</v-card-subtitle>
    <v-divider/>
    <v-card-text class="detailsOverview">{{item.overview}}</v-card-text>
    <v-card-text class="detailsSeasonsAndEpisodes">Runtime: {{item.runtime}}</v-card-text>
  </div>
</template>

<script>
export default {
  name: "MoviePageDetails",
  props: {
    item: {
      required: true,
    }
  },
}
</script>

<style scoped>
</style>