import type { PropsWithChildren } from "react";

import styles from "./PageSection.module.css";

export function PageSection({
  children,
  eyebrow,
  title,
}: PropsWithChildren<{ eyebrow?: string; title: string }>) {
  return (
    <section className={styles.section}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h1>{title}</h1>
      {children}
    </section>
  );
}
