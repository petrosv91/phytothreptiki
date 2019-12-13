/* STEPS REDUCER  */
const stepsReducer = (state, action) => {
  switch (action.type) {
    //add step to the process
    case 'add': {
      return action.value;
    }
    case 'init': {
      return '';
    }
    default:
      return state;
  }
};
export default stepsReducer;
