export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string | undefined): value is Locale {
  return value === "ar" || value === "en";
}

export function localeDirection(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

export const messages = {
  ar: {
    brand: "الورشة",
    tagline: "ورشة مفتوحة لبناء منتجات حقيقية.",
    nav: {
      initiative: "المبادرة",
      roadmap: "الخطة",
      participation: "المشاركة",
      faq: "الأسئلة",
      portal: "البوابة",
    },
    hero: {
      eyebrow: "الورشة / Cohort 01",
      title: "اتعلّم وأنت بتبني حاجة بتتستخدم.",
      body: "تمانية أسابيع على منتج قائم. طلب سحب كل أسبوع، مراجعة للناس، ودمج واحد يفضل في المستودع.",
      apply: "قدّم للدفعة الجاية",
      method: "شوف طريقة الشغل",
    },
    initiative: {
      title: "مبادرة، مش كورس.",
      body: "الورشة بتحاكي دخول فريق شغّال: كود موجود، تذاكر واضحة، مراجعات، وحدود معمارية لازم تحترمها.",
    },
    roadmap: {
      title: "تمانية أسابيع، مفهوم واحد في كل أسبوع.",
      weeks: [
        "المعمارية والوحدات",
        "نمذجة البيانات",
        "التدفق غير المتزامن",
        "الهوية والصلاحيات",
        "التحقق والاعتمادية",
        "الاختبار",
        "الأداء",
        "التسليم",
      ],
    },
    participation: {
      title: "نفس دورة الفريق كل أسبوع.",
      steps: [
        "اقرأ التذكرة والكود الموجود.",
        "افتح فرع من فورك المنتج.",
        "نفّذ المطلوب واختبره.",
        "راجع زميلك على GitHub.",
      ],
    },
    faq: {
      title: "أسئلة بتتكرر",
      items: [
        {
          q: "محتاج أكون خبير React؟",
          a: "لا. محتاج أساس، واستعداد تقرأ كود غيرك.",
        },
        {
          q: "الـ backend جزء من البرنامج؟",
          a: "أيوه. React وNestJS وPostgreSQL وGitHub بيتعلّموا كمسار واحد.",
        },
        {
          q: "فين بيتحسم الـ PR الفائز؟",
          a: "المراجعات والفحوصات على GitHub هي المصدر. البوابة بتعرض الحالة بس.",
        },
      ],
    },
    portal: {
      title: "بوابة المشارك",
      unavailable: "تسجيل الدخول والكتابة الحقيقية لسه مش مفتوحين في الأساس.",
      empty: "مفيش عناصر للعرض.",
      loading: "بنجهّز الورشة…",
      dashboard: "لوحة الأسبوع",
      products: "المنتجات",
      cohorts: "الدفعات",
      assignments: "التكليفات",
      week: "الأسبوع",
      submissions: "التسليمات",
      reviews: "المراجعات",
    },
    error: "حصل خطأ في الورشة. حدّث الصفحة وحاول تاني.",
    footer: "تعلّم قدام الناس. ابنِ لحاجة حقيقية.",
    language: "English",
  },
  en: {
    brand: "ElWarsha",
    tagline: "An open workshop for building real products.",
    nav: {
      initiative: "Initiative",
      roadmap: "Roadmap",
      participation: "Participation",
      faq: "FAQ",
      portal: "Portal",
    },
    hero: {
      eyebrow: "ElWarsha / Cohort 01",
      title: "Learn by building something people can use.",
      body: "Eight weeks on a living product. One pull request each week, public review, and a single merge that stays in the repository.",
      apply: "Apply for the next cohort",
      method: "See how the work happens",
    },
    initiative: {
      title: "An initiative, not a course.",
      body: "ElWarsha simulates joining a working team: existing code, written tickets, reviews, and architectural boundaries you have to respect.",
    },
    roadmap: {
      title: "Eight weeks. One concept each week.",
      weeks: [
        "Architecture and modularity",
        "Data modeling",
        "Asynchronous flow",
        "Identity and access",
        "Validation and reliability",
        "Testing",
        "Performance",
        "Delivery",
      ],
    },
    participation: {
      title: "The same team cycle every week.",
      steps: [
        "Read the ticket and the existing code.",
        "Branch from your product fork.",
        "Implement the change and test it.",
        "Review a peer on GitHub.",
      ],
    },
    faq: {
      title: "Common questions",
      items: [
        {
          q: "Do I need to be a React expert?",
          a: "No. You need a foundation and a willingness to read other people's code.",
        },
        {
          q: "Is the backend part of the program?",
          a: "Yes. React, NestJS, PostgreSQL, and GitHub are taught as one path.",
        },
        {
          q: "Where is the winning PR decided?",
          a: "GitHub reviews and checks are authoritative. The portal only presents status.",
        },
      ],
    },
    portal: {
      title: "Participant portal",
      unavailable:
        "Real sign-in and writes are intentionally incomplete in this foundation.",
      loading: "Preparing the workshop…",
      empty: "Nothing to show yet.",
      dashboard: "This week",
      products: "Products",
      cohorts: "Cohorts",
      assignments: "Assignments",
      week: "Week",
      submissions: "Submissions",
      reviews: "Reviews",
    },
    error: "Something broke in the workshop. Reload and try again.",
    footer: "Learn in public. Build for real.",
    language: "العربية",
  },
} as const;
