import { createStore } from 'vuex'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import db from '../firebase/firebaseInit';

export default createStore({
  state: {
    sampleBlogCards: [
      {
        blogTitle: 'Mountain View',
        blogCoverPhoto: 'stock-1',
        blogDate: 'June 7, 2022',
      },
      {
        blogTitle: 'Dark Woods',
        blogCoverPhoto: 'stock-2',
        blogDate: 'June 15, 2022',
      },
      {
        blogTitle: 'Sunrise in the Forest',
        blogCoverPhoto: 'stock-3',
        blogDate: 'July 4, 2022',
      },
      {
        blogTitle: 'Surfing the Waves',
        blogCoverPhoto: 'stock-4',
        blogDate: 'August 1, 2022',
      },
    ],
    blogHTML: 'Write your blog title here',
    blogTitle: '',
    blogPhotoName: '',
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: false,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload
    },
    updateUser(state, payload){
      state.user = payload
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUserName = doc.data().username
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join('') +
        state.profileLastName.match(/(\b\S)?/g).join('')
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload
    },
    changeLastName(state, payload) {
      state.profileLastName = payload
    },
    changeUserName(state, payload) {
      state.profileUserName = payload
    }
  },
  actions: {
    async getCurrentUser({commit}) {
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
      const dbResults = await dataBase.get();

      commit('setProfileInfo', dbResults)
      commit('setProfileInitials')
      console.log(dbResults)
    },
    async updateUserSettings({commit, state}) {
      const dataBase = await db.collection('users').doc(state.profileId)
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUserName,
      })
      commit('setProfileInitials')
    }
  },
  modules: {
  }
})
