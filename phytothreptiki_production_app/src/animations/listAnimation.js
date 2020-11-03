import React from 'react';

import { motion } from 'framer-motion';

function ListAnimation({ index, children }) {
  return (
    <motion.div
      variants={{
        hidden: (index) => ({
          opacity: 0,
          y: -15 * index,
        }),
        visible: (index) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: index * 0.025,
          },
        }),
        removed: {
          opacity: 0,
        },
      }}
      custom={index}
      exit='removed'
      animate='visible'
      initial={'hidden'}
    >
      {children}
    </motion.div>
  );
}

export default ListAnimation;
