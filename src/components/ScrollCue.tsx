import { motion } from 'framer-motion';

export function ScrollCue() {
  return (
    <motion.div
      className="absolute bottom-8 right-8 flex items-center gap-2 text-sm text-cream/80"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <span>Scroll down and discover</span>
      <span aria-hidden>↓</span>
    </motion.div>
  );
}
