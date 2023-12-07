import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../assets/views/homeView.vue'
import LoginView from '../assets/views/LoginView.vue'
import RegisterView from '../assets/views/RegisterView.vue'
import DocumenView from '../assets/views/DocumentView.vue'

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
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/mydocuments',
      name: 'MyDocuments',
      component: DocumenView
    }
  ]
})

export default router
