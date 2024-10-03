import { createRouter, createWebHistory } from 'vue-router'
import { checkTokenValidity } from './utils/checkToken'

const loginView = () => import('@/views/LoginView.vue')
const signUpView = () => import('@/views/SignUpView.vue')

// App layouts
const userLayout = () => import('@/layouts/UserLayout.vue')

// App views
const dashboardView = () => import('@/views/Dashboard/DashboardView.vue')
const profileView = () => import('@/views/Profile/ProfileView.vue')
const wizardView = () => import('@/views/Wizard/WizardView.vue')
const authView = () => import('@/views/AuthView.vue')
const temporaView = () => import('@/views/TemporalView.vue')
const facebookView = () => import('@/views/FacebookView.vue')

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
    path: '/wizard',
    name: 'Wizard',
    component: wizardView,
    meta: {
      title: 'Wizard 🚀'
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: authView,
    meta: {
      title: 'Autenticando 🚀'
    }
  },
  {
    path: '/auth/facebook/callback',
    name: 'Auth Facebook',
    component: facebookView,
    meta: {
      title: 'Autenticando 🚀'
    }
  },
  {
    path: '/app',
    component: userLayout,
    meta: {
      title: 'Tu agencia digital 🚀'
    },
    children: [
      {
        path: '',
        redirect: '/app/dashboard'
      },
      {
        path: 'dashboard',
        component: dashboardView,
        name: 'Dashboard',
        meta: {
          title: 'Bakano 🚀'
        }
      },
      {
        path: 'planning',
        component: dashboardView,
        meta: {
          title: 'Bakano 🚀'
        }
      },
      {
        path: 'post',
        component: dashboardView,
        meta: {
          title: 'Bakano 🚀'
        }
      },
      {
        path: 'trends',
        component: dashboardView,
        meta: {
          title: 'Bakano 🚀'
        }
      },
      {
        path: 'profile',
        component: profileView,
        meta: {
          title: 'Bakano 🚀 | Perfil'
        }
      },
      {
        path: 'social-login',
        component: temporaView,
        meta: {
          title: 'Bakano 🚀 | Perfil'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _from, next) => {
  document.title = to.meta.title as string

  if (to.path.startsWith('/app')) {
    const tokenIsValid = await checkTokenValidity()

    if (!tokenIsValid) {
      return next({ name: 'Login' })
    }
  }

  next()
})

export default router
