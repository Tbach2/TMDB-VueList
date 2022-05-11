<template>
  <div>
    <v-row justify="center">
      <v-card class="signInCard" color="grey darken-3">
        <v-card-title class="justify-center">
          <v-avatar class="userAvatar" size="80">
            <img v-show="authUser == null" src="../assets/user-icon.png"/>
            <img v-show="authUser !== null" :src="photoUrl" />
          </v-avatar>
        </v-card-title>
        <v-card-title v-show="authUser == null" class="justify-center white--text">
          <h3>Not Signed In</h3>
        </v-card-title>
        <v-card-title v-show="authUser !== null" class="justify-center white--text">
          <h3>Signed In As: {{displayName}}</h3>
        </v-card-title>
        <v-container>
          <v-btn v-show="authUser == null" color="blue" dark class="loginBtn" block @click="login">
            Sign in with Google<v-icon>mdi-google</v-icon>
          </v-btn>
          <v-btn v-show="authUser !== null" color="red" dark class="logoutBtn" block @click="logout">
            Logout
          </v-btn>
        </v-container>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import {firebase} from "@/firebase";
import {auth} from "@/firebase";

export default {
  name: "SignInPage",
  props: {
    authUser: {required: true},
    photoUrl: {required: true},
    displayName: {required: true},
  },
  data() {
    return {
    }
  },
  methods: {
    login(){
      let provider = new firebase.auth.GoogleAuthProvider();

      auth.signInWithPopup(provider)
          .catch(function(error) {
            // Handle Errors here.
            // let errorCode = error.code;
            // let errorMessage = error.message;

            console.error('Error logging in: ', error);

            // TODO: let the user know
          });
    },
    logout(){
      auth.signOut();
    },
  },
}
</script>

<style scoped>
  .signInCard {
    margin-top: 100px;
    min-height: 350px;
    min-width: 400px;
    box-shadow: 30px 30px 50px 12px black !important;
  }
  .userAvatar {
    background-color: black;
    border: solid 4px black;
    box-shadow: 0 0 50px 4px darkgrey;
    margin-top: 30px;
  }
  .loginBtn, .logoutBtn {
    margin-top: 60px;
  }
</style>