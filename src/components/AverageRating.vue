<template>
  <v-container>
    <v-rating v-model="rating" dense half-increments hover
              empty-icon="$ratingFull" background-color="grey" color="yellow darken-2"/>
  </v-container>
</template>

<script>
export default {
  name: "AverageRating",
  props: ['voteAverage'],
  data() {
    return {
      rating: this.voteAverage/2,
    }
  }
}
</script>

<style scoped>

</style>