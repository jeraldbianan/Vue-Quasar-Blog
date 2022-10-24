import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('src/pages/HomePage.vue'),
      },
      {
        path: '/BlogsView',
        name: 'BlogsView',
        component: () => import('src/pages/BlogsView.vue'),
      },
      {
        path: '/LoginPage',
        name: 'LoginPage',
        component: () => import('src/pages/LoginPage.vue'),
      },
      {
        path: '/RegisterPage',
        name: 'RegisterPage',
        component: () => import('src/pages/RegisterPage.vue'),
      },
      {
        path: '/ForgotPasswordPage',
        name: 'ForgotPasswordPage',
        component: () => import('src/pages/ForgotPasswordPage.vue'),
      },
      {
        path: '/AdminView',
        name: 'AdminView',
        component: () => import('src/pages/AdminView.vue'),
      },
      {
        path: '/ProfileView',
        name: 'ProfileView',
        component: () => import('src/pages/ProfileView.vue'),
      },
      {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
      },
    ],
  },


];

export default routes;
