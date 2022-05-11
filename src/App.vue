<template>
  <v-app>
    <navigation-bar :auth-user="authUser" :display-name="displayName" :photo-url="photoURL" :uid="uid"/>
    <v-main class="vMain grey darken-4">
      <router-view :auth-user="authUser" :display-name="displayName" :photo-url="photoURL" :uid="uid"/>
    </v-main>
  </v-app>
</template>

<script>
import {auth} from "@/firebase";
import {User} from "@/models/UserModel";
import router from "@/router";
import NavigationBar from "@/components/NavigationBar";

export default {
  name: 'App',
  components: {NavigationBar},
  router,
  data() {
    return {
      authUser: null,
      displayName: '',
      photoURL: '',
      uid: '',
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.displayName = user.displayName;
        this.photoURL = user.photoURL;
        this.uid = user.uid;

        console.log('Signed in as: ', user);

        // store user in the app
        this.authUser = new User(user);
      } else {
        // User is signed out.
        console.log('Not signed in.');

        this.authUser = null
      }
    });
  },
}
</script>

<style>
  .vMain {
    padding-top: 40px !important;
  }
  .mediaCard {
    padding-bottom: 110px;
    max-height: 550px;
  }
  .mediaCard:hover {
    box-shadow: 0 15px 50px 12px black !important;
  }
  .cardDate {
    position: absolute;
    bottom: 0;
  }
  .cardSubtitle {
    padding-bottom: 0;
  }
  .cardTitle {
    padding-top: 0;
    padding-bottom: 0;
    word-break: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    cursor: pointer;
    height: inherit;
  }
  .cardTitle:hover {
    text-decoration: underline;
  }
  .popupImage {
    margin-left: 10px;
    margin-top: 10px;
    box-shadow: 12px 12px 20px 0 #212121;
    cursor: pointer;
  }
  .popupSubtitle {
    padding-bottom: 0;
    padding-top: 10px;
  }
  .popupTitle {
    word-break: normal;
    padding-top: 0;
    padding-bottom: 20px;
  }
  .popupOverview {
    font-size: 16px;
    padding-bottom: 15px;
    height: auto;
    max-height: 150px;
    overflow-y: scroll;
  }
  .popupDate {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: smaller;
  }
  .detailsGenres {
    padding-right: 20px;
  }
  .detailsType {
    padding-right: 20px;
  }
  .detailsSubtitleSpacer {
    padding-right: 25px;
  }
  .detailsTitle {
    font-size: 25px;
    margin-bottom: 5px;
    word-break: normal;
  }
  .detailsOverview {
    font-size: 15px;
  }
</style>