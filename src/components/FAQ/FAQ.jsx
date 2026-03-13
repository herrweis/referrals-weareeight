'use client';

import { useState } from 'react';
import styles from './FAQ.module.scss';

const faqs = [
  {
    question: "What if they\u2019re not hiring right now?",
    answer:
      "Introduce us anyway. We build long-term relationships, and when they do hire, you get paid.",
  },
  {
    question: 'Is there a limit on referrals?',
    answer:
      "None. Refer as many companies as you want. No cap on what you earn.",
  },
  {
    question: 'When do I get paid?',
    answer:
      "You earn $2,500 once we successfully place a candidate with your referred client. We\u2019ll be in touch as soon as it happens.",
  },
  {
    question: 'What counts as a referral?',
    answer:
      "A direct email introduction is ideal. But a text, a call, a LinkedIn message \u2014 any clear proof that you connected us works.",
  },
  {
    question: 'Does it apply to everyone in my network?',
    answer:
      "Yes \u2014 friends, former candidates, clients, colleagues, anyone. This isn\u2019t limited to past clients.",
  },
  {
    question: 'What about invoicing?',
    answer:
      "You\u2019ll need an ABN to invoice us. Don\u2019t have one? No stress \u2014 we\u2019ll walk you through setting one up in under 10 minutes.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerWrap}>
          <span className={styles.script}>Great questions</span>
          <h2 className={styles.heading}>Frequently Asked Questions</h2>
        </div>

        <div className={styles.list}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`${styles.item} ${openIndex === i ? styles.open : ''}`}
            >
              <button
                className={styles.question}
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                <span>{faq.question}</span>
                <span className={styles.icon}>
                  {openIndex === i ? '\u2212' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <div className={styles.answer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
