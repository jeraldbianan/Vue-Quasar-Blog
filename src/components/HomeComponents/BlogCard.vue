<template>
  <q-card class="blog-card">
    <img :src="require(`../../assets/blogCards/${post.blogCoverPhoto}.jpg`)" alt="" />
    <div class="info q-pb-md">
      <q-card-section>
        <h4>{{ post.blogTitle }}</h4>
        <h6 class="q-py-sm">Posted on: {{ post.blogDate }}</h6>
      </q-card-section>

      <transition
        appear
        enter-active-class="animated fadeIn slow"
        leave-active-class="animated fadeOut slow"
      >
        <div class="icons" v-show="editPost">
          <div class="icon" name="icons">
            <q-btn
              class="edit fa-2x"
              flat
              dense
              round
              icon="fa-solid fa-pen-to-square"
              aria-label="Menu"
            />
          </div>
          <div class="icon" name="icons">
            <q-btn
              class="delete fa-2x"
              flat
              dense
              round
              icon="fa-solid fa-trash"
              aria-label="Menu"
            />
          </div>
        </div>
      </transition>

      <q-btn
        class="link q-py-sm"
        color="dark"
        push
        @click="$router.replace('#')"
        icon-right="fa-solid fa-arrow-right"
      >
        <span class="q-px-md">View the Post</span>
      </q-btn>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'blogCard',
  props: ['post'],
  computed: {
    editPost() {
      return this.$store.state.editPost;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  min-height: 420px;
  transition: 0.5s ease all;

  &:hover {
    transform: rotateZ(-1deg) scale(1.1);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);
  }

  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;
    padding: 10px;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: #fff;
      transition: 0.5s ease all;
      width: 40px;
      height: 40px;

      &:hover {
        background-color: #303030;

        .edit,
        .delete {
          color: #fff;
        }
      }

      &:nth-child(1) {
        margin-right: 8px;
      }

      .edit,
      .delete {
        pointer-events: none;
        height: 15px;
        width: auto;
      }
    }
  }

  img {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000;

    h4 {
      font-size: 20px;
      font-weight: 300;
    }

    h6 {
      font-weight: 400;
      font-size: 13px;
    }

    .link {
      display: flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      font-size: 12px;
    }
  }
}
</style>
