import type { Navigation } from '@/interfaces/Layout/LinkTypes.interface'

export const menuOptions: Navigation[] = [
  {
    name: 'Agregar marca',
    link: '#',
    icon: 'bi bi-plus-lg',
    action: () => {
      alert('aquí saldrá el hover para agregar marca')
    }
  }
]

export const menuUserOptions: Navigation[] = [
  {
    name: 'Perfil',
    icon: 'bi bi-person',
    link: '#'
  },
  {
    name: 'Términos y condiciones',
    link: 'https://bakano.ec/terminos-y-condiciones-de-uso',
    icon: 'bi bi-book'
  },
  {
    name: 'Cerrar sesión',
    icon: 'bi bi-box-arrow-left',
    link: '',
    action: () => {
      alert('cerrando sesion mi friend')
    }
  }
]

export const sidebarItems: Navigation[] = [
  { name: 'Dashboard', icon: 'bi bi-speedometer', link: '#' },
  { name: 'Planificar', icon: 'bi bi-journal-richtext', link: '#' },
  { name: 'Post', icon: 'bi bi-file-post', link: '#' }
]
