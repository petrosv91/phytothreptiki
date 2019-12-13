import React from 'react';
import '../../styles/ProductControl/productcontrol.css';

const CloseRecieptButton = ({ handleClick }) => {
  return (
    <div onClick={handleClick} className="close-reciept-button">
      ΚΛΕΙΣΙΜΟ
    </div>
  );
};

export default CloseRecieptButton;
