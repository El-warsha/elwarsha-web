import type { ReactNode } from "react";
import style from "./Label.module.css"

type LabelProps = {
  children: ReactNode;
};

export function Label({ children }: LabelProps) {
  return (
    <span className={style.label}>
      {children}
    </span>
  );
}