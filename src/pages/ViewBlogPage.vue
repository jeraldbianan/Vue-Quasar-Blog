<template>
  <transition
    appear
    enter-active-class="animated fadeIn slow"
    leave-active-class="animated fadeOut slow"
  >
    <q-page-container>
      <div class="post-view" v-if="currentBlog">
        <div class="container quillWrapper">
          <h2>{{ blogTitle }}</h2>
          <h4>
            Posted on:
            {{
              new Date(blogDate).toLocaleString('en-us', {
                dateStyle: 'long',
              })
            }}
          </h4>
          <img :src="blogCoverPhoto" alt="" />
          <div class="post-content ql-editor" v-html="blogHTML"></div>
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
    const blogTitle = ref(null);
    const blogDate = ref(null);
    const blogCoverPhoto = ref(null);
    const blogHTML = ref(null);

    onMounted(async () => {
      currentBlog.value = await store.state.blogPosts.filter((post) => {
        return post.blogID === route.params.blogid;
      });
      blogTitle.value = currentBlog.value[[0]].blogTitle;
      blogDate.value = currentBlog.value[[0]].blogDate;
      blogCoverPhoto.value = currentBlog.value[[0]].blogCoverPhoto;
      blogHTML.value = currentBlog.value[[0]].blogHTML;
    });

    return {
      currentBlog,
      blogTitle,
      blogDate,
      blogCoverPhoto,
      blogHTML,
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
