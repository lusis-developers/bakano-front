import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'

const LoginView = () => import('@/views/LoginView.vue')
const SignUpView = () => import('@/views/SignUpView.vue')
const userView = () => import('@/views/User/index.vue');

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
