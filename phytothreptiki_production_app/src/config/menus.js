import { MdSearch, MdEdit, MdDelete } from 'react-icons/md';

export const menus = [
  {
    id: 1,
    label: 'Αναζήτηση Συνταγής',
    url: '/search',
    icon: MdSearch,
  },
  {
    id: 2,
    label: 'Νεα Συνταγή',
    url: '/recipe',
    icon: MdEdit,
  },
  {
    id: 3,
    label: 'Διαγραφή Συνταγής',
    url: '/delete',
    icon: MdDelete,
  },
];
