/**
|--------------------------------------------------
| Function to Create error messages using error reducer
|--------------------------------------------------
*/

const CreateError = (dispatch, message) => {
  const action = {
    value: message,
    type: 'add'
  };
  dispatch(action);
};
export default CreateError;
