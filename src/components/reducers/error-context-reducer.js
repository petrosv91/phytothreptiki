/* ERROR REDUCER */
const errorReducer = (state, action) => {
  switch (action.type) {
    //case adding product
    case 'add': {
      return action.value;
    }
    case 'clear': {
      return '';
    }
    //default case
    default:
      return state;
  }
};
export default errorReducer;
