'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './WhoToRefer.module.scss';

const categories = [
  {
    title: 'Scaling fast.',
    description: 'Funded startups building product, engineering or design teams.',
    color: 'pink',
  },
  {
    title: 'Building something new.',
    description: 'New divisions, new functions, new products inside larger organisations.',
    color: 'yellow',
  },
  {
    title: 'Looking for specialists.',
    description: 'Businesses struggling to find senior or niche talent in tech.',
    color: 'blue',
  },
];

export default function WhoToRefer() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [cardProgresses, setCardProgresses] = useState([0, 0, 0]);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current || !headerRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const headerHeight = headerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;

    // Sticky header
    const stickyActive = sectionRect.top <= 0 && sectionRect.bottom > headerHeight;
    setIsSticky(stickyActive);

    const scrolled = Math.max(0, -sectionRect.top);

    // Cards animate over a fixed scroll distance
    const cardScrollDistance = viewportHeight * 1.8;
    const cardZoneStart = viewportHeight * 0.1;
    const perCard = cardScrollDistance / categories.length;

    const newProgresses = categories.map((_, i) => {
      const cardStart = cardZoneStart + i * perCard;
      const cardEnd = cardStart + perCard;
      // Progress 0 = card is fully visible, 1 = card has fully rotated away
      const progress = Math.max(0, Math.min(1, (scrolled - cardStart) / (cardEnd - cardStart)));
      return progress;
    });

    setCardProgresses(newProgresses);

    setHeaderOpacity(1);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Calculate card transform based on progress
  const getCardStyle = (progress, index) => {
    // Card should be visible (not yet scrolled) when progress is 0
    // and fully rotated away when progress is 1
    const rotateX = 0; // exponential tilt — accelerates like a falling card
    const translateY = -progress * 100; // move down
    const opacity = progress > 0.85 ? Math.max(0, 1 - (progress - 0.85) / 0.15) : 1;
    const scale = 1 + progress * 0;

    return {
      transform: `perspective(800px) rotateX(${rotateX}deg) translateY(${translateY}vh) scale(${scale})`,
      opacity,
      zIndex: categories.length - index,
    };
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.stickyContainer}>
        <div
          ref={headerRef}
          className={styles.header}
          style={{ opacity: isSticky ? headerOpacity : 1 }}
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

        <div className={styles.cardArea}>
          {categories.map((cat, i) => (
            <div
              key={i}
              className={`${styles.cardWrapper}`}
              style={getCardStyle(cardProgresses[i], i)}
            >
              {/* Shadow layers */}
              <div className={`${styles.cardShadow} ${styles.shadowYellow}`} />
              <div className={`${styles.cardShadow} ${styles.shadowBlue}`} />
              {/* Main card */}
              <div className={`${styles.card} ${styles[cat.color]}`}>
                <h3 className={styles.catTitle}>{cat.title}</h3>
                <p className={styles.catDescription}>{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottomText}>
        <p>
          If they are growing, we can help. If
          we can help, <span className={styles.highlight}>you get paid</span>.
        </p>
      </div>
    </section>
  );
}
