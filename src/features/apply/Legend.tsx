import { Text } from "@ui/primitives/Text";
import styles from "./CohortApplicationForm.module.css";

type FormSectionProps = {
  number: string;
  title: string;
  description: string;
};

export function Legend ({
  number,
  title,
  description
}: FormSectionProps) {
  return (
    <legend className={styles.legend}>
        <span>{number}</span>
        <h3 className={styles.h3}>
          {title}
          <Text as={"p"} tone={"secondary"} className={styles.p}>
            {description}
          </Text>
        </h3>
      </legend>
  )
}
