'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './WhoToRefer.module.scss';

const categories = [
  {
    title: 'Scaling fast',
    description: 'Funded startups building product, engineering or design teams.',
  },
  {
    title: 'Building something new',
    description: 'New divisions, new functions, new products inside larger organisations.',
  },
  {
    title: 'Looking for specialists',
    description: 'Businesses struggling to find senior or niche talent in tech.',
  },
];

export default function WhoToRefer() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const lastCatRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !lastCatRef.current || !headerRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const lastCatRect = lastCatRef.current.getBoundingClientRect();
      const headerHeight = headerRef.current.offsetHeight;

      // Sticky from when section top hits viewport top
      const stickyActive = sectionRect.top <= 0 && sectionRect.bottom > headerHeight;
      setIsSticky(stickyActive);

      // Fade out: when the last category's bottom passes above the header bottom
      // i.e. the last category has scrolled out of view behind the header
      // Start fading as last category approaches the header bottom
      const fadeStart = headerHeight + 200;
      if (stickyActive && lastCatRect.bottom < fadeStart) {
        const fadeDistance = fadeStart * 0.6;
        const pastBy = fadeStart - lastCatRect.bottom;
        const opacity = Math.max(0, 1 - pastBy / fadeDistance);
        setHeaderOpacity(opacity);
      } else {
        setHeaderOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div
        ref={headerRef}
        className={`${styles.header} ${isSticky ? styles.sticky : ''}`}
        style={{ opacity: headerOpacity }}
      >
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <span className={styles.script}>Who to refer</span>
            <h2 className={styles.heading}>Who to think of</h2>
          </div>
          <p className={styles.headerRight}>
            You probably already know someone. Think about the companies in your
            network that are
          </p>
        </div>
      </div>

      <div ref={scrollAreaRef} className={styles.scrollArea}>
        {categories.map((cat, i) => (
          <div
            key={i}
            ref={i === categories.length - 1 ? lastCatRef : undefined}
            className={styles.category}
          >
            <h3 className={styles.catTitle}>{cat.title}</h3>
            <p className={styles.catDescription}>{cat.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.bottomText}>
        <p>If they are growing, we can help. If we can help, you get paid.</p>
      </div>
    </section>
  );
}
