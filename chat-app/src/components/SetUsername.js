import React from 'react';
import { connect } from 'react-redux';
import { setUsername } from '../actions/username';

const SetUsername = ({ setUsername }) => {
  return (
    <>
      <h3>username</h3>
      <input onChange={setUsername} />
    </>
  );
};

// const mapDispatchToProps = dispatch => {
//   return {
//     setUsername: e => dispatch(setUsername(e.target.value))
//   };
// };

export default connect(null, { setUsername: e => setUsername(e.target.value) })(
  SetUsername
);
