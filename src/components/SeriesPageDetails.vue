<template>
  <div class="seriesPageDetails">
    <v-card-subtitle class="detailsSubtitle">
      <tr>
        <td class="detailsType">Series</td>
        <td class="detailsSubtitleSpacer">•</td>
        <td class="detailsGenres" v-for="genre in item.genres" :key="genre.id">{{ genre.name }}</td>
      </tr>
    </v-card-subtitle>
    <v-card-title class="detailsTitle">{{ item.name }}</v-card-title>
    <v-card-text class="detailsDate">{{ item.first_air_date }} - {{ item.last_air_date }}</v-card-text>
    <v-divider/>
    <v-card-text class="detailsOverview">{{ item.overview }}</v-card-text>
    <v-card-text class="detailsSeasonsAndEpisodes">
      Seasons: {{item.number_of_seasons}} • Episodes: {{item.number_of_episodes}}
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "SeriesPageDetails",
  props: {
    item: {
      required: true,
    }
  }
}
</script>

<style scoped>

</style>