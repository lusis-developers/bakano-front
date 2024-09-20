import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'

const loginView = () => import('@/views/LoginView.vue')
const signUpView = () => import('@/views/SignUpView.vue')
const userView = () => import('@/views/User/UserView.vue')

function isLoggedIn(): boolean {
  return true
}

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: loginView,
    meta: {
      title: 'Inicia Sesión 🚀'
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: signUpView,
    meta: {
      title: 'Regístrate 🚀'
    }
  },
  {
    path: '/app',
    component: userView,
    beforeEnter: (
      _to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (isLoggedIn()) {
        next()
      } else {
        next('/login')
      }
    },
    meta: {
      title: 'Bakano 🚀'
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
