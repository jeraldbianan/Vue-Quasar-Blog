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

export default {
  name: 'MainLayout',
  components: {
    MainNavigation,
    MainFooter,
  },
  data() {
    return {
      navigation: null,
    };
  },
  created() {
    this.checkRoute();
  },
  methods: {
    checkRoute() {
      if (
        this.$route.name === 'LoginPage' ||
        this.$route.name === 'RegisterPage' ||
        this.$route.name === 'ForgotPasswordPage'
      ) {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>
