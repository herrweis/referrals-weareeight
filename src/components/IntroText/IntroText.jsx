import styles from './IntroText.module.scss';

export default function IntroText() {
  return (
    <section id="intro" className={styles.section}>
      <div className={styles.content}>
        <p className={styles.text}>
          Introduce us to a company that is hiring. We place great people.
          <br />
          You get paid every time they hire through us.
        </p>
        <p className={styles.highlight}>
          Not once. <span className={styles.pink}>Every time.</span>
        </p>
      </div>
    </section>
  );
}
