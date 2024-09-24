import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'

const loginView = () => import('@/views/LoginView.vue')
const signUpView = () => import('@/views/SignUpView.vue')

// App layouts
const userLayout = () => import('@/layouts/UserLayout.vue')

// App views
const dashboardView = () => import('@/views/Dashboard/DashboardView.vue')
const profileView = () => import('@/views/Profile/ProfileView.vue')
const wizardView = () => import('@/views/Wizard/WizardView.vue')

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
    path: '/wizard',
    name: 'Wizard',
    component: wizardView,
    meta: {
      title: 'Wizard 🚀'
    }
  },
  {
    path: '/app',
    component: userLayout,
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
      }
    ]
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
