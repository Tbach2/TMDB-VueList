<template>
  <v-container>
<!--    Navigation Bar   -->
    <v-app-bar app color="grey darken-3" dark>
      <v-toolbar-title class="navTitle grey darken-3" >
        <v-icon>mdi-movie-open </v-icon> VueList
      </v-toolbar-title>
      <v-spacer/>
      <v-tabs right class="navTabs ml-auto">
        <v-tab v-for="navLink in navLinks" :key="navLink.title" :to="navLink.to">
          {{navLink.title}}
        </v-tab>
      </v-tabs>
<!--      User      -->
      <v-avatar @click="viewProfile" class="navBarUserAvatar" size="35">
        <img v-show="authUser == null" src="../assets/user-icon.png"/>
        <img v-show="authUser !== null" :src="photoUrl" />
      </v-avatar>
      <v-app-bar-nav-icon class="navBarDrawerBtn" @click="drawer = !drawer"/>
    </v-app-bar>
<!--    Navigation Drawer     -->
    <v-navigation-drawer class="navDrawer" v-model="drawer" app right color="grey darken-3" dark disable-resize-watcher>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
<!--          User         -->
            <v-avatar @click="viewProfile" class="navDrawerUserAvatar" size="45">
              <img v-show="authUser == null" src="../assets/user-icon.png"/>
              <img v-show="authUser !== null" :src="photoUrl" />
            </v-avatar>
            <v-card-subtitle class="navDrawerUserName" v-show="authUser !== null">{{displayName}}</v-card-subtitle>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="navLink in navLinks" :key="navLink.title" link :to="navLink.to">
          <v-list-item-icon>
            <v-icon>{{ navLink.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ navLink.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import {auth} from "@/firebase";
import router from "@/router";

export default {
  name: "NavigationBar",
  props: {
    authUser: {required: true},
    photoUrl: {required: true},
    displayName: {required: true},
  },
  data() {
    return {
      drawer: false,
      navLinks: [
        {title: 'Search', icon: 'mdi-magnify', to: '/Search'},
        {title: 'Watch List', icon: 'mdi-playlist-play', to: '/watch-list'},
        {title: 'Watch History', icon: 'mdi-history', to: '/watch-history'},
      ],
    }
  },
  methods: {
    logout() {
      auth.signOut();
    },
    viewProfile() {
      router.push({name: 'accountPage'}).catch(error => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
            error.name !== 'NavigationDuplicated' &&
            !error.message.includes('Avoided redundant navigation to current location')
        ) {console.log(error);}
      });
    },
  },
}
</script>
<style scoped>
  .navDrawerUserName {
    position: absolute;
    top: 20px;
    left: 50px;
  }
  .navBarUserAvatar {
    border: solid 2px whitesmoke;
    margin-left: 30px;
  }
  .navTitle {
    opacity: 1;
    width: 140px;
    position: absolute;
    top: 15px;
  }
  .navDrawer {
    visibility: hidden;
  }
  .navBarDrawerBtn {
    margin-right: 10px !important;
  }
  .navBarDrawerBtn {
    visibility: hidden;
  }
  @media all and (max-width: 900px) {
    .navTabs {
      visibility: hidden;
    }
    .navDrawer {
      visibility: visible;
    }
    .navBarDrawerBtn {
      visibility: visible;
    }
    .navBarUserAvatar {
      visibility: hidden;
    }
  }
</style>