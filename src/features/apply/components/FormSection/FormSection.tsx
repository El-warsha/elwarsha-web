import React, { ReactNode } from "react";
import styles from'./FormSection.module.css'
interface FormSectionProps {
  sectionNumber?: number;
  sectionTitle?: string;
  sectionSubtitle?: string;
  children: ReactNode;
}
export default function FormSection({
  children,
  sectionNumber,
  sectionSubtitle,
  sectionTitle,
}: FormSectionProps) {
  return <fieldset className={styles.container}>
    <legend className={styles.header}>
    {sectionNumber&&<span className={styles.number}>{sectionNumber}</span>}
    {sectionTitle && <h2>Section{sectionNumber}: {sectionTitle}</h2>}
    </legend>
  {sectionSubtitle&&<p className={styles.subtitle}>{sectionSubtitle}</p>}
 <div className={styles['fields-container']}>{children}</div>
  
  </fieldset>;
}
