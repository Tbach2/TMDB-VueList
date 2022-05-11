<template>
  <div>
    <v-col>
      <v-hover v-slot="{ hover }">
<!--    Item Card      -->
        <v-card dark color="grey darken-3" width="230px"
                class="mediaCard mb-3" :elevation="hover ? 24 : 1" :class="{ 'on-hover': hover }">
          <component @showPopup="showPopup = true" :is="typeOfCard" :item="item"/>
          <average-rating :vote-average="voteAverage"/>
        </v-card>
      </v-hover>
<!--  Item Popup    -->
      <v-dialog v-model="showPopup" max-width="600">
        <v-card dark color="grey darken-3">
          <component :is="typeOfPopup" :item="item"/>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark text @click="viewDetails">More Details</v-btn>
            <v-btn dark text @click="showPopup = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>

<script>
import MovieCardDetails from "@/components/MovieCardDetails";
import SeriesCardDetails from "@/components/SeriesCardDetails";
import MoviePopupDetails from "@/components/MoviePopupDetails";
import SeriesPopupDetails from "@/components/SeriesPopupDetails";
import AverageRating from "@/components/AverageRating";

export default {
  name: "LibraryItem",
  components: {
    AverageRating,
    SeriesPopupDetails,
    MoviePopupDetails,
    MovieCardDetails,
    SeriesCardDetails,
  },
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      voteAverage: this.item.vote_average,
      showPopup: false,
    }
  },
  computed: {
    typeOfCard() {
      return this.item.type+'CardDetails';
    },
    typeOfPopup() {
      return this.item.type+'PopupDetails';
    }
  },
  methods: {
    viewDetails() {
      this.$router.push({ name: 'details', params: {
        id: this.item.id,
        media_type: this.item.media_type,
        vote_average: this.item.vote_average,
      }}).catch(error => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
            error.name !== 'NavigationDuplicated' &&
            !error.message.includes('Avoided redundant navigation to current location')
        ) {console.log(error);}
      })
    },
  },
}
</script>

<style scoped>
</style>
