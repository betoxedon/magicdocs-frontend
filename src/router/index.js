import { createRouter, createWebHistory } from 'vue-router'
import PromotionalView from '../assets/views/PromotionalView.vue'

import HomeView from '../assets/views_old/HomeView.vue'
// import LoginView from '../assets/views/LoginView.vue'
// import RegisterView from '../assets/views/RegisterView.vue'
// import DocumenView from '../assets/views/DocumentView.vue'
// import PadDetail from '../assets/views/PadDetail.vue'
// import ModelCreate from '../assets/views/ModelCreate.vue'
// import FromModelCreate from '../assets/views/FromModelCreate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Novo-Mundo-da-AdvocacIA/',
      name: 'Promotional',
      component: PromotionalView
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView
    }
  ]
})

export default router
