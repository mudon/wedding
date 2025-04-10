import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimateProps {
  children: ReactNode;
}

export const Animate: React.FC<AnimateProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }} // Start below the screen with 0 opacity
      animate={{ opacity: 1, y: 0 }}    // Animate to the normal position with full opacity
      exit={{ opacity: 0, y: 100 }}     // Animate back to the bottom with 0 opacity on exit
    >
      {React.Children.map(children, (child) => {
        // Ensure child is a valid React element before cloning
        if (React.isValidElement(child)) {
          return React.cloneElement(child);
        }
        return child;
      })}
    </motion.div>
  );
};

