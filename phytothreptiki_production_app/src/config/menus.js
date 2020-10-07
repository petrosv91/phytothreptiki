import { SearchIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

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
    icon: EditIcon,
  },
  {
    id: 3,
    label: 'Διαγραφή Συνταγής',
    url: '/delete',
    icon: DeleteIcon,
  },
];
