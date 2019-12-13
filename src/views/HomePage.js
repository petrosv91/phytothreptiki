/* HOMEPAGE PAGE->USER LOGIN PAGE  */
import React, { useState, useContext } from 'react';
import styled from 'styled-components/macro';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { ErrorContext } from '../components/Context/ErrorProvider';
import { FaUserCircle } from 'react-icons/fa';
import { FaKey } from 'react-icons/fa';
import { Url } from '../components/Services/Api';
import Loading from '../components/Buttons/Loading';
import '../helpers/CreateError';
import createError from '../helpers/CreateError';
import Paginate from '../components/Paginate/Paginate';
import usePaginate from '../hooks/usePaginate';
import TextInput from '../components/shared/TextInput';
import Button from '../components/shared/Button';
import StyledListItem from '../components/Lists/StyledListItem';
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;
const WarehouseWrapper = styled(Wrapper)`
  align-items: center;
  padding: 20px;
  position: relative;
  justify-content: flex-start;
  min-height: 450px;
`;
const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 0.7;
  padding: 50px;
  width: 100%;
`;
const LogoContainer = styled.div`
  flex: 0.3;
  width: 100%;
`;
const IconLabel = styled.div`
  position: absolute;
  top: 37px;
  padding-left: 10px;
  z-index: 2;
  color: ${props => props.theme.primary};
`;
const PasswordLabel = styled.div`
  font-size: 10px;
  cursor: pointer;
  margin-bottom: 6px;
`;
const HomePage = function(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toggleWarehouse, setToggleWarehouse] = useState(false);
  const { Mdispatch } = useContext(ErrorContext);
  const [warehouseData, setWarehouseData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const { page, numberOfPages, changePage, currentPage } = usePaginate({
    data: warehouseData,
    value: '',
    dFields: []
  });
  const setWarehouse = async item => {
    const result = await axios.post(Url + 'SetUserStore', {
      authenticationToken: userInfo.authToken,
      userStore: item.Id
    });
    const response = result.data.SetUserStoreResult;
    if (response.Success) {
      localStorage.setItem('AuthenticationToken', userInfo.authToken);
      localStorage.setItem('UserName', username);
      localStorage.setItem('MenuStructure', JSON.stringify(userInfo.menu));
      window.location.href = '/userpage';
    } else {
      createError(Mdispatch, response.Messages);
      setWarehouseData([]);
      setToggleWarehouse(!toggleWarehouse);
    }
  };

  // handle username change
  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };
  //handle password change
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  const handleLoginFormSubmit = event => {
    let timeout;
    timeout = window.setTimeout(function() {
      setLoading(true);
    }, 500);
    event.preventDefault();
    // post request to backend
    //if username or password is empty then return
    if (!username.trim() || !password.trim()) {
      createError(Mdispatch, 'Συμπλήρωσε όλα τα πεδία');
      window.clearTimeout(timeout);
      setLoading(false);
      return;
    }

    axios
      .post(Url + 'Login', {
        UserName: username,
        Password: password,
        DeviceInfo: 'Lefteris'
      })
      .then(response => {
        window.clearTimeout(timeout);
        setLoading(false);
        //get data from response
        const data = response.data;
        //if LoginStatus is 0 wrong credentials
        if (data.LoginStatus === 0) {
          createError(Mdispatch, data.Messages);
        }
        // if login status ==1 or login status ==2
        else if (data.LoginStatus === 1 || data.LoginStatus === 2) {
          /**
          |--------------------------------------------------
          | if only one warehouse ,user continues to menu or if login status ==2 
          | then user needs to change password
          |--------------------------------------------------
          */
          if (data.WmsStoresList.length === 1 || data.LoginStatus === 2) {
            localStorage.setItem(
              'AuthenticationToken',
              data.AuthenticationToken
            );
            localStorage.setItem('UserName', username);
            localStorage.setItem(
              'MenuStructure',
              JSON.stringify(data.MenuStructure)
            );
            localStorage.setItem('LoginStatus', data.LoginStatus);
            window.location.href = '/userpage';
            return;
          }
          setUserInfo({
            menu: data.MenuStructure,
            authToken: data.AuthenticationToken,
            username: username
          });
          setWarehouseData(data.WmsStoresList);
          setToggleWarehouse(!toggleWarehouse);
        } else {
          createError(Mdispatch, data.Messages);
        }
      })
      .catch(error => {
        window.clearTimeout(timeout);
        setLoading(false);
        console.log(error);
        createError(Mdispatch, 'Πρόβλημα Server');
        props.history.push('/');
      });
  };
  if (loading) return <Loading />;
  if (toggleWarehouse)
    return (
      <WarehouseWrapper>
        <h2>Διάλεξε αποθήκη</h2>
        {page.map(item => {
          return (
            <StyledListItem
              onClick={() => {
                setWarehouse(item);
              }}
              key={item.Id}
            >
              {item.Name}
            </StyledListItem>
          );
        })}
        <Paginate
          handleClick={changePage}
          numberOfPages={numberOfPages}
          activePage={currentPage}
        />
      </WarehouseWrapper>
    );
  else
    return (
      <Wrapper>
        <LoginContainer>
          <form onSubmit={handleLoginFormSubmit}>
            <Wrapper>
              <IconLabel>
                <FaUserCircle />
              </IconLabel>
              Όνομα Χρήστη
              <TextInput
                autocomplete="off"
                value={username}
                name="username"
                type="text"
                placeholder="Όνομα χρήστη..."
                onChange={handleUsernameChange}
              />
            </Wrapper>
            <Wrapper>
              Κωδικός
              <IconLabel>
                <FaKey />
              </IconLabel>
              <TextInput
                name="password"
                value={password}
                type="password"
                placeholder="Κωδικός..."
                onChange={handlePasswordChange}
              />
              <PasswordLabel>Ξέχασες τον κωδικό;</PasswordLabel>
            </Wrapper>
            <Button type="submit">Συνδεση</Button>
          </form>
        </LoginContainer>
        <LogoContainer></LogoContainer>
      </Wrapper>
    );
};
export default withRouter(HomePage);
