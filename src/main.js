import Vue from 'vue'
import App from './App'
import router from './router'
import { firebaseConfig } from '../firebase.config'
import store from './store'
import auth, { getAuth, onAuthStateChanged } from 'firebase/auth'

Vue.config.productionTip = false

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

const unsubscribe = onAuthStateChanged(auth, (user) => {
  // dispatch user
  store.dispatch('setUser', user)

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
  })
  unsubscribe()
})
