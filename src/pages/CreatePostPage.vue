<template>
  <q-page-container>
    <div></div>
  </q-page-container>
</template>

<script>
import Quill from 'quill';
import { ref } from 'vue';
window.Quill = Quill;
const ImageResize = require('quill-image-resize-module').default;
Quill.register('module/imageResize', ImageResize);

export default {
  name: 'CreatePostPage.vue',
  setup() {
    const error = ref(null);
    const errorMsg = ref(null);
    const editorSettings = ref({
      modules: {
        ImageResize: {},
      },
    });
    return {
      error,
      errorMsg,
      editorSettings,
    };
  },
};
</script>

<style lang="scss" scoped></style>
