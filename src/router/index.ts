import { createRouter, createWebHistory } from 'vue-router'

const LoginView = () => import('@/views/LoginView.vue')
const SignUpView = () => import('@/views/SignUpView.vue')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      title: 'Inicia Sesión 🚀'
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUpView,
    meta: {
      title: 'Regístrate 🚀'
    }
  },
  {
    path: '/wizard',
    name: 'Wizard',
    component: () => import('@/views/wizard/Index.vue'),
    meta: {
      title: 'Primeros pasos 🚀'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  document.title = to.meta.title as string
})

export default router
