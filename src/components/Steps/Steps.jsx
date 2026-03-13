'use client';

import { useEffect, useRef } from 'react';
import styles from './Steps.module.scss';

const steps = [
  {
    number: '1',
    title: 'You introduce us',
    description:
      'Email, text, phone call, whatever works. Use one of the templates below or just wing it. Takes 30 seconds.',
  },
  {
    number: '2',
    title: 'We do the rest',
    description:
      "We reach out, have the conversation, pitch, run the process. You don't lift another finger.",
  },
  {
    number: '3',
    title: 'You get paid',
    description:
      '$2,500 every time they hire through us. No cap and no expiry. We will be in touch the moment a placement lands.',
  },
];

export default function Steps() {
  const sectionRef = useRef(null);
  const stepsRefs = useRef([]);
  const numbersRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      stepsRefs.current.forEach((stepEl, i) => {
        if (!stepEl || !numbersRefs.current[i]) return;

        const rect = stepEl.getBoundingClientRect();
        const windowH = window.innerHeight;
        const center = windowH / 2;

        // Calculate how far the step's center is from the viewport center
        const stepCenter = rect.top + rect.height / 2;
        const distFromCenter = stepCenter - center;
        const normalizedDist = distFromCenter / windowH; // -1 to 1 range roughly

        // Scale: starts small, grows as text approaches center, continues growing as it leaves
        const progress = 1 - normalizedDist;
        const scale = Math.max(0.3, Math.min(2.5, progress * 0.9));

        // Opacity: visible when text is near center, fades as number gets huge
        let opacity;
        if (Math.abs(normalizedDist) < 0.15) {
          opacity = 1;
        } else if (normalizedDist > 0.15) {
          opacity = Math.max(0, 1 - (normalizedDist - 0.15) * 3);
        } else {
          opacity = Math.max(0, 1 - (Math.abs(normalizedDist) - 0.15) * 3);
        }

        numbersRefs.current[i].style.transform = `translate(-50%, -35%) scale(${scale})`;
        numbersRefs.current[i].style.opacity = opacity;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {steps.map((step, i) => (
        <div
          key={step.number}
          ref={(el) => (stepsRefs.current[i] = el)}
          className={styles.step}
        >
          <div
            ref={(el) => (numbersRefs.current[i] = el)}
            className={styles.number}
          >
            {step.number}
          </div>
          <div className={styles.textContent}>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.description}>{step.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
