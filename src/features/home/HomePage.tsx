import { Link } from "react-router-dom";

import { messages, type Locale } from "@core/i18n";
import { Button } from "@ui/components/Button/Button";

import styles from "./HomePage.module.css";

export function HomePage({ locale }: { locale: Locale }) {
  const copy = messages[locale];

  return (
    <main className={styles.hero}>
      <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
      <h1>{copy.hero.title}</h1>
      <p className={styles.body}>{copy.hero.body}</p>
      <div className={styles.actions}>
<<<<<<<<< Temporary merge branch 1
        <Link to={`/${locale}/apply/`} style={{ textDecoration: "none" }}>
          <Button>{copy.hero.apply}</Button>
        </Link>
=========
        <ButtonLink href={`/${locale}/apply/`}>{copy.hero.apply}</ButtonLink>
>>>>>>>>> Temporary merge branch 2
        <Link className={styles.textLink} to={`/${locale}/roadmap/`}>
          {copy.hero.method}
        </Link>
      </div>
    </main>
  );
}
