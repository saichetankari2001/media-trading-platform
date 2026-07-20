import { type RefObject } from 'react';
import { useScroll, type MotionValue } from 'framer-motion';

export function useScrollProgress(targetRef: RefObject<HTMLElement>): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });
  return scrollYProgress;
}
