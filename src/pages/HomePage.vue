<template>
  <q-page-container>
    <div class="home">
      <BlogPost :post="welcomeScreen" />
      <BlogPost v-for="(post, index) in sampleBlogPost" :key="index" :post="post" />
    </div>
  </q-page-container>
</template>

<script>
import BlogPost from '../components/HomeComponents/BlogPost.vue';
export default {
  name: 'HomePage',
  components: {
    BlogPost,
  },
  data() {
    return {
      welcomeScreen: {
        title: 'Welcome!',
        blogPost:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat nec purus in congue. Ut lacinia, neque in pharetra ullamcorper, massa mi dignissim urna, vitae elementum lectus libero id neque.',
        welcomeScreen: true,
        photo: 'surf',
      },
      sampleBlogPost: [
        {
          title: 'This is a Filler Title!',
          blogHTML: 'This is a filler blog post title',
          blogCoverPhoto: 'nature',
        },
        {
          title: 'This is a Filler Title2!',
          blogHTML: 'This is a filler blog post title',
          blogCoverPhoto: 'car',
        },
      ],
      sampleBlogCards: [
        {
          blogTitle: 'Blog Card #1',
          blogCoverPhoto: 'stock-1',
          blogDate: 'June 7,2022',
        },
        {
          blogTitle: 'Blog Card #2',
          blogCoverPhoto: 'stock-2',
          blogDate: 'June 15,2022',
        },
        {
          blogTitle: 'Blog Card #3',
          blogCoverPhoto: 'stock-3',
          blogDate: 'July 4,2022',
        },
        {
          blogTitle: 'Blog Card #4',
          blogCoverPhoto: 'stock-4',
          blogDate: 'August 1,2022',
        },
      ],
    };
  },
};
</script>
