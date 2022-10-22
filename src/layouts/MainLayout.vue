<template>
  <q-layout view="hHh lpR fff">
    <div>
      <MainNavigation v-if="!navigation" />
    </div>
    <router-view></router-view>
    <div>
      <MainFooter v-if="!navigation" />
    </div>
  </q-layout>
</template>

<script>
import MainNavigation from '../components/MainNavigation.vue';
import MainFooter from '../components/MainFooter.vue';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import db from '../firebase/firebaseInit';

export default {
  name: 'MainLayout',
  components: {
    MainNavigation,
    MainFooter,
  },

  setup() {
    const navigation = ref(null);
    const route = useRoute();

    console.log(firebase.auth().currentUser);

    watch(route, () => {
      if (
        route.name === 'LoginPage' ||
        route.name === 'RegisterPage' ||
        route.name === 'ForgotPasswordPage'
      ) {
        navigation.value = true;
      } else {
        navigation.value = false;
      }
    });

    onMounted(() => {
      if (
        route.name === 'LoginPage' ||
        route.name === 'RegisterPage' ||
        route.name === 'ForgotPasswordPage'
      ) {
        navigation.value = true;
      } else {
        navigation.value = false;
      }
    });

    return {
      route,
      navigation,
    };
  },
};
</script>
