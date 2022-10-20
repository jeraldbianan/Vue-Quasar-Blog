<template>
  <q-page-container>
    <transition
      appear
      enter-active-class="animated fadeIn slow"
      leave-active-class="animated fadeOut slow"
    >
      <div class="reset-password">
        <Modal v-if="modalActive" v-on:close-modal="closeModal" />
        <div class="form-wrap">
          <form action="" class="reset">
            <h2>Reset Password</h2>
            <p>Please enter your email address to reset your password.</p>
            <div class="inputs">
              <div class="input">
                <q-input standout filled v-model="email" label="Email">
                  <template v-slot:prepend><q-icon name="mail" /></template
                ></q-input>
              </div>
            </div>

            <q-btn
              class="button q-mt-lg"
              unelevated
              rounded
              @click="resetPassword"
              color="dark"
              label="Reset"
            />

            <router-link class="links q-pt-lg" :to="{ name: 'LoginPage' }"
              >Login</router-link
            >

            <router-link class="links" :to="{ name: 'Home' }">Home</router-link>

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
      </div>
    </transition>
  </q-page-container>
</template>

<script>
import Modal from '../components/ResetPasswordModal.vue';
import { useQuasar } from 'quasar';
import { ref, onBeforeUnmount } from 'vue';

export default {
  name: 'ForgotPasswordPage',
  components: {
    Modal,
  },

  setup() {
    const $q = useQuasar();
    let timer;
    const email = ref(null);
    const modalActive = ref(null);
    const modalMessage = ref('');

    function closeModal() {
      modalActive.value = !modalActive.value;
      email.value = '';
    }

    function resetPassword() {
      $q.loading.show();

      // hiding in 2s
      timer = setTimeout(() => {
        $q.loading.hide();
        timer = void 0;
      }, 2000);
    }

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });

    return {
      slide: ref(1),
      autoplay: ref(true),
      closeModal,
      modalMessage,
      resetPassword,
    };
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
}
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

    p {
      margin-bottom: 40px;
    }

    h2 {
      text-align: center;
      font-size: 25px;
      font-weight: 700;
      color: #303030;
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

    .button {
      width: 200px;
    }

    .links {
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
