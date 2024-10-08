import type { Navigation } from '@/interfaces/components/Layout/LinkTypes.interface'

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

export const getSidebarItems = (hasBrandSelected: boolean): Navigation[] => {
  const sidebarItems: Navigation[] = [
    { name: 'Dashboard', icon: 'bi bi-speedometer', link: 'dashboard' },
    { name: 'Planificar', icon: 'bi bi-journal-richtext', link: 'planning' },
    { name: 'Post', icon: 'bi bi-file-post', link: 'post' },
    { name: 'Tendencias', icon: 'bi bi-bar-chart-line', link: 'trends' },
    { name: 'Perfil', icon: 'bi bi-person', link: 'profile' }
  ]

  if (hasBrandSelected) {
    sidebarItems.push({
      name: 'Editar marca',
      icon: 'bi bi-gear-wide-connected',
      link: 'brand'
    })
  }

  return sidebarItems
}
