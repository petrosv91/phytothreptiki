import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import { Logout } from '../Services/Logout';
import { withRouter } from 'react-router-dom';
import '../../styles/Navbar/Drawer.css';
import '../Services/EndProcess';
import EndProcess from '../Services/EndProcess';
import styled, { withTheme } from 'styled-components/macro';
const DrawerList = styled.div`
  height: 100%;
  width: 250px;
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  background: ${props => props.theme.secondary};
  padding: 50px 10px;
  color: ${props => props.theme.primary} !important ;
  transition: ease all 0.4s;
`;
const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
`;

const DrawerNav = ({ userName, processSession, history, state, close }) => {
  const logoutHandle = () => {
    Logout();
  };

  return (
    <Drawer
      onClick={() => {
        close();
      }}
      anchor="left"
      open={state}
    >
      <DrawerList>
        <InfoWrapper>
          {userName}
          <CloseIcon
            className="drawer-close-button"
            onClick={() => {
              close();
            }}
          />
        </InfoWrapper>
        <div
          onClick={() => {
            if (processSession) {
              console.log(processSession);
              EndProcess(
                localStorage.getItem('AuthenticationToken'),
                processSession
              );
            }
            history.push('/userpage');
          }}
          className="drawer-list-item"
        >
          Αρχική
        </div>
        <div
          onClick={() => {
            history.push('/changePassword');
          }}
          className="drawer-list-item"
        >
          Αλλαγή Κωδικού
        </div>
        <div onClick={logoutHandle} className="drawer-list-item">
          Έξοδος
        </div>
      </DrawerList>
    </Drawer>
  );
};

export default withRouter(withTheme(DrawerNav));
