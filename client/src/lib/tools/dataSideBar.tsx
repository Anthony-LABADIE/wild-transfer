import {
  DocumentIcon,
  HomeIcon,
  LinkIcon,
  ServerIcon,
} from '@heroicons/react/24/outline'

type NavigationItem = {
  name: string
  href: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  current: boolean
}

export const navigation: NavigationItem[] = [
  { name: 'Tableau de bord', href: '/home', icon: HomeIcon, current: false },
  { name: 'Mes Fichiers', href: '/files', icon: DocumentIcon, current: false },
  {
    name: 'Mes liens partagés',
    href: '/share-url',
    icon: LinkIcon,
    current: true,
  },
  {
    name: 'Dossiers partagés',
    href: '/folder-share-url',
    icon: ServerIcon,
    current: true,
  },
]
