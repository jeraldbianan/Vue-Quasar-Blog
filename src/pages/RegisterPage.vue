<template>
  <q-page-container>
    <transition
      appear
      enter-active-class="animated fadeIn slow"
      leave-active-class="animated fadeOut slow"
    >
      <div class="form-wrap">
        <form action="" class="register">
          <p class="login-register">
            Already have an Account?
            <router-link class="router-link" :to="{ name: 'LoginPage' }"
              >Login</router-link
            >
          </p>
          <h2>Create an Account</h2>
          <div class="inputs">
            <div class="input">
              <q-input
                ref="inputRef"
                standout
                :rules="[(val) => !!val || 'This Field is required']"
                filled
                v-model="firstName"
                label="First Name"
              >
                <template v-slot:prepend><q-icon name="fa-solid fa-user" /></template
              ></q-input>
            </div>
            <div class="input">
              <q-input
                ref="inputRef"
                standout
                :rules="[(val) => !!val || 'This Field is required']"
                filled
                v-model="lastName"
                label="Last Name"
              >
                <template v-slot:prepend><q-icon name="fa-solid fa-user" /></template
              ></q-input>
            </div>
            <div class="input">
              <q-input
                ref="inputRef"
                standout
                filled
                :rules="[(val) => !!val || 'This Field is required']"
                v-model="username"
                label="Username"
              >
                <template v-slot:prepend><q-icon name="fa-solid fa-user" /></template
              ></q-input>
            </div>
            <div class="input">
              <q-input
                standout
                filled
                :rules="[(val) => !!val || 'This Field is required', isValidEmail]"
                type="email"
                v-model="email"
                label="Email"
              >
                <template v-slot:prepend><q-icon name="mail" /></template
              ></q-input>
            </div>
            <div class="input">
              <q-input
                v-model="password"
                filled
                :rules="[(val) => !!val || 'This Field is required']"
                :type="isPwd ? 'password' : 'text'"
                hint="Minimum of 6 characters"
                label="Password"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
                <template v-slot:prepend><q-icon name="fa-solid fa-lock" /></template
              ></q-input>
            </div>
            <transition-group
              appear
              enter-active-class="animated fadeIn slow"
              leave-active-class="animated fadeOut slow"
            >
              <div v-if="error" class="error">{{ errorMsg }}</div>
              <div v-if="firebaseError" class="error">{{ firebaseError }}</div>
            </transition-group>
          </div>

          <q-btn
            @click.prevent="register"
            class="button q-mt-lg"
            unelevated
            rounded
            color="dark"
            label="Sign Up"
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
import { onUpdated, ref } from 'vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import db from '../firebase/firebaseInit';
import { useRouter } from 'vue-router';

export default {
  name: 'RegisterPage',
  components: {},

  setup() {
    const firstName = ref('');
    const lastName = ref('');
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const error = ref(null);
    const errorMsg = ref('');
    const router = useRouter();
    const firebaseError = ref(null);
    const inputRef = ref(null);

    function isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    }

    onUpdated(() => {
      console.log(error.value);
      console.log(firebaseError.value);
    });

    async function register() {
      try {
        if (
          firstName.value !== '' &&
          lastName.value !== '' &&
          username.value !== '' &&
          email.value !== '' &&
          password.value !== ''
        ) {
          error.value = false;
          errorMsg.value = '';
          const firebaseAuth = await firebase.auth();
          const createUser = await firebaseAuth.createUserWithEmailAndPassword(
            email.value,
            password.value
          );
          const result = await createUser;
          const dataBase = db.collection('users').doc(result.user.uid);
          await dataBase.set({
            firstName: firstName.value,
            lastName: lastName.value,
            username: username.value,
            email: email.value,
          });
          router.push({ name: 'Home' });
          return;
        }
        error.value = true;
        errorMsg.value = 'Please fill out all the fields';
        setTimeout(() => (error.value = false), 5000);
        console.log(error.value);
        return;
      } catch (err) {
        firebaseError.value = err.message;
        setTimeout(() => (firebaseError.value = false), 5000);
      }
    }

    return {
      slide: ref(1),
      autoplay: ref(true),
      firstName,
      lastName,
      username,
      email,
      password,
      register,
      error,
      errorMsg,
      isPwd: ref(true),
      router,
      isValidEmail,
      firebaseError,
      inputRef,
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
        margin-bottom: 10px;
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

.po-password-strength-bar {
  border-radius: 2px;
  transition: all 0.2s linear;
  height: 5px;
  margin-top: 8px;
}

.po-password-strength-bar.risky {
  background-color: #f95e68;
}

.po-password-strength-bar.guessable {
  background-color: #fb964d;
}

.po-password-strength-bar.weak {
  background-color: #fdd244;
}

.po-password-strength-bar.safe {
  background-color: #b0dc53;
}

.po-password-strength-bar.secure {
  background-color: #35cc62;
}
</style>
