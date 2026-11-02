import { Outlet, useOutletContext } from "react-router-dom";
import { useSession } from "@core/session";
import type { Locale } from "@core/i18n";

export function ProtectedRoute() {
  const session = useSession();
  const locale = useOutletContext<Locale>() || "en";
  const isArabic = locale === "ar";

  if (session.status === "loading") {
    return (
      <div
        role="status"
        aria-live="polite"
        dir={isArabic ? "rtl" : "ltr"}
        className="flex items-center justify-center p-12"
      >
        <p className="text-lg">
          {isArabic ? "جاري تحميل الجلسة..." : "Loading session..."}
        </p>
      </div>
    );
  }

  if (session.status === "unauthenticated") {
    return (
      <div
        role="alert"
        dir={isArabic ? "rtl" : "ltr"}
        className="p-12 text-center max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4">
          {isArabic ? "تسجيل الدخول مطلوب" : "Authentication Required"}
        </h2>
        <p className="text-gray-600 mb-6">
          {isArabic
            ? "يجب تسجيل الدخول للوصول إلى البوابة وعرض أسابيع الكوهورت."
            : "You must be signed in to access the portal and view cohort weeks."}
        </p>
        <a
          href="/api/v1/auth/login"
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {isArabic ? "تسجيل الدخول" : "Sign in"}
        </a>
      </div>
    );
  }

  return <Outlet />;
}
