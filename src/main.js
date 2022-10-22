import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    createApp(App).use(store).use(router).mount('#app')
  }
})
