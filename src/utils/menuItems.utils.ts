import type { Navigation } from '@/interfaces/components/Layout/LinkTypes.interface'

export const menuOptions: (props: {
  showCreateBrandModal: () => void
}) => Navigation[] = ({ showCreateBrandModal }) => [
  {
    name: 'Agregar marca',
    link: '#',
    icon: 'bi bi-plus-lg',
    action: () => {
      showCreateBrandModal()
    }
  }
]

export const menuUserOptions: Navigation[] = [
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

export const userMenuItems: Navigation[] = [
  { name: 'Dashboard', icon: 'bi bi-speedometer', link: 'dashboard' },
  // { name: 'Planificar', icon: 'bi bi-journal-richtext', link: 'planning' },
  // { name: 'Post', icon: 'bi bi-file-post', link: 'post' },
  // { name: 'Tendencias', icon: 'bi bi-bar-chart-line', link: 'trends' },
  { name: 'Marca', icon: 'bi bi-bar-chart-line', link: 'brand' },
  { name: 'Perfil', icon: 'bi bi-person', link: 'profile' }
]
