import styles from './MathsTable.module.scss';

const letters = ['O', 'O', 'O', 'M', 'G'];
const opacities = [0.2, 0.4, 0.6, 0.8, 1];
const textOpacities = [1, 0.55, 0.7, 0.85, 1];
const lineOpacities = [0.4, 0.6, 0.8, 1, 0];

const headerRow = { intros: 'Your intros', hires: 'Their hires', earn: 'You earn' };

const rows = [
  { intros: '1 company', hires: '1 person', earn: '$2,500' },
  { intros: '1 company', hires: '4 people', earn: '$10,000' },
  { intros: '2 companies', hires: '3 people each', earn: '$15,000' },
  { intros: '3 companies', hires: '5 people  each', earn: '$37,500' },
];

export default function MathsTable() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          <span className={styles.pink}>The maths are </span>
          <span className={styles.white}>simple</span>
        </h2>

        <div className={styles.table}>
          {/* Header row */}
          <div
            className={styles.tableRow}
            style={{
              borderBottomColor: `rgba(255, 255, 255, ${lineOpacities[0]})`,
              color: `rgba(255, 255, 255, ${textOpacities[0]})`,
            }}
          >
            <div className={styles.col}>
              <span
                className={styles.letter}
                style={{ opacity: opacities[0] }}
              >
                {letters[0]}
              </span>
              {headerRow.intros}
            </div>
            <div className={styles.col}>
              {headerRow.hires}
            </div>
            <div className={styles.col}>
              {headerRow.earn}
            </div>
          </div>

          {/* Data rows */}
          {rows.map((row, i) => {
            const isLast = i === rows.length - 1;
            return (
              <div
                key={i}
                className={`${styles.tableRow} ${isLast ? styles.highlighted : ''}`}
                style={{
                  borderBottomColor: `rgba(255, 255, 255, ${lineOpacities[i + 1]})`,
                  color: `rgba(255, 255, 255, ${textOpacities[i + 1]})`,
                }}
              >
                <div className={styles.col}>
                  <span
                    className={styles.letter}
                    style={{ opacity: opacities[i + 1] }}
                  >
                    {letters[i + 1]}
                  </span>
                  {row.intros}
                </div>
                <div className={styles.col}>{row.hires}</div>
                <div className={styles.col}>{row.earn}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
