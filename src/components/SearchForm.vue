<template>
  <div>
    <v-row justify="center">
      <form class="searchForm" @submit.prevent="search" v-show="showSearchForm">
        <v-row no-gutters>
<!--          search input          -->
          <v-text-field dense class="searchBar" clearable type="text" name="search" v-model="searchQuery"
                        label="Search" dark v-show="showSearchInput"/>
<!--          search type/category selectors           -->
          <v-select class="movieSearchTypeSelector" dark dense :items="movieSearches" v-model="defaultMovieSearch"
                    label="Type" item-text="type" item-value="type" return-object @change="movieSearchSelected"
                    v-show="showMovieSearchTypeSelector"/>
          <v-select class="seriesSearchTypeSelector" dark dense :items="seriesSearches" v-model="defaultSeriesSearch"
                    label="Type" item-text="type" item-value="type" return-object @change="seriesSearchSelected"
                    v-show="showSeriesSearchTypeSelector"/>
          <v-select class="categoryTypeSelector" dark dense :items="categories" v-model="defaultCategory"
                    label="Category" item-text="type" item-value="type" return-object @change="categorySelected"/>
<!--          search button             -->
          <v-btn type="submit" class="searchButton" dark large color="grey darken-1">Search</v-btn>
        </v-row>
      </form>
    </v-row>
    <v-container>
<!--      search results       -->
      <library-list class="resultsList" :library="newCollection"/>
      <div class="noResults" v-show="showNoResultsFound">
        <h1>NO RESULTS FOUND!</h1>
        <v-img class="mx-auto" max-width="300px" src="../assets/shocked-pikachu-face.png"></v-img>
      </div>
<!--      page buttons       -->
      <v-row justify="center" class="pageButtons" v-show="showButtons">
        <v-icon large dark @click="pageBack" class="backPageBtn my-5">mdi-chevron-left</v-icon>
        <h3 class="pageNumber white--text">{{ page }}</h3>
        <v-icon large dark @click="pageForward" class="forwardPageBtn my-5">mdi-chevron-right</v-icon>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LibraryList from "@/components/LibraryList";
import LibraryCollection from "@/models/LibraryCollection";
import {Movie, Series} from "@/models/LibraryItems";
const axios = require('axios').default;

export default {
  name: 'SearchForm',
  components: {LibraryList},
  data() {
    return {
      page: 1,
      searchQuery: '',
      newCollection: new LibraryCollection(),
      showButtons: false,
      showNoResultsFound: false,
      showSearchForm: true,
      showSearchInput: false,
      selectedCategory: 'Movies',
      defaultCategory: {type: 'Movies'},
      categories: [
        {type: 'Movies'}, {type: 'Series'}, {type: 'Movies & Series'},
      ],
      showMovieSearchTypeSelector: true,
      movieSelectedSearch: 'Popular',
      defaultMovieSearch: {type: 'Popular'},
      movieSearches: [
        {type: 'Search'}, {type: 'Popular'}, {type: 'Top Rated'}, {type: 'Upcoming'},
      ],
      showSeriesSearchTypeSelector: false,
      seriesSelectedSearch: 'Popular',
      defaultSeriesSearch: {type: 'Popular'},
      seriesSearches: [
        {type: 'Search'}, {type: 'Popular'}, {type: 'Top Rated'}, {type: 'Currently Airing'},
      ],
    }
  },
  methods: {
    search() {
      // prepare and perform search
      // clear results
      this.newCollection = new LibraryCollection();

      // set search type/category
      let url;
      if (this.selectedCategory === 'Movies') {url = 'https://api.themoviedb.org/3/search/movie'}
      if (this.selectedCategory === 'Series') {url = 'https://api.themoviedb.org/3/search/tv'}
      if (this.selectedCategory === 'Movies & Series') {url = 'https://api.themoviedb.org/3/search/multi'}
      if (this.selectedCategory === 'Movies' && this.movieSelectedSearch === 'Popular')
      {url = 'https://api.themoviedb.org/3/movie/popular'}
      if (this.selectedCategory === 'Movies' && this.movieSelectedSearch === 'Top Rated')
      {url = 'https://api.themoviedb.org/3/movie/top_rated'}
      if (this.selectedCategory === 'Movies' && this.movieSelectedSearch === 'Upcoming')
      {url = 'https://api.themoviedb.org/3/movie/upcoming'}
      if (this.selectedCategory === 'Series' && this.seriesSelectedSearch === 'Popular')
      {url = 'https://api.themoviedb.org/3/tv/popular'}
      if (this.selectedCategory === 'Series' && this.seriesSelectedSearch === 'Top Rated')
      {url = 'https://api.themoviedb.org/3/tv/top_rated'}
      if (this.selectedCategory === 'Series' && this.seriesSelectedSearch === 'Currently Airing')
      {url = 'https://api.themoviedb.org/3/tv/on_the_air'}
      // build request arguments
      let config = {
        params: {
          query: this.searchQuery,
          page: this.page,
          api_key: process.env.VUE_APP_TMDB_API_KEY,
        },
        responseType: 'json'
      }
      // execute ajax request using promises
      axios.get(url, config)
          .then(response => {
            console.log('api response', response);
            this.searchResults = response.data.results;
            this.totalPages = response.data.total_pages;
          })
          .catch(error => {
            console.error('AJAX SEARCH ERROR:', error)
          })
          .finally(() => {
            // show results
            this.displayResults();
            this.checkResults();
          })

    },
    displayResults() {
      for (let i = 0; i < this.searchResults.length; i++) {
        if (this.searchResults[i].media_type === 'movie' ||
            this.selectedCategory === 'Movies' &&
            this.searchResults[i].overview !== '' &&
            this.searchResults[i].release_date !== ''
        ) {
          this.searchResults[i].media_type = 'movie'
          this.newCollection.addItem(Object.assign(new Movie, this.searchResults[i]))
        }

        if (this.searchResults[i].media_type === 'tv' ||
            this.selectedCategory === 'Series' &&
            this.searchResults[i].overview !== '' &&
            this.searchResults[i].first_air_date !== ''
        ) {
          this.searchResults[i].media_type = 'tv'
          this.newCollection.addItem(Object.assign(new Series, this.searchResults[i]))
        }
      }
    },
    checkResults() {
      this.showNoResultsFound = this.searchResults.length === 0;
      this.showButtons = this.totalPages > 1;
      this.showSearchForm = this.page <= 1;
    },
    categorySelected(selected) {
      this.selectedCategory = selected.type;
      if (this.selectedCategory === 'Movies') {
        this.showMovieSearchTypeSelector = true;
        this.showSeriesSearchTypeSelector = false;
        if (this.showSearchInput === true) {
          this.defaultMovieSearch = 'Search';
          this.movieSelectedSearch = 'Search';
        }
      }
      if (this.selectedCategory === 'Series') {
        this.showSeriesSearchTypeSelector = true;
        this.showMovieSearchTypeSelector = false;
        if (this.showSearchInput === true) {
          this.defaultSeriesSearch = 'Search';
          this.seriesSelectedSearch = 'Search';
        }
      }
      if (this.selectedCategory === 'Movies & Series') {
        this.showSearchInput = true;
        this.showMovieSearchTypeSelector = false;
        this.showSeriesSearchTypeSelector = false;
      }
    },
    movieSearchSelected(selected) {
      this.movieSelectedSearch = selected.type;
      this.showSearchInput = this.movieSelectedSearch === "Search";
    },
    seriesSearchSelected(selected) {
      this.seriesSelectedSearch = selected.type;
      this.showSearchInput = this.seriesSelectedSearch === "Search";
    },
    pageForward() {
      if (this.page < this.totalPages) {
        this.page++;
        this.search();
      }
    },
    pageBack() {
      if (this.page > 1) {
        this.page--;
        this.search();
      }
    },
  },
  mounted() {
    this.search();
  }
}
</script>
<style>
.resultsList {
  margin-top: 50px !important;
}

.searchForm {
  padding-top: 50px;
}

.categoryTypeSelector {
  margin-top: 38px !important;
  max-width: 170px !important;
  margin-right: 10px;
}

.seriesSearchTypeSelector {
  margin-top: 38px !important;
  margin-right: 10px;
  max-width: 170px !important;
}

.movieSearchTypeSelector {
  margin-top: 38px !important;
  margin-right: 10px;
  max-width: 170px !important;
}

.searchBar {
  margin-top: 38px !important;
  margin-right: 10px;
  min-width: 300px !important;
}

.searchButton {
  margin-top: 21px;
}

.pageButtons {
  margin-top: 50px !important;
  margin-bottom: 30px;
}

.backPageBtn {
  margin-right: 200px;
}

.forwardPageBtn {
  margin-left: 200px;
}

.pageNumber {
  margin-top: 25px;
}

.noResults {
  padding-top: 15%;
  color: white;
  text-align: center;
  justify-content: center;
}
</style>