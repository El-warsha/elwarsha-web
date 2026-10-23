import { useMemo } from "react";
import { marked } from "marked";
import type { messages, Locale } from "@core/i18n";
import { Badge } from "@ui/components/Badge/Badge";
import type { WeekAssignment } from "../validations/weeks.schema.js";
import styles from "../WeekDetailPage.module.css";

export interface WeekAssignmentCardProps {
  assignment: WeekAssignment;
  copy: (typeof messages)[Locale];
}

export function WeekAssignmentCard({ assignment, copy }: WeekAssignmentCardProps) {
  const assignmentHtml = useMemo(() => {
    if (!assignment.detailsMd) return "";
    return marked.parse(assignment.detailsMd, { async: false }) as string;
  }, [assignment.detailsMd]);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{copy.portal.assignment}</h2>
      <div className={styles.assignmentCard}>
        <div className={styles.assignmentTop}>
          <h3 className={styles.assignmentTitle}>{assignment.title}</h3>
          <Badge>{assignment.status}</Badge>
        </div>

        {assignment.labels.length > 0 && (
          <div className={styles.labelsRow}>
            {assignment.labels.map((label) => (
              <span key={label} className={styles.pill}>
                #{label}
              </span>
            ))}
          </div>
        )}

        {assignment.summary && (
          <p className={styles.assignmentSummary}>{assignment.summary}</p>
        )}

        {assignmentHtml && (
          <div
            className={styles.markdownContainer}
            dangerouslySetInnerHTML={{ __html: assignmentHtml }}
          />
        )}

        <div className={styles.guidelinesBox}>
          <strong>{copy.portal.prGuidelines}: </strong>
          {copy.portal.prGuidelinesBody}
        </div>
      </div>
    </section>
  );
}
