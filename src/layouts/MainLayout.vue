<template>
  <q-layout view="hHh lpR fff">
    <div>
      <MainNavigation />
    </div>
    <div>
      <HomePage />
    </div>
    <div>
      <MainFooter />
    </div>
  </q-layout>
</template>

<script>
import MainNavigation from '../components/MainNavigation.vue';
import MainFooter from '../components/MainFooter.vue';
import HomePage from '../pages/HomePage.vue';

export default {
  name: 'MainLayout',
  components: {
    MainNavigation,
    MainFooter,
    HomePage,
  },
};
</script>
