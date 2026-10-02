'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-electric-iris via-saffron-spark to-deep-verdant z-50 origin-left shadow-[0_0_12px_rgba(128,82,255,0.8)]"
      style={{ scaleX }}
    />
  );
}
