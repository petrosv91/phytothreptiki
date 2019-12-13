import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 30,
        color: 'white',
        height: '100%'
      }}
    >
      <div style={{ paddingBottom: 20, paddingTop: 180 }}>
        Παρακαλώ περιμένετε...
      </div>
      <CircularProgress color="secondary" />
    </div>
  );
};

export default Loading;
