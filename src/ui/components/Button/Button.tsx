import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import styles from "./Button.module.css";

type Variant = "primary" | "ghost";

type Shared = {
  variant?: Variant;
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Shared) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className ?? ""}`}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & Shared) {
  return (
    <a className={`${styles.button} ${styles[variant]} ${className ?? ""}`} {...props} />
  );
}
