<template>
  <transition
    appear
    enter-active-class="animated fadeIn slow"
    leave-active-class="animated fadeOut slow"
  >
    <q-page-container>
      <div class="container">
        <h4>Frameworks/Tools I used</h4>
        <div class="card-container">
          <q-card-section horizontal class="card">
            <q-card-section class="q-pt-xs">
              <div class="text-h5 q-mt-sm q-mb-xs">
                <a href="https://vuejs.org/">Vue JS</a>
              </div>
              <div class="text-caption text-grey">
                Vue.js is an open-source model–view–viewmodel front end JavaScript
                framework for building user interfaces and single-page applications. It
                was created by Evan You, and is maintained by him and the rest of the
                active core team members.
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="https://www.blogsaays.com/wp-content/uploads/2021/05/Vue-js.png"
              />
            </q-card-section>
          </q-card-section>

          <q-card-section horizontal class="card">
            <q-card-section class="q-pt-xs">
              <div class="text-h5 q-mt-sm q-mb-xs">
                <a href="https://quasar.dev/">Quasar</a>
              </div>
              <div class="text-caption text-grey">
                Quasar (pronounced /ˈkweɪ.zɑɹ/) is an MIT licensed open-source Vue.js
                based framework, which allows you as a web developer to quickly create
                responsive++ websites/apps in many flavours
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="https://cdn.quasar.dev/logo-v2/svg/logo-vertical.svg"
              />
            </q-card-section>
          </q-card-section>

          <q-card-section horizontal class="card">
            <q-card-section class="q-pt-xs">
              <div class="text-h5 q-mt-sm q-mb-xs">
                <a
                  href="https://firebase.google.com/products/auth?gclid=CjwKCAjw2OiaBhBSEiwAh2ZSPwiPx1DwqegPEWhEyYJ6xfGpmJ5DBrRVtxutcUk7JPAkk8b8yTrosRoC8SIQAvD_BwE&gclsrc=aw.ds/"
                  >Firebase Auth</a
                >
              </div>
              <div class="text-caption text-grey">
                Firebase Authentication aims to make building secure authentication
                systems easy, while improving the sign-in and onboarding experience for
                end users. It provides an end-to-end identity solution, supporting email
                and password accounts, phone auth, and Google, Twitter, Facebook, and
                GitHub login, and more.
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="https://thehackernews.com/images/-Yd2T0oBi9tI/Xrp76q7smkI/AAAAAAAAAVM/BQykhFcANu4UnGM9zWkt0dre4UpMJ5hHQCLcBGAsYHQ/w0/firebase-database.jpg"
              />
            </q-card-section>
          </q-card-section>
        </div>

        <div class="card-container">
          <q-card-section horizontal class="card">
            <q-card-section class="q-pt-xs">
              <div class="text-h5 q-mt-sm q-mb-xs">
                <a
                  href="https://firebase.google.com/products/firestore?gclid=CjwKCAjw2OiaBhBSEiwAh2ZSP6ubAyxsYw6g_oFuElQEqrgxAfGWkO8ZWU8p5VU0K__2mgnqkK6YZhoC3oMQAvD_BwE&gclsrc=aw.ds"
                  >Firebase Cloud Firestore</a
                >
              </div>
              <div class="text-caption text-grey">
                Cloud Firestore is a NoSQL document database that lets you easily store,
                sync, and query data for your mobile and web apps - at global scale.
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="https://thehackernews.com/images/-Yd2T0oBi9tI/Xrp76q7smkI/AAAAAAAAAVM/BQykhFcANu4UnGM9zWkt0dre4UpMJ5hHQCLcBGAsYHQ/w0/firebase-database.jpg"
              />
            </q-card-section>
          </q-card-section>

          <q-card-section horizontal class="card">
            <q-card-section class="q-pt-xs">
              <div class="text-h5 q-mt-sm q-mb-xs">
                <a href="https://vuex.vuejs.org/">Vuex</a>
              </div>
              <div class="text-caption text-grey">
                Vuex is a state management pattern + library for Vue.js applications. It
                serves as a centralized store for all the components in an application,
                with rules ensuring that the state can only be mutated in a predictable
                fashion.
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="https://s3.amazonaws.com/coursetro/posts/144-full.png"
              />
            </q-card-section>
          </q-card-section>

          <q-card-section horizontal class="card">
            <q-card-section class="q-pt-xs">
              <div class="text-h5 q-mt-sm q-mb-xs">
                <h6>Features</h6>
              </div>
              <div class="text-caption text-grey">
                <p>
                  Guest can use the following features: View Blogs and Register an Account
                </p>

                Users can use the following features: Login, Register, ResetPassword, View
                Blogs, Create Blogs and Edit Blogs
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="https://www.atatus.com/glossary/content/images/size/w960/2021/07/CRUD.jpeg"
              />
            </q-card-section>
          </q-card-section>
        </div>
      </div>
    </q-page-container>
  </transition>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.container {
  h4 {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    text-transform: uppercase;
    font-weight: 700;

    @media (max-width: 700px) {
      font-size: 24px;
    }
  }

  .card-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;

    @media (max-width: 700px) {
      flex-direction: column;
    }

    .card {
      max-width: 500px;
      margin: 0px 20px;
      transition: 0.5s ease-in-out all;

      &:hover {
        transform: scale(1.1);
      }

      a {
        text-decoration: none;
        text-transform: uppercase;
        color: black;
        font-weight: 600;
        font-size: 20px;

        &:hover {
          color: #3ca7af;
        }

        &:visited {
          text-decoration: none;
          text-transform: uppercase;
          color: black;
          font-weight: 600;

          &:hover {
            color: #3ca7af;
          }
        }
      }

      h6 {
        font-size: 20px;
        color: black;
        font-weight: 600;
        text-transform: uppercase;

        &:hover {
          color: #3ca7af;
        }
      }
    }
  }
}
</style>
