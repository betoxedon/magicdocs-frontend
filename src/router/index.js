import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../assets/views/HomeView.vue'

import LoginView from '../assets/views/LoginView.vue'
import RegisterView from '../assets/views/RegisterView.vue'
import DocumenView from '../assets/views/DocumentView.vue'
import PadDetail from '../assets/views/PadDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/mydocuments',
      name: 'Documents',
      component: DocumenView
    },
    {
      path: '/pad',
      name: 'PadDetail',
      component: PadDetail
    }

  ]
})

export default router
