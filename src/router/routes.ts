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
          title: 'Home'
        }
      },
      {
        path: '/BlogsPage',
        name: 'BlogsPage',
        component: () => import('src/pages/BlogsPage.vue'),
        meta: {
          title: 'BlogsPage'
        }
      },
      {
        path: '/LoginPage',
        name: 'LoginPage',
        component: () => import('src/pages/LoginPage.vue'),
        meta: {
          title: 'LoginPage'
        }
      },
      {
        path: '/RegisterPage',
        name: 'RegisterPage',
        component: () => import('src/pages/RegisterPage.vue'),
        meta: {
          title: 'RegisterPage'
        }
      },
      {
        path: '/ForgotPasswordPage',
        name: 'ForgotPasswordPage',
        component: () => import('src/pages/ForgotPasswordPage.vue'),
        meta: {
          title: 'ForgotPasswordPage'
        }
      },
      {
        path: '/AdminPage',
        name: 'AdminPage',
        component: () => import('src/pages/AdminPage.vue'),
        meta: {
          title: 'AdminPage'
        }
      },
      {
        path: '/ProfilePage',
        name: 'ProfilePage',
        component: () => import('src/pages/ProfilePage.vue'),
        meta: {
          title: 'ProfilePage'
        }
      },
      {
      path: '/CreatePostPage',
      name: 'CreatePostPage',
      component: () => import('src/pages/CreatePostPage.vue'),
      meta: {
        title: 'CreatePostPage'
      }
      },
      {
        path: '/BlogPreview',
        name: 'BlogPreview',
        component: () => import('src/pages/BlogPreview.vue'),
        meta: {
          title: 'BlogPreview'
        }
      },
      {
        path: '/ViewBlogPage/:blogid',
        name: 'ViewBlogPage',
        component: () => import('src/pages/ViewBlogPage.vue'),
        meta: {
          title: 'ViewBlogPage'
        }
      },
      {
        path: '/EditBlogPage/:blogid',
        name: 'EditBlogPage',
        component: () => import('src/pages/EditBlogPage.vue'),
        meta: {
          title: 'EditBlogPage'
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
