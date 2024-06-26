import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/LogoutView.vue'
import PerfilView from '../views/PerfilView.vue'
import ClientsView from '../views/ClientsView.vue'
import ClientPageView from '../views/ClientPageView.vue'
import ClientFormView from '../views/ClientFormView.vue'
import DocumentView from '../views/DocumentView.vue'
import DocumentListView from '../views/DocumentListView.vue'
import HomeView from '../assets/views_old/HomeView.vue'
import TemplateView from '../views/TemplateView.vue'
import DocumentModelCreate from '../views/DocumentModelCreate.vue'
import DocumentFromModelCreate from '../views/DocumentFromModelCreate.vue'
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
      path: '/entrar',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/logout',
      name: 'Logout',
      component: LogoutView
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: PerfilView
    },
    {
      path: '/clients',
      name: 'Clientes',
      component: ClientsView
    },
    {
      path: '/client/',
      name: 'ClientPage',
      component: ClientPageView
    },
    {
      path: '/clientForm/',
      name: 'clientForm',
      component: ClientFormView
    },
    {
      path: '/document/',
      name: 'DocumentView',
      component: DocumentView
    },
    {
      path: '/documentsList/',
      name: 'Documentos',
      component: DocumentListView
    },
    {
      path: '/modelos/',
      name: 'Modelos',
      component: TemplateView
    },
    {
      path: '/criar-modelo/',
      name: 'NovoModelo',
      component: DocumentModelCreate
    },
    {
      path: '/editar-modelo/',
      name: 'EditarModelo',
      component: DocumentModelCreate
    },
    {
      path: '/criar-documento/',
      name: 'NovoDocumento',
      component: DocumentFromModelCreate
    }
  ]
})

export default router
