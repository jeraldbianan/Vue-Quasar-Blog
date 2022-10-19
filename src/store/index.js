import { createStore } from 'vuex'

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
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
