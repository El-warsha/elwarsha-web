import { Link } from "react-router-dom";

import { messages, type Locale } from "@core/i18n";
import { ButtonLink } from "@ui/components/Button/Button";

import styles from "./HomePage.module.css";

export function HomePage({ locale }: { locale: Locale }) {
  const copy = messages[locale];

  return (
    <main className={styles.hero}>
      <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
      <h1>{copy.hero.title}</h1>
      <p className={styles.body}>{copy.hero.body}</p>
      <div className={styles.actions}>
        <ButtonLink href="mailto:hello@elwarsha.dev">{copy.hero.apply}</ButtonLink>
        <Link className={styles.textLink} to={`/${locale}/roadmap/`}>
          {copy.hero.method}
        </Link>
      </div>
    </main>
  );
}
