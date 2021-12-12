<template>
  <div>
    <div class="jumbotron bg-primary text-white text-center">
      <h2 class="lead display-3">#SLACK#</h2>
      <p>Realtime communication at it's best...</p>
    </div>

    <!-- Show Loading Statue -->
    <div class="alert alert-info" v-if="loading">Processing...</div>

    <!-- Show Errors -->
    <div class="alert alert-danger" v-if="hasErrors">
      <div v-for="error in errors" :key="error">{{ error }}</div>
    </div>

    <div class="container-fluid">
      <div class="row mt-5">
        <div class="col text-center">
          <button
            @click="loginWithGoogle"
            class="btn btn-outline-danger btn-lg"
          >
            Login with Google
          </button>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col text-center">
          <button @click="loginWithTwitter" class="btn btn-outline-info btn-lg">
            Login with Twitter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from 'firebase/auth'
import firebase from '../main'

export default {
  name: 'Login',
  data() {
    return {
      errors: [],
      loading: false,
    }
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0
    },
  },
  methods: {
    loginWithGoogle() {
      // loading set to true
      this.loading = true

      // clear old errors
      this.errors = []

      var provider = new GoogleAuthProvider()
      signInWithPopup(getAuth(), provider)
        .then((response) => {
          // dispatch setUser action
          this.$store.dispatch('setUser', response.user)
          this.$router.push('/')
        })
        .catch((error) => {
          this.errors.push(error.message)

          // set loading to false
          this.loading = false
        })
    },
    loginWithTwitter() {
      // loading set to true
      this.loading = true

      // clear old errors
      this.errors = []

      var provider = new TwitterAuthProvider()
      signInWithPopup(getAuth(), provider)
        .then((response) => {
          // dispatch setUser action
          this.$store.dispatch('setUser', response.user)
          this.$router.push('/')
        })
        .catch((error) => {
          this.errors.push(error.message)

          // set loading to false
          this.loading = false
        })
    },
  },
}
</script>

<style>
.btn,
.jumbotron {
  border-radius: 0;
}
</style>
