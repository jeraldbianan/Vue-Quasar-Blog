<template>
  <q-page-container>
    <div class="profile">
      <div class="container">
        <h2>Account Settings</h2>
        <div class="profile-info">
          <div class="initials">
            <q-avatar size="72px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </div>
          <div class="admin-badge">
            <i class="fa-solid fa-lock fa-lg"></i>
            <span>Admin</span>
          </div>
          <div class="input">
            <q-input v-model="firstName" label="First Name" />
          </div>
          <div class="input">
            <q-input v-model="lastName" label="Last Name" />
          </div>
          <div class="input">
            <q-input v-model="username" label="Username" />
          </div>
          <div class="input">
            <q-input disable v-model="email" label="Email Address" />
          </div>
          <q-btn
            @click="updateProfile"
            color="dark"
            text-color="white"
            label="Save Changes"
          />

          <q-dialog v-model="modalSuccess">
            <q-card style="width: 300px">
              <q-card-section>
                <div class="text-h6">Account Settings</div>
              </q-card-section>

              <q-card-section class="q-pt-none"> Changes were saved </q-card-section>

              <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="OK" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog v-model="modalFailed">
            <q-card style="width: 300px">
              <q-card-section>
                <div class="text-h6">Account Settings</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div v-if="error" class="error q-mt-md">{{ errorMsg }}</div>
              </q-card-section>

              <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="OK" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
  </q-page-container>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import { onBeforeUnmount } from 'vue';
export default {
  name: 'ProfilePage',
  setup() {
    const $q = useQuasar();
    let timer;
    const store = useStore();
    const error = ref(null);
    const errorMsg = ref('');
    const modalSuccess = ref(null);
    const modalFailed = ref(null);

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });

    const firstName = computed({
      get() {
        return store.state.profileFirstName;
      },
      set(payload) {
        store.commit('changeFirstName', payload);
      },
    });

    const lastName = computed({
      get() {
        return store.state.profileLastName;
      },
      set(payload) {
        store.commit('changeLastName', payload);
      },
    });

    const username = computed({
      get() {
        return store.state.profileUserName;
      },
      set(payload) {
        store.commit('changeUserName', payload);
      },
    });

    const email = computed(() => {
      return store.state.profileEmail;
    });

    function updateProfile() {
      $q.loading.show();

      timer = setTimeout(() => {
        $q.loading.hide();
        timer = void 0;
      }, 500);

      if (firstName.value !== '' && lastName.value !== '' && username.value !== '') {
        error.value = false;
        errorMsg.value = '';
        modalSuccess.value = true;
        modalFailed.value = false;

        store.dispatch('updateUserSettings');
      } else {
        error.value = true;
        errorMsg.value = 'Please Fill Out all Fields';
        modalSuccess.value = false;
        modalFailed.value = true;
      }
    }

    return {
      store,
      firstName,
      lastName,
      username,
      email,
      updateProfile,
      error,
      errorMsg,
      modalSuccess,
      modalFailed,
    };
  },
};
</script>

<style lang="scss" scoped>
.profile {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .profile-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        display: flex;
        align-self: center;
      }

      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #303030;
        margin: 16px 0;
        text-align: center;
        align-items: center;
        text-transform: uppercase;

        span {
          margin-left: 8px;
        }
      }

      .input {
        margin: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }

        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
