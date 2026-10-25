import type { CohortApplicationResponse } from "@core/api";
import type { Locale } from "@core/i18n";
import styles from "../CohortApplicationForm.module.css";

export interface CohortApplicationReceiptProps {
  receipt: CohortApplicationResponse;
  locale: Locale;
}

export function CohortApplicationReceipt({
  receipt,
  locale,
}: CohortApplicationReceiptProps) {
  const isAr = locale === "ar";

  return (
    <section className={styles.receiptCard} aria-live="polite">
      <span className={styles.receiptBadge}>
        <span>✓</span>
        <span>{isAr ? "تم استلام الطلب" : "Application Received"}</span>
      </span>
      <h3 className={styles.receiptTitle}>
        {isAr ? "تم استلام طلبك بنجاح! 🎉" : "Application Received! 🎉"}
      </h3>
      <p className={styles.receiptBody}>
        {isAr
          ? `شكراً لتقديمك في الورشة (${receipt.cohortSlug}). تم تسجيل طلبك بنجاح وسنقوم بمراجعة بياناتك ومستودع GitHub.`
          : `Thank you for applying to ElWarsha (${receipt.cohortSlug}). We will review your application and reach out via email and WhatsApp.`}
      </p>

      <div className={styles.receiptMetaBox}>
        <div className={styles.receiptMetaRow}>
          <span>{isAr ? "رقم المرجع:" : "Reference ID:"}</span>
          <span className={styles.receiptId}>{receipt.id}</span>
        </div>
        <div className={styles.receiptMetaRow}>
          <span>{isAr ? "البريد الإلكتروني:" : "Email:"}</span>
          <span>{receipt.email}</span>
        </div>
        <div className={styles.receiptMetaRow}>
          <span>{isAr ? "الحالة:" : "Status:"}</span>
          <span>{receipt.status}</span>
        </div>
      </div>

      <ul className={styles.receiptNextSteps}>
        <li>
          {isAr
            ? "سيتم مراجعة الطلبات والرد على المتقدمين عبر البريد الإلكتروني."
            : "Our team will review submissions and notify candidates via email."}
        </li>
        <li>
          {isAr
            ? "تابع التحديثات ومستودعات المنتجات على منصات الورشة."
            : "Follow ongoing repo activity and updates on the ElWarsha portal."}
        </li>
      </ul>
    </section>
  );
}
