<template>
  <q-page-container>
    <transition
      appear
      enter-active-class="animated fadeIn slow"
      leave-active-class="animated fadeOut slow"
    >
      <div class="form-wrap">
        <form action="" class="login">
          <p class="login-register">
            Don't have an account?
            <router-link class="router-link" :to="{ name: 'RegisterPage' }"
              >Register</router-link
            >
          </p>
          <h2>Login to JB Blogs</h2>
          <div class="inputs">
            <div class="input">
              <q-input standout filled v-model="email" label="Email">
                <template v-slot:prepend><q-icon name="mail" /></template
              ></q-input>
            </div>
            <div class="input">
              <q-input v-model="password" filled type="password" label="Password"
                ><template v-slot:prepend><q-icon name="fa-solid fa-lock" /></template
              ></q-input>
            </div>
            <div v-if="error" class="error q-mt-md">{{ errorMsg }}</div>
          </div>
          <router-link class="forgot-password" :to="{ name: 'ForgotPasswordPage' }"
            >Forgot your Password?</router-link
          >

          <q-btn
            @click.prevent="signIn"
            class="button"
            unelevated
            rounded
            color="dark"
            label="Sign in"
          />

          <router-link class="home" :to="{ name: 'Home' }">Home</router-link>

          <div class="angle"></div>
        </form>
        <div class="background">
          <q-carousel
            class="carousel"
            animated
            v-model="slide"
            navigation
            infinite
            :autoplay="3000"
            transition-prev="slide-right"
            transition-next="slide-left"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
          >
            <q-carousel-slide :name="1" img-src="../assets/carousel/carousel1.jpg" />
            <q-carousel-slide :name="2" img-src="../assets/carousel/carousel2.jpg" />
            <q-carousel-slide :name="3" img-src="../assets/carousel/carousel3.jpg" />
            <q-carousel-slide :name="4" img-src="../assets/carousel/carousel4.jpg" />
          </q-carousel>
        </div>
      </div>
    </transition>
  </q-page-container>
</template>

<script>
import { ref, onBeforeUnmount } from 'vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export default {
  name: 'LoginPage',

  setup() {
    const $q = useQuasar();
    let timer;
    const email = ref(null);
    const password = ref(null);
    const error = ref(null);
    const errorMsg = ref('');
    const router = useRouter();

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });

    function signIn() {
      $q.loading.show({
        message: 'Processing Please Wait....',
      });

      timer = setTimeout(() => {
        $q.loading.hide();
        timer = void 0;
      }, 2000);

      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(() => {
          router.push({ name: 'Home' });
          error.value = false;
          errorMsg.value = '';
          console.log(firebase.auth().currentUser.uid);
        })
        .catch((err) => {
          error.value = true;
          errorMsg.value = err.message;
        });
    }

    return {
      slide: ref(1),
      autoplay: ref(true),
      email,
      password,
      error,
      errorMsg,
      router,
      signIn,
    };
  },
};
</script>

<style lang="scss" scoped>
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 900px) {
    width: 100%;
  }
  .login-register {
    margin-bottom: 20px;

    .router-link {
      color: #000;
    }
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (min-width: 900px) {
      padding: 0 50px;
    }

    h2 {
      text-align: center;
      font-size: 25px;
      font-weight: 700;
      color: #303030;
      margin-bottom: 40px;
      @media (min-width: 900px) {
        font-size: 30px;
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        margin-bottom: 5px;
      }
    }

    .forgot-password {
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 14px;
      margin: 16px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: #303030;
      }
    }

    .button {
      width: 200px;
    }

    .home {
      margin-top: 20px;
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 14px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: #303030;
      }
    }

    .angle {
      display: none;
      position: absolute;
      background-color: #fff;
      width: 60px;
      right: -30px;
      height: 101%;
      @media (min-width: 900px) {
        display: initial;
      }
    }
  }

  .background {
    display: none;
    flex: 2;
    background-size: cover;
    width: 100%;
    height: 100%;
    max-height: 100vh;

    @media (min-width: 900px) {
      display: initial;
    }

    .carousel {
      height: 100%;
      max-height: 100vh;
    }
  }
}
</style>
