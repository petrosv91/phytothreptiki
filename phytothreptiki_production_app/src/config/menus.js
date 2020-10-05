import { SearchIcon, AddIcon } from '@chakra-ui/icons';

export const menus = [
  {
    id: 1,
    label: 'Αναζήτηση Συνταγής',
    url: '/search',
    icon: SearchIcon,
  },
  {
    id: 2,
    label: 'Νεα Συνταγή',
    url: '/recipe',
    icon: AddIcon,
  },
];
