import { motion } from 'framer-motion';
import { type PropsWithChildren } from 'react';

type Props = {
  delay?: number;
  className?: string;
};

const FadeInUp = ({ children, delay = 0, className }: PropsWithChildren<Props>) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut', delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default FadeInUp;
