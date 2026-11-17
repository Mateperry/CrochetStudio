import { motion, useReducedMotion } from 'motion/react';
import { buttonClasses } from '../../components/ui/classes';

/**
 * Home hero: soft decorative blobs behind the content (so the glass navigation reads as glass),
 * display title, subtitle and a button that scrolls to the first section.
 */
export default function Hero({ targetId }) {
  const reduceMotion = useReducedMotion();
  const enter = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: 'easeOut' },
        };

  return (
    <section className="relative -mx-4 flex min-h-[70vh] items-center justify-center -mt-24 overflow-hidden px-4 pt-24 text-center md:-mx-6 md:-mt-28 md:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-accent-soft opacity-30 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -right-10 top-1/3 h-72 w-72 rounded-full bg-sage opacity-30 blur-3xl md:h-[28rem] md:w-[28rem]" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-accent opacity-10 blur-3xl" />
      </div>

      <div className="relative max-w-2xl">
        <motion.h1 {...enter(0)} className="font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Crochet Studio
        </motion.h1>
        <motion.p {...enter(0.1)} className="mx-auto mt-4 max-w-md text-base text-ink-muted md:text-lg">
          Muñecos tejidos a mano, uno por uno.
        </motion.p>
        <motion.div {...enter(0.2)} className="mt-8">
          <a href={targetId ? `#${targetId}` : '#contenido'} className={buttonClasses({ size: 'md' })}>
            Ver colección
          </a>
        </motion.div>
      </div>
    </section>
  );
}
