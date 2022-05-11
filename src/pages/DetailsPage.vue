<template>
  <div>
<!--    backdrop image/placeholder    -->
    <header class="detailsBackdrop" v-show="item.backdrop_path !== null"
            :style="{ 'background-image': 'url(' + backdropURL + ')' }"/>
    <header class="detailsNoBackdrop" v-show="item.backdrop_path == null"/>
<!--    poster image/placeholder      -->
    <v-img class="detailsPoster" v-show="item.poster_path !== null" :src="posterURL" height="330" width="230"/>
    <v-img class="detailsPoster" v-show="item.poster_path == null" src="../assets/no-image.png"  height="330" width="230"/>
<!--    rating     -->
      <average-rating class="detailsRating" :vote-average="voteAverage"/>
      <v-card class="detailsCard" dark color="grey darken-3">
<!--      movie/series info     -->
        <component :is="pageType" :item="item"/>
      </v-card>
<!--        similar results list      -->
    <v-container class="similarMedia">
      <h3 class=" similarLabel white--text">Similar {{this.itemType}}</h3>
      <v-divider class="similarDivider"/>
      <library-list class="SimilarResultsList" :library="similarCollection"></library-list>
    </v-container>

  </div>
</template>

<script>
import LibraryList from "@/components/LibraryList";
import AverageRating from "@/components/AverageRating";
import MoviePageDetails from "@/components/MoviePageDetails";
import SeriesPageDetails from "@/components/SeriesPageDetails";
import NavigationBar from "@/components/NavigationBar";
import LibraryCollection from "@/models/LibraryCollection";
import {Movie, Series} from "@/models/LibraryItems";
const axios = require('axios').default;

export default {
  name: "DetailsPage",
  components: {LibraryList, SeriesPageDetails, NavigationBar, MoviePageDetails, AverageRating},
  data() {
    return{
      item: {},
      itemType: '',
      pageType: '',
      posterURL: '',
      backdropURL: '',
      voteAverage: this.vote_average,
      similarCollection: new LibraryCollection(),
    }
  },
  props: ['id', 'media_type', 'vote_average'],
  beforeMount() {
    let url;
    let config = {
      params: {
        api_key: process.env.VUE_APP_TMDB_API_KEY,
      },
      responseType: 'json',
    }
    // sets page type
    if (this.media_type === 'movie') {
      this.pageType = 'MoviePageDetails';
      this.itemType = 'Movies';
      url = 'https://api.themoviedb.org/3/movie/'+this.id;
    }
    else if (this.media_type === 'tv') {
      this.pageType = 'SeriesPageDetails';
      this.itemType = 'Series'
      url = 'https://api.themoviedb.org/3/tv/'+this.id;
    }
    axios.get(url, config)
        .then(response => {
          console.clear();
          console.log('api response - '+this.media_type, response);
          this.item = response.data;
        })
        .catch(error => {
          console.error('AJAX SEARCH ERROR:', error);
        })
        .finally(() => {
          this.posterURL = 'https://image.tmdb.org/t/p/w185'+this.item.poster_path;
          this.backdropURL = 'https://image.tmdb.org/t/p/w1280'+this.item.backdrop_path;
          this.getSimilar();
        })

  },
  methods: {
    getSimilar() {
      let url;
      let config = {
        params: {
          api_key: process.env.VUE_APP_TMDB_API_KEY,
        },
        responseType: 'json',
      }
      if (this.media_type === 'movie') {url = 'https://api.themoviedb.org/3/movie/'+this.id+'/similar';}
      else if (this.media_type === 'tv') {url = 'https://api.themoviedb.org/3/tv/'+ this.id +'/similar'}
      axios.get(url, config)
          .then(response => {
            console.log('api response - similar', response);
            this.similarSearchResults = response.data.results;
          })
          .catch(error => {
            console.error('AJAX SEARCH ERROR:', error);
          })
          .finally(() => {
            this.displayResults();
          })

    },
    displayResults() {
      for (let i = 0; i < 6; i++) {
        if (this.media_type === 'movie' &&
            this.similarSearchResults[i].overview !== '' &&
            this.similarSearchResults[i].release_date !== ''
        ) {
          this.similarSearchResults[i].media_type ='movie';
          this.similarCollection.addItem(Object.assign(new Movie, this.similarSearchResults[i]))
        }
        if (this.media_type === 'tv' &&
            this.similarSearchResults[i].overview !== '' &&
            this.similarSearchResults[i].first_air_date !== ''
        ) {
          this.similarSearchResults[i].media_type = 'tv';
          this.similarCollection.addItem(Object.assign(new Series, this.similarSearchResults[i]))
        }
      }
    },
  },
}
</script>
<style scoped>
  .similarDivider {
    background-color: white;
    margin-bottom: 20px;
  }
  .detailsRating {
    margin-top: 130px;
    left: 110px;
    width: 20px;
    position: absolute;
  }
  .detailsPoster {
    display: block;
    position: absolute;
    width: 100%;
    top: 300px;
    left: 70px;
    box-shadow: 30px 30px 50px 12px black;
  }
  .detailsBackdrop {
    height: 500px;
    position: relative;
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
  }
  .detailsNoBackdrop {
    height: 500px;
    position: relative;
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    background-image: url("../assets/no-backdrop.jpg");
  }
  .detailsCard {
    margin-top: 20px;
    margin-left: 320px;
    margin-right: 20px;
  }
  @media all and (max-width: 700px) {
    .detailsCard {
      margin-left: 10px;
      margin-right: 10px;
      margin-top: 180px;
    }
    .detailsPoster {
      left: 20px;
      box-shadow: 15px 10px 50px 12px black;
    }
    .detailsRating {
      left: 50px;
    }
  }
</style>