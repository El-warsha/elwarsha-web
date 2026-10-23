import type { messages, Locale } from "@core/i18n";
import type { WeekResources } from "../validations/weeks.schema.js";
import { ResourceTable } from "./ResourceTable.js";
import styles from "../WeekDetailPage.module.css";

export interface WeekResourcesSectionProps {
  resources: WeekResources;
  copy: (typeof messages)[Locale];
}

export function WeekResourcesSection({ resources, copy }: WeekResourcesSectionProps) {
  const hasResources =
    resources.required.length > 0 ||
    resources.assignment.length > 0 ||
    resources.alternative.length > 0;

  if (!hasResources) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{copy.portal.resources}</h2>

      {resources.required.length > 0 && (
        <div className={styles.resourceCategory}>
          <h3 className={styles.resourceCategoryTitle}>
            {copy.portal.requiredResources}
          </h3>
          <ResourceTable items={resources.required} copy={copy} />
        </div>
      )}

      {resources.assignment.length > 0 && (
        <div className={styles.resourceCategory}>
          <h3 className={styles.resourceCategoryTitle}>
            {copy.portal.assignmentResources}
          </h3>
          <ResourceTable items={resources.assignment} copy={copy} />
        </div>
      )}

      {resources.alternative.length > 0 && (
        <div className={styles.resourceCategory}>
          <h3 className={styles.resourceCategoryTitle}>
            {copy.portal.alternativeResources}
          </h3>
          <ResourceTable items={resources.alternative} copy={copy} />
        </div>
      )}
    </section>
  );
}
