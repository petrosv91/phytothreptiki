import React from 'react';

function useForceUpdate() {
  const [, setValue] = React.useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

export default useForceUpdate;
