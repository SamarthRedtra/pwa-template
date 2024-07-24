import { createRouter, createWebHistory } from 'vue-router';
import { session } from './data/session';
import { userResource } from '@/data/user';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: () => import('@/pages/ForgetPassword.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/pages/SignUp.vue'),
  },
  {
    path: '/',
    name: 'Form',
    component: () => import('@/pages/Form.vue'),
  },
];

const router = createRouter({
  history: createWebHistory('/pwa'),
  routes,
});

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn;
  try {
    await userResource.promise;
  } catch (error) {
    isLoggedIn = false;
  }

  if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Home' });
  } else if (to.name === 'ForgetPassword' || to.name === 'Login' || to.name === 'SignUp' || isLoggedIn) {
    next();
  } else {
    next({ name: 'Login' });
  }
});

export default router;
