import type { PropsWithChildren, ReactNode } from "react";

import styles from "./PageSection.module.css";

export function PageSection({
  children,
  eyebrow,
  title,
  labelPicker
}: PropsWithChildren<{ eyebrow?: string; title: string ,labelPicker:ReactNode}>) {
  return (
    <section className={styles.section}>
      <div className={styles.header} >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      {labelPicker}
      </div>
      <h1>{title}</h1>
      {children}
    </section>
  );
}
