import React from 'react';

import { useLocation } from 'react-router-dom';

// import { menus } from '../config/menus';

function useNavbarTitle() {
  const { pathname } = useLocation();

  const title = React.useCallback(() => {
    if (pathname === '/') return '';
    const [mainPath] = pathname.split('/').filter((item) => item !== '');
    const menuMatch = [].find((menu) => menu.url === `/${mainPath}`);
    return menuMatch?.label;
  }, [pathname]);

  return { title };
}

export default useNavbarTitle;
