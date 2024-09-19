import type { Navigation } from '@/interfaces/Layout/LinkTypes.interface'

export const menuOptions: Navigation[] = [
  {
    name: 'Agregar marca',
    link: '#',
    icon: 'bi bi-plus-lg'
  }
]

export const sidebarItems: Navigation[] = [
  { name: 'Resumen', icon: 'bi bi-card-checklist', link: '#' },
  { name: 'Generar planificación', icon: 'bi bi-journal-richtext', link: '#' },
  { name: 'Generar post específico', icon: 'bi bi-file-post', link: '#' }
]
