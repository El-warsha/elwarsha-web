import type { HTMLAttributes, PropsWithChildren } from "react";

import styles from "./Text.module.css";

type Tone = "primary" | "secondary";

export function Text({
  children,
  tone = "primary",
  as: Component = "p",
  className,
  ...props
}: PropsWithChildren<
  HTMLAttributes<HTMLElement> & { tone?: Tone; as?: "p" | "span" | "small" }
>) {
  return (
    <Component className={`${styles.text} ${styles[tone]} ${className ?? ""}`} {...props}>
      {children}
    </Component>
  );
}
