<template>
  <q-header class="main-header">
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }">JB BLOGS</router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{ name: 'Home' }"
            ><i class="fa-solid fa-house fa-lg q-px-sm"></i>Home</router-link
          >
          <router-link class="link" to="#"
            ><i class="fa-solid fa-address-card fa-lg q-px-sm"></i>About</router-link
          >
          <router-link class="link" :to="{ name: 'BlogsView' }"
            ><i class="fa-solid fa-blog fa-lg q-px-sm"></i>Blogs</router-link
          >
          <router-link class="link" to="#"
            ><i class="fa-solid fa-circle-plus fa-lg q-px-sm"></i>Create Post</router-link
          >
          <router-link class="link" to="#"
            ><i class="fa-solid fa-right-to-bracket fa-lg q-px-sm"></i>Login In /
            Register</router-link
          >
        </ul>
      </div>
      <q-btn
        @click="toggleMobileNav"
        class="menu-icon"
        v-show="mobile"
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        color="dark"
      />
      <transition name="mobile-nav">
        <ul class="mobile-nav" v-show="mobileNav">
          <router-link class="link" :to="{ name: 'Home' }"
            ><i class="fa-solid fa-house fa-lg q-px-sm"></i>Home</router-link
          >
          <router-link class="link" to="#"
            ><i class="fa-solid fa-address-card fa-lg q-px-sm"></i>About</router-link
          >
          <router-link class="link" :to="{ name: 'BlogsView' }"
            ><i class="fa-solid fa-blog fa-lg q-px-sm"></i>Blogs</router-link
          >
          <router-link class="link" to="#"
            ><i class="fa-solid fa-circle-plus fa-lg q-px-sm"></i>Create Post</router-link
          >
          <router-link class="link" to="#"
            ><i class="fa-solid fa-right-to-bracket fa-lg q-px-sm"></i>Login In /
            Register</router-link
          >
        </ul>
      </transition>
    </nav>
  </q-header>
</template>

<script>
export default {
  name: 'MainNavigation',
  components: {},
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    };
  },
  created() {
    window.addEventListener('resize', this.checkSCreen);
    this.checkSCreen();
  },
  methods: {
    checkSCreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
  },
};
</script>

<style lang="scss" scoped>
.main-header {
  background-color: rgb(255, 255, 255);
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3 color ease;

    &:hover {
      color: #1eb8b8;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }

    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      ul {
        margin-right: 32px;

        .link {
          margin-right: 32px;
        }
        .link:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 45px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;

    .link {
      padding: 15px 0;
      color: #fff;
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 0.5s ease;
  }

  .mobile-nav-enter-from,
  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
</style>
