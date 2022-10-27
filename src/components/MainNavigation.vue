<template>
  <q-header class="main-header">
    <nav @click="hideOnClick" class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }">
          <span class="header-span">JB BLOGS</span></router-link
        >
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{ name: 'Home' }"
            ><i class="fa-solid fa-house fa-lg q-px-sm"></i>Home</router-link
          >
          <router-link class="link" to="#"
            ><i class="fa-solid fa-address-card fa-lg q-px-sm"></i>About</router-link
          >
          <router-link class="link" :to="{ name: 'BlogsPage' }"
            ><i class="fa-solid fa-blog fa-lg q-px-sm"></i>Blogs</router-link
          >
          <router-link v-if="user" class="link" :to="{ name: 'CreatePostPage' }"
            ><i class="fa-solid fa-circle-plus fa-lg q-px-sm"></i>Create Post</router-link
          >
          <router-link v-if="!user" class="link" :to="{ name: 'LoginPage' }"
            ><i class="fa-solid fa-right-to-bracket fa-lg q-px-sm"></i>Login In /
            Register</router-link
          >
        </ul>

        <q-btn-dropdown v-if="user" class="profile" color="dark">
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Account Settings</div>

              <div v-if="user" class="option">
                <router-link class="option" :to="{ name: 'ProfilePage' }">
                  <i class="fa-solid fa-user fa-2x"></i>
                  <p>Profile</p>
                </router-link>
              </div>
              <div v-if="!user" class="option">
                <router-link class="option" to="AdminPage">
                  <i class="fa-solid fa-lock fa-2x"></i>
                  <p>Admin</p>
                </router-link>
              </div>
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>

              <div class="text-subtitle1 q-mb-xs">
                {{ store.state.profileFirstName }} {{ store.state.profileLastName }}
              </div>
              <div class="text-subtitle1 q-mb-sm">
                {{ store.state.profileEmail }}
              </div>

              <q-btn
                @click="signOut"
                color="dark"
                label="Logout"
                push
                size="sm"
                v-close-popup
              />
            </div>
          </div>
        </q-btn-dropdown>
      </div>
      <q-btn
        @click="toggleLeftDrawer"
        class="menu-icon q-mr-md"
        v-show="mobile"
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        color="dark"
      />
      <q-drawer
        behavior="mobile"
        show-if-above
        v-model="leftDrawerOpen"
        side="left"
        bordered
      >
        <ul class="mobile-nav" v-if="leftDrawerOpen">
          <router-link class="link" :to="{ name: 'Home' }"
            ><i class="fa-solid fa-house fa-lg q-px-sm"></i>Home</router-link
          >
          <router-link class="link" to="#"
            ><i class="fa-solid fa-address-card fa-lg q-px-sm"></i>About</router-link
          >
          <router-link class="link" :to="{ name: 'BlogsPage' }"
            ><i class="fa-solid fa-blog fa-lg q-px-sm"></i>Blogs</router-link
          >
          <router-link v-if="user" class="link" :to="{ name: 'CreatePostPage' }"
            ><i class="fa-solid fa-circle-plus fa-lg q-px-sm"></i>Create Post</router-link
          >
          <router-link v-if="!user" class="link" :to="{ name: 'LoginPage' }"
            ><i class="fa-solid fa-right-to-bracket fa-lg q-px-sm"></i>Login In /
            Register</router-link
          >
        </ul>
      </q-drawer>
    </nav>
  </q-header>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useRouter } from 'vue-router';

export default {
  name: 'MainNavigation',
  components: {},

  setup() {
    const mobile = ref(null);
    const windowWidth = ref(null);
    const store = useStore();
    const profileMenu = ref(null);
    const profile = ref(null);
    const leftDrawerOpen = ref(false);
    const router = useRouter();

    watchEffect(() => {
      window.addEventListener('resize', checkSCreen);
      windowWidth.value = window.innerWidth;
      if (windowWidth.value <= 750) {
        mobile.value = true;
      } else {
        mobile.value = false;
      }
    });

    function checkSCreen() {
      windowWidth.value = window.innerWidth;
      if (windowWidth.value <= 750) {
        mobile.value = true;
      } else {
        mobile.value = false;
      }
    }

    function signOut() {
      firebase.auth().signOut();
      router.push({ name: 'Home' });
    }

    const user = computed(() => {
      return store.state.user;
    });

    return {
      mobile,
      checkSCreen,
      store,
      profileMenu,
      profile,
      signOut,
      user,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};

// data() {
//   return {
//     mobile: null,
//     mobileNav: null,
//     windowWidth: null,
//   };
// },
// created() {
//   window.addEventListener('resize', this.checkSCreen);
//   this.checkSCreen();
// },
// methods: {
//   checkSCreen() {
//     this.windowWidth = window.innerWidth;
//     if (this.windowWidth <= 750) {
//       this.mobile = true;
//       return;
//     }
//     this.mobile = false;
//     this.mobileNav = false;
//     return;
//   },
//   toggleMobileNav() {
//     this.mobileNav = !this.mobileNav;
//   },
// },
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
        font-family: 'Proxima Nova';
        font-weight: 600;
        font-size: 35px;
        color: #000;
        text-decoration: none;

        .header-span {
          font-family: 'Comfortaa', Courier, monospace;
          font-size: 20px;
          font-weight: 600;
        }
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

      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;
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
    width: 105%;
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

.option {
  text-decoration: none;
  color: #303030;
  display: flex;
  height: 50px;

  p {
    font-size: 14px;
    margin-left: 12px;
    align-items: center;

    &:hover {
      color: #1eb8b8;
    }
  }
}
</style>
