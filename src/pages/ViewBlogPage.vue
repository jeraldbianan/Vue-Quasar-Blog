<template>
  <transition
    appear
    enter-active-class="animated fadeIn slow"
    leave-active-class="animated fadeOut slow"
  >
    <q-page-container>
      <div class="post-view" v-if="currentBlog">
        <div class="container quillWrapper">
          <h2>{{ currentBlog.blogTitle }}</h2>
          <h4>
            Posted on:
            {{
              new Date(currentBlog.blogDate).toLocaleString('en-us', {
                dateStyle: 'long',
              })
            }}
          </h4>
          <img :src="currentBlog.blogCoverPhoto" alt="" />
          <div class="post-content ql-editor" v-html="currentBlog.blogHTML"></div>
        </div>
      </div>
    </q-page-container>
  </transition>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  name: 'ViewBlog',

  setup() {
    const currentBlog = ref(null);
    const store = useStore();
    const route = useRoute();

    // const r = [1, 2, 3, 4];

    // console.log(
    //   r.map((i) => {
    //     return i * 5;
    //   })
    // );

    //user .filter if you want to get more than 1 array
    //i use .find since im only getting 1 array which is the current blog selected
    onMounted(async () => {
      currentBlog.value = await store.state.blogPosts.find((post) => {
        return post.blogID === route.params.blogid;
      });
      console.log();
    });

    return {
      currentBlog,
    };
  },
};
</script>

<style lang="scss" scoped>
.post-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
    width: 100%; /* or any custom size */
    height: 100%;
    object-fit: contain;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }

  img {
    width: 100%; /* or any custom size */
    height: 100%;
    max-width: 700px;
    max-height: 700px;
    object-fit: contain;
    margin-bottom: 32px;
  }

  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>
