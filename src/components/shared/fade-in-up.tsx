import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

const FadeInUp = ({ children }: PropsWithChildren) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

export default FadeInUp;
