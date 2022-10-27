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
        meta: {
          title: 'Home',
          requiresAuth: false
        }
      },
      {
        path: '/BlogsPage',
        name: 'BlogsPage',
        component: () => import('src/pages/BlogsPage.vue'),
        meta: {
          title: 'BlogsPage',
          requiresAuth: false
        }
      },
      {
        path: '/LoginPage',
        name: 'LoginPage',
        component: () => import('src/pages/LoginPage.vue'),
        meta: {
          title: 'LoginPage',
          requiresAuth: false
        }
      },
      {
        path: '/RegisterPage',
        name: 'RegisterPage',
        component: () => import('src/pages/RegisterPage.vue'),
        meta: {
          title: 'RegisterPage',
          requiresAuth: false
        }
      },
      {
        path: '/ForgotPasswordPage',
        name: 'ForgotPasswordPage',
        component: () => import('src/pages/ForgotPasswordPage.vue'),
        meta: {
          title: 'ForgotPasswordPage',
          requiresAuth: false
        }
      },
      {
        path: '/AdminPage',
        name: 'AdminPage',
        component: () => import('src/pages/AdminPage.vue'),
        meta: {
          title: 'AdminPage',
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
        path: '/ProfilePage',
        name: 'ProfilePage',
        component: () => import('src/pages/ProfilePage.vue'),
        meta: {
          title: 'ProfilePage',
          requiresAuth: true
        }
      },
      {
      path: '/CreatePostPage',
      name: 'CreatePostPage',
      component: () => import('src/pages/CreatePostPage.vue'),
      meta: {
        title: 'CreatePostPage',
        requiresAuth: true
      }
      },
      {
        path: '/BlogPreview',
        name: 'BlogPreview',
        component: () => import('src/pages/BlogPreview.vue'),
        meta: {
          title: 'BlogPreview',
          requiresAuth: true
        }
      },
      {
        path: '/ViewBlogPage/:blogid',
        name: 'ViewBlogPage',
        component: () => import('src/pages/ViewBlogPage.vue'),
        meta: {
          title: 'ViewBlogPage',
          requiresAuth: false
        }
      },
      {
        path: '/EditBlogPage/:blogid',
        name: 'EditBlogPage',
        component: () => import('src/pages/EditBlogPage.vue'),
        meta: {
          title: 'EditBlogPage',
          requiresAuth: true
        }
      },

      {
        path: '/:catchAll(.*)*',
        component: () => import('src/pages/Error404Page.vue'),
        meta: {
          title: 'Error404Page'
        }
      },
    ],
  },
];


export default routes;
