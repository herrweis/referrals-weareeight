'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import styles from './Hero.module.scss';

export default function Hero() {
  const handleClick = useCallback((e) => {
    e.preventDefault();
    const target = document.getElementById('templates');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.videoWrap}>
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/makeitrain_top_web.webm" type="video/webm" />
          <source src="/videos/makeitrain_top_web.mp4" type="video/mp4" />
        </video>
        <div className={styles.overlay} />
      </div>

      <div className={styles.logo}>
        <Image src="/assets/logo.svg" alt="We Are Eight" width={147} height={64} />
      </div>

      <div className={styles.content}>
        <div className={styles.headings}>
          <h1 className={styles.scriptHeading}>You know someone</h1>
          <h2 className={styles.boldHeading}>We&apos;ll pay you for it.</h2>
        </div>

        <button className={styles.cta} onClick={handleClick}>
          <span>I&apos;d love $2,500</span>
          <span className={styles.ctaArrow}>
            <Image src="/assets/arrow.svg" alt="" width={19} height={15} />
          </span>
        </button>
      </div>

      <p className={styles.tagline}>$2,500 per hire. Every hire. For life.</p>
    </section>
  );
}
