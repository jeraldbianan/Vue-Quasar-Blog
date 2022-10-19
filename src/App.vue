<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Comfortaa:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Comfortaa', san-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  padding: 10px;
  width: 200px;
  justify-content: center;
  path {
    fill: black;
  }
}

.arrow-light {
  path {
    fill: #fff;
  }
}

.blog-card-wrapper {
  position: relative;
  padding: 80px 16px;
  background-color: #acacac;
  @media (min-width: 500px) {
    padding: 100px 16px;
  }
}
</style>
