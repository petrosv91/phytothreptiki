import React from 'react';

import { motion } from 'framer-motion';

function ListAnimation({ animation, children }) {
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
      custom={animation.index}
      initial={animation.shouldAnimate ? 'hidden' : 'visible'}
      animate='visible'
      exit='removed'
    >
      {children}
    </motion.div>
  );
}

export default ListAnimation;
