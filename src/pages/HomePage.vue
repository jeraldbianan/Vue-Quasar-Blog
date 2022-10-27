<template>
  <transition
    appear
    enter-active-class="animated fadeIn slow"
    leave-active-class="animated fadeOut slow"
  >
    <q-page-container>
      <div class="home">
        <BlogPost v-if="!user" :post="welcomeScreen" />
        <BlogPost v-for="(post, index) in blogPostsFeed" :key="index" :post="post" />
        <transition
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <div class="blog-card-wrapper">
            <div class="container">
              <h3>
                <router-link class="blog-cards-link" :to="{ name: 'BlogsPage' }"
                  >View More Recent Blogs</router-link
                >
              </h3>
              <div class="blog-cards">
                <BlogCard
                  v-for="(post, index) in blogPostsCards"
                  :key="index"
                  :post="post"
                />
              </div>
            </div>
          </div>
        </transition>
      </div>
    </q-page-container>
  </transition>
</template>

<script>
import BlogPost from '../components/HomeComponents/BlogPost.vue';
import BlogCard from '../components/HomeComponents/BlogCard.vue';
import DummyData from '../assets/dummydata/dummyData';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'HomePage',
  components: {
    BlogPost,
    BlogCard,
  },

  setup() {
    const store = useStore();

    const sampleBlogCards = computed(() => {
      return store.state.sampleBlogCards;
    });

    const user = computed(() => {
      return store.state.user;
    });

    const blogPostsCards = computed(() => {
      return store.getters.blogPostsCards;
    });

    const blogPostsFeed = computed(() => {
      return store.getters.blogPostsFeed;
    });

    return {
      user,
      sampleBlogCards,
      ...DummyData,
      blogPostsCards,
      blogPostsFeed,
    };
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrapper {
  .container {
    .blog-cards-link {
      cursor: pointer;
      text-decoration: none;
      color: black;
      font-weight: 500;

      &:hover {
        color: #59f3f3;
      }
    }
  }

  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
    color: #fff;
  }

  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;

    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
