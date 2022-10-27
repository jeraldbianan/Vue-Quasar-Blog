<template>
  <q-page-container>
    <div class="blog-card-wrapper">
      <div class="blog-cards container">
        <div class="toggle-edit">
          <q-toggle v-model="editPost" color="dark" label="Toggle Edit" left-label />
        </div>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <BlogCard v-for="(post, index) in blogPosts" :key="index" :post="post" />
        </transition-group>
      </div>
    </div>
  </q-page-container>
</template>

<script>
import { computed, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import BlogCard from '../components/HomeComponents/BlogCard.vue';
export default {
  name: 'blogsView',
  components: {
    BlogCard,
  },

  setup() {
    const store = useStore();

    const blogPosts = computed(() => {
      return store.state.blogPosts;
    });

    const editPost = computed({
      get() {
        return store.state.editPost;
      },
      set(payload) {
        store.commit('toggleEditPost', payload);
      },
    });

    onBeforeUnmount(() => {
      store.commit('toggleEditPost', false);
    });

    return {
      blogPosts,
      editPost,
    };
  },
};
</script>

<style lang="scss" scoped>
.blog-cards {
  position: relative;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;

    span {
      margin-right: 16px;
    }
  }
}
</style>
