import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled, { withTheme } from 'styled-components/macro';
import HamburgerIcon from '../shared/icons/HambugerIcon';
import HomeIconStyled from '../shared/icons/HomeIconStyled';
import DrawerNav from './DrawerNav';
const Title = styled.h2`
  display: block;
`;
const NavbarContainer = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0px 20px;
`;
function NavbarComponent({ userName, processSession, title, backgroundColor }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuRedirect = () => {
    window.location.href = '/userpage';
  };
  return (
    <NavbarContainer style={{ backgroundColor: backgroundColor }}>
      <HomeIconStyled
        onClick={menuRedirect}
        style={{ color: backgroundColor }}
      />
      <Title>{title}</Title>

      <DrawerNav
        userName={userName}
        processSession={processSession}
        close={toggleDrawer}
        state={drawerOpen}
      />
      <HamburgerIcon
        onClick={toggleDrawer}
        style={{ color: backgroundColor }}
      />
    </NavbarContainer>
  );
}

export default withRouter(withTheme(NavbarComponent));

// /* NAVBAR COMPONENT */
// import React, { Component } from 'react';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import HomeIcon from '@material-ui/icons/Home';
// import { Logout } from '../Services/Logout';
// import {
//   MDBNavbar,
//   MDBNavbarBrand,
//   MDBNavbarNav,
//   MDBNavItem,
//   MDBNavLink,
//   MDBNavbarToggler,
//   MDBCollapse,
//   MDBBtn,
//   MDBDropdown,
//   MDBDropdownToggle,
//   MDBDropdownMenu,
//   MDBDropdownItem
// } from 'mdbreact';
// import '../../styles/Navbar/Navbar.css';
// class NavbarComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isOpen: false
//     };
//   }
//   changePasswordRedirect = () => {
//     this.props.history.push('/changePassword');
//   };
//   menuRedirect = () => {
//     window.location.href = '/userpage';
//   };
//   logoutHandle = e => {
//     e.preventDefault();
//     Logout();
//   };
//   toggleCollapse = () => {
//     this.setState({ isOpen: !this.state.isOpen });
//   };

//   render() {
//     return (
//       <MDBNavbar
//         style={{ height: '100%' }}
//         color="special-color"
//         dark
//         expand="xs"
//       >
//         <MDBNavbarBrand>
//           <strong className="white-text">StartWms</strong>
//         </MDBNavbarBrand>

//         <MDBNavbarToggler onClick={this.toggleCollapse} />
//         <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
//           <MDBNavbarNav left>
//             <MDBNavItem
//               style={{ margin: 'auto', fontSize: 18, fontWeight: 500 }}
//             >
//               <MDBDropdown>
//                 <MDBDropdownToggle nav caret>
//                   <AccountCircleIcon style={{ marginRight: 5 }} />
//                   <span>{this.props.UserName}</span>
//                 </MDBDropdownToggle>
//                 <MDBDropdownMenu>
//                   <MDBDropdownItem
//                     onClick={this.changePasswordRedirect}
//                     href="#!"
//                   >
//                     Αλλαγή Κωδικού
//                   </MDBDropdownItem>
//                 </MDBDropdownMenu>
//               </MDBDropdown>
//             </MDBNavItem>
//             <MDBNavItem onClick={this.menuRedirect}>
//               <MDBNavLink to="/userpage">
//                 <HomeIcon style={{ margin: 5, marginBottom: 6 }} />
//               </MDBNavLink>
//             </MDBNavItem>
//           </MDBNavbarNav>
//           <MDBNavbarNav right>
//             <MDBNavItem>
//               <ExitToAppIcon
//                 style={{
//                   cursor: 'pointer',
//                   marginRight: 5,
//                   color: 'white',
//                   fontSize: 30
//                 }}
//                 onClick={this.logoutHandle}
//               />
//               {/* <MDBBtn size="large" onClick={this.logoutHandle} color="pink">
//                   <div style={{ fontSize: 15 }}>ΑΠΟΣΥΝΔΕΣΗ</div>
//                 </MDBBtn> */}
//             </MDBNavItem>
//             {this.props.submenu && (
//               <MDBNavItem>
//                 <MDBBtn size="large" onClick={this.menuRedirect} color="indigo">
//                   <div style={{ fontSize: 15 }}>Menu</div>
//                 </MDBBtn>
//               </MDBNavItem>
//             )}
//           </MDBNavbarNav>
//         </MDBCollapse>
//       </MDBNavbar>
//     );
//   }
// }

// export default withRouter(NavbarComponent);
