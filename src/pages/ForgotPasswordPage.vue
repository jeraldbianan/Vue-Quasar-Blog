<template>
  <q-page-container>
    <transition
      appear
      enter-active-class="animated fadeIn slow"
      leave-active-class="animated fadeOut slow"
    >
      <div class="reset-password">
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

            <q-dialog v-model="modalSuccess">
              <q-card style="width: 300px">
                <q-card-section>
                  <div class="text-h6">Password Reset</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  Your Password has been successfully reset
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                  <q-btn flat label="OK" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-dialog v-model="modalFailed">
              <q-card style="width: 300px">
                <q-card-section>
                  <div class="text-h6">Password Reset</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div v-if="error" class="error q-mt-md">{{ errorMsg }}</div>
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                  <q-btn flat label="OK" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>

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
              <q-carousel-slide :name="1" img-src="../assets/carousel/carousel3.jpg" />
              <q-carousel-slide :name="2" img-src="../assets/carousel/carousel2.jpg" />
              <q-carousel-slide :name="3" img-src="../assets/carousel/carousel1.jpg" />
              <q-carousel-slide :name="4" img-src="../assets/carousel/carousel4.jpg" />
            </q-carousel>
          </div>
        </div>
      </div>
    </transition>
  </q-page-container>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref, onBeforeUnmount } from 'vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  name: 'ForgotPasswordPage',
  components: {},

  setup() {
    const $q = useQuasar();
    let timer;
    const email = ref(null);
    const modalSuccess = ref(null);
    const modalFailed = ref(null);
    const errorMsg = ref('');
    const error = ref(null);

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });

    function resetPassword() {
      $q.loading.show();

      timer = setTimeout(() => {
        $q.loading.hide();
        timer = void 0;
      }, 1000);

      if (email.value !== '') {
        firebase
          .auth()
          .sendPasswordResetEmail(email.value)
          .then(() => {
            error.value = false;
            email.value = '';
            modalSuccess.value = true;
            modalFailed.value = false;
          })
          .catch((err) => {
            errorMsg.value = err.message;
            error.value = true;
            modalSuccess.value = false;
            modalFailed.value = true;
          });
      } else {
        errorMsg.value = 'Please enter the Email Address';
        error.value = true;
        modalSuccess.value = false;
        modalFailed.value = true;
      }
    }

    return {
      slide: ref(1),
      autoplay: ref(true),
      resetPassword,
      email,
      modalSuccess,
      modalFailed,
      errorMsg,
      error,
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
      text-align: center;
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
