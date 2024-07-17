import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/Login.vue';
import ForgetPassword from '@/pages/ForgetPassword.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: ForgetPassword,
  },
];

const router = createRouter({
  history: createWebHistory('/frontend'),
  routes,
});

export default router;
