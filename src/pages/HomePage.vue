<template>
  <transition
    appear
    enter-active-class="animated fadeIn slow"
    leave-active-class="animated fadeOut slow"
  >
    <q-page-container>
      <div class="home">
        <BlogPost :post="welcomeScreen" />
        <BlogPost v-for="(post, index) in sampleBlogPost" :key="index" :post="post" />
        <transition
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <div class="blog-card-wrapper">
            <div class="container">
              <h3>View More Recent Blogs</h3>
              <div class="blog-cards">
                <BlogCard
                  v-for="(post, index) in sampleBlogCards"
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
import DummyData from '../assets/dummyData/dummyData.js';
export default {
  name: 'HomePage',
  components: {
    BlogPost,
    BlogCard,
  },
  data() {
    return {
      ...DummyData,
    };
  },
  computed: {
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrapper {
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
