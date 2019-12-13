/**
|--------------------------------------------------
| Notification Component 
|--------------------------------------------------
*/
import React, { useEffect, useContext } from 'react';
import { Message } from 'semantic-ui-react';
import { ErrorContext } from '../Context/ErrorProvider';
import '../../styles/Notification/Notification.css';
import CloseIcon from '@material-ui/icons/Close';
const Notification = () => {
  const { message, Mdispatch } = useContext(ErrorContext);

  //function to handle X button
  const handleClick = () => {
    const action = {
      type: 'clear'
    };
    //dispatch the clear action
    Mdispatch(action);
  };
  //every time you get a message from ErrorContext
  useEffect(() => {
    //clear the previous message
    const clear = () => {
      const action = {
        type: 'clear'
      };
      Mdispatch(action);
    };
    //after 4 seconds clear the message
    let timeout = setTimeout(clear, 3000);
    return () => {
      //clear timeout
      clearTimeout(timeout);
    };
  }, [message, Mdispatch]);
  return (
    <div className={message ? 'error-wrapper-open' : 'error-wrapper'}>
      <Message className="message">
        <CloseIcon
          onClick={handleClick}
          fontSize="large"
          className="message-icon"
        />
        <div className="error-content">
          <div className="message-string">{message}</div>
        </div>
      </Message>
    </div>
  );
};

export default Notification;
