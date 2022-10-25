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
        path: '/BlogsPage',
        name: 'BlogsPage',
        component: () => import('src/pages/BlogsPage.vue'),
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
        path: '/AdminPage',
        name: 'AdminPage',
        component: () => import('src/pages/AdminPage.vue'),
      },
      {
        path: '/ProfilePage',
        name: 'ProfilePage',
        component: () => import('src/pages/ProfilePage.vue'),
      },
      {
      path: '/CreatePostPage',
      name: 'CreatePostPage',
      component: () => import('src/pages/CreatePostPage.vue'),
      },
      {
        path: '/:catchAll(.*)*',
        component: () => import('src/pages/Error404Page.vue'),
      },
    ],
  },


];

export default routes;
