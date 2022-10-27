import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | JB BLog`
    next()
  })

  Router.beforeEach(async (to, from, next) => {
    const user = firebase.auth().currentUser
    let admin = null

    if (user) {
      const token = await user.getIdTokenResult()
      admin = token.claims.admin
    }
    if(to.matched.some((res) => res.meta.requiresAuth)) {
        if(user) {
          if(to.matched.some((res) => res.meta.requiresAdmin)) {
            if(admin) {
              return next()
            }
            return next({name: 'Home'});
          }
          return next()
        }
        return next({name: 'Home'});
      }
      return next();
  })


  return Router;
});
