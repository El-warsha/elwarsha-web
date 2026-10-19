import type { messages, Locale } from "@core/i18n";
import type { WeekResourceItem } from "../weeks.schema.js";
import styles from "../WeekDetailPage.module.css";

export interface ResourceTableProps {
  items: WeekResourceItem[];
  copy: (typeof messages)[Locale];
}

export function ResourceTable({ items, copy }: ResourceTableProps) {
  if (items.length === 0) return null;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.resourcesTable}>
        <thead>
          <tr>
            <th style={{ width: "30%" }}>{copy.portal.resourceTitle}</th>
            <th style={{ width: "15%" }}>{copy.portal.resourceLayers}</th>
            <th style={{ width: "12%" }}>{copy.portal.resourceFormat}</th>
            <th style={{ width: "13%" }}>{copy.portal.resourceTime}</th>
            <th style={{ width: "30%" }}>{copy.portal.resourceWhy}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resourceLink}
                >
                  {item.title} ↗
                </a>
              </td>
              <td>
                <span className={styles.layerBadge}>{item.layers}</span>
              </td>
              <td>
                <span className={styles.formatBadge}>{item.format}</span>
              </td>
              <td>{item.time}</td>
              <td className={styles.whyCell}>{item.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
