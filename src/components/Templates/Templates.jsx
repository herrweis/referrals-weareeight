'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Templates.module.scss';

const emailTemplates = {
  'Casual intro': {
    subject: "Quick intro, think you'd like these guys",
    body: `Hey [Name],

You mentioned you\u2019re growing the team. I\u2019ve worked with a recruitment firm called We Are Eight. They specialise in product, engineering and design talent, and they\u2019re genuinely good.

Want me to intro you? Happy to send their deck or connect you directly over email.

[Your name]`,
  },
  'Warm handoff': {
    subject: '[Name], meet We Are Eight',
    body: `Hi [Name], meet [We Are Eight contact].

Hi [We Are Eight contact], meet [Name].

[Name], We Are Eight are specialist recruiters in product, engineering and design. I\u2019ve worked with them and rate them highly.

[We Are Eight contact], [Name] is [role] at [Company]. They\u2019re looking to grow their team and I think you\u2019d be a great fit.

I\u2019ll let you two take it from here!

[Your name]`,
  },
};

const textTemplates = {
  'Quick and casual': {
    body: "Hey, you still hiring? I know a really good recruitment crew that does product, engineering and design. Called We Are Eight. Want me to intro you?",
  },
  'The nudge': {
    body: "Hey [Name], random one. I\u2019ve been working with a recruiter called We Are Eight and they\u2019re legit. Specialist tech roles. If you\u2019re still building the team I reckon they\u2019d be worth a chat. Want me to connect you?",
  },
  'Super short': {
    body: "Yo are you hiring? I know someone good. Want an intro?",
  },
};

function TemplateCard({ title, templates, type }) {
  const tabKeys = Object.keys(templates);
  const [activeTab, setActiveTab] = useState(tabKeys[0]);
  const [copied, setCopied] = useState(false);
  const template = templates[activeTab];

  const handleCopy = () => {
    const text = type === 'email'
      ? `Subject: ${template.subject}\n\n${template.body}`
      : template.body;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{title}</span>
        <div className={styles.tabs}>
          {tabKeys.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.cardBody}>
        {type === 'email' && template.subject && (
          <p className={styles.subject}>
            Subject: {template.subject}
          </p>
        )}
        <p className={styles.templateText}>{template.body}</p>
      </div>

      <button
        className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
        onClick={handleCopy}
      >
        <Image src="/assets/copy-icon.svg" alt="" width={23} height={23} />
        {copied ? 'Copied!' : 'Copy text'}
      </button>
    </div>
  );
}

export default function Templates() {
  return (
    <section id="templates" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.script}>Introduce us</span>
            <h2 className={styles.heading}>Grab a template</h2>
          </div>
          <p className={styles.headerRight}>
            Pick a style, drop in the name, personalise it and send. Email, text,
            LinkedIn. <span className={styles.pink}>Whatever feels natural.</span>
          </p>
        </div>

        <div className={styles.cards}>
          <TemplateCard
            title="Emails"
            templates={emailTemplates}
            type="email"
          />
          <TemplateCard
            title="Text message"
            templates={textTemplates}
            type="text"
          />
        </div>
      </div>
    </section>
  );
}
