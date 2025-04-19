import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const FadeInUp = ({ children }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

export default FadeInUp;
