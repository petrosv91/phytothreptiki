/* USER PAGE DISPLAYS INFORMATION ABOUT USER MENU OPTIONS AND ACTIONS */
import React, { useEffect, useState, useContext } from 'react';
import NavbarComponent from '../components/Navbar/NavbarComponent';
import '../styles/UserPage/UserPage.css';
import { withTheme } from 'styled-components/macro';
import Menu from '../components/Menu/Menu';
import { StepsContext } from '../components/Context/StepsProvider';
import MenuContainer from '../components/shared/MenuContainer';
const UserPage = props => {
  const { dispatch } = useContext(StepsContext);
  const [UserName, setUsername] = useState('');
  //set current usename
  useEffect(() => {
    setUsername(localStorage.getItem('UserName'));
    localStorage.removeItem('title');
    //init path
    dispatch({ type: 'init' });
  }, [dispatch, UserName]);

  return (
    <MenuContainer>
      <div>
        <NavbarComponent
          title="ΕΡΓΑΣΙΕΣ"
          backgroundColor={props.theme.primary}
          submenu={false}
          UserName={UserName}
          processSession={''}
          userName={UserName}
        />
      </div>
      <div style={{ height: '90%' }}>
        <Menu type="menu" />
      </div>
    </MenuContainer>
  );
};

export default withTheme(UserPage);
