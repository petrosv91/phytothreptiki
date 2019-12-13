import React, { useState, useEffect, useContext } from 'react';
import NavbarComponent from '../components/Navbar/NavbarComponent';
import '../styles/changePassword/changePassword.css';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import { ErrorContext } from '../components/Context/ErrorProvider';
import CreateError from '../helpers/CreateError';
import { Url } from '../components/Services/Api';
export default function ChangePassword() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const { Mdispatch } = useContext(ErrorContext);
  const formSubmit = async e => {
    try {
      e.preventDefault();
      if (
        password.trim().length === 0 ||
        confirmedPassword.trim().length === 0
      ) {
        CreateError(Mdispatch, 'Συμπλήρωσε όλα τα πεδία');
        return;
      }
      if (password !== confirmedPassword) {
        CreateError(Mdispatch, 'Οι κωδικοί δεν ταιριάζουν');
        return;
      }
      const reqObj = {
        AuthenticationToken: localStorage.getItem('AuthenticationToken'),
        UserName: localStorage.getItem('UserName'),
        OldPassword: oldPassword,
        Password: password,
        DeviceInfo: 'Lefteris'
      };
      const result = await Axios.post(Url + 'ChangePassword', reqObj);
      const data = result.data;
      if (data) {
        localStorage.clear();
        window.location.href = '/';
      } else {
        CreateError(Mdispatch, 'Πρόβλημα Server');
      }
    } catch (error) {
      console.log(error);
      CreateError(Mdispatch, 'Πρόβλημα server');
    }
  };
  useEffect(() => {
    setUsername(localStorage.getItem('UserName'));
  }, []);
  return (
    <div className="change-password-container">
      <div className="change-password-navbar">
        <NavbarComponent UserName={username} />
      </div>
      <form
        onSubmit={formSubmit}
        className="change-password-form-container"
        autoComplete="new-password"
      >
        <div className="change-password-form">
          <LockIcon style={{ margin: 12, color: '#c04848', fontSize: 50 }} />
          <div className="change-password-form-title">Αλλαγή Κωδικού</div>
          <input
            onChange={e => {
              setOldPassword(e.target.value);
            }}
            value={oldPassword}
            type="password"
            placeholder="Παλιός Κωδικός"
            autoComplete="none"
          />
          <input
            onChange={e => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            placeholder="Νέος Κωδικός"
            autoComplete="none"
          />
          <input
            onChange={e => {
              setConfirmedPassword(e.target.value);
            }}
            value={confirmedPassword}
            type="password"
            placeholder="Επιβεβαίωση κωδικού"
            autoComplete="none"
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{
              backgroundColor: '#c04848',
              marginTop: 5,
              width: '300px',
              height: '50px'
            }}
          >
            Αλλαγη Κωδικου
          </Button>
        </div>
      </form>
    </div>
  );
}
