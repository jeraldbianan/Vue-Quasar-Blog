<template>
  <q-page-container>
    <div class="bg-white text-black text-center q-pa-md flex flex-center">
      <div>
        <div style="font-size: 20vh">404</div>

        <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

        <q-btn
          class="q-mt-xl"
          color="dark"
          text-color="white"
          unelevated
          to="/"
          label="Go Home"
          no-caps
        />
      </div>
    </div>
  </q-page-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorNotFound',
});
</script>
