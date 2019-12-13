import React, { memo } from 'react';

const StepsInformationMenu = memo(function StepsInformation({ steps }) {
  return (
    <div className="user-information-container">
      <div className="position-label-text">{steps}</div>
    </div>
  );
});

export default StepsInformationMenu;
