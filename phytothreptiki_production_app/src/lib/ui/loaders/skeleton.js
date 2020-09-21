import React from 'react';

import { Skeleton as ChakraSkeleton } from '@chakra-ui/core';

function Skeleton({ children, loading }) {
  if (loading) return <ChakraSkeleton>{children}</ChakraSkeleton>;
  return children;
}

export default Skeleton;
