'use client';

import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <section className={styles.footer}>
      <div className={styles.videoWrap}>
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/makeitrain_bottom_web.webm" type="video/webm" />
          <source src="/videos/makeitrain_bottom_web.mp4" type="video/mp4" />
        </video>
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <p className={styles.scriptText}>You&apos;ve already thought of someone, didn&apos;t you.</p>
        <h2 className={styles.heading}>
          Send that email. Make that call.
          <br />
          Drop that text.
        </h2>
      </div>
    </section>
  );
}
