import { useParams } from "react-router-dom";
import { messages, type Locale } from "@core/i18n";
import { useCohortWeeks } from "./useCohortWeeks";
import styles from "./WeeksPage.module.css";

export function WeeksPage({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const { cohortsSlug = "cohort-01" } = useParams();
  
  // استدعاء الهوك بالطريقة الصحيحة المتوافقة مع نوع البيانات المرتجع
  const query = useCohortWeeks(cohortsSlug, locale);
  const weeks = query.data;
  const isLoading = query.isLoading;
  const error = query.error;

  if (isLoading) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{copy.portal.weeks}</p>
          <h1>{copy.portal.weeksOverview}</h1>
          <p className={styles.lead}>Loading cohort weeks...</p>
        </header>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{copy.portal.weeks}</p>
          <h1>{copy.portal.weeksOverview}</h1>
          <p className={styles.lead} style={{ color: "red" }}>
            Failed to load weeks or you do not have access to this cohort.
          </p>
        </header>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{copy.portal.weeks}</p>
        <h1>{copy.portal.weeksOverview}</h1>
        <p className={styles.lead}>{copy.portal.weeksSubtitle}</p>
      </header>

      <section
        style={{
          padding: "var(--space-6) var(--space-4)",
          background: "var(--color-surface-muted)",
          border: "2px dashed var(--color-border-default)",
          borderRadius: "var(--radius-lg)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            margin: "0 0 var(--space-2)",
            color: "var(--color-text-primary)",
          }}
        >
          {locale === "ar" ? "قائمة الأسابيع المتاحة" : "Cohort Weeks List"}
        </h2>
        
<div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
          {weeks?.map((week: any) => (
            <div 
              key={week.id || week.weekNumber}
              style={{
                background: "var(--color-surface-default, #fff)",
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border-default)",
                textAlign: "start",
              }}
            >
              <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>
                Week {week.weekNumber}: {week.title}
              </h3>
              <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
                {week.description || week.concept}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}