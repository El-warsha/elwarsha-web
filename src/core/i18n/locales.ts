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
      apply: "قدّم للدفعة القادمة",
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
      signInTitle: "سجّل الدخول عشان تشوف أسبوعك",
      logIn: "تسجيل الدخول",
      authFailedTitle: "فشل تسجيل الدخول",
      authFailedBody: "تعذر إكمال تسجيل الدخول. حاول مرة أخرى.",
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
      signOut: "تسجيل الخروج",
    },
    apply: {
      eyebrow: "الدفعة القادمة / Cohort 02",
      title: "استمارة التقديم — الدفعة الثانية",
      lead: "ورشة عملية مكثفة على مدار ٨ أسابيع لبناء وتطوير منتج برمجي حقيقي. طلب سحب ومراجعة عامة أسبوعياً، مع التزام كامل بالمعايير الهندسية. املأ البيانات التالية بدقة وسيتم مراجعة طلبك والتواصل معك.",
      weeks: "٨ أسابيع كاملة",
      prs: "طلب سحب (PR) أسبوعياً",
      reviews: "مراجعات كود عامة",
      product: "منتج حي حقيقي",
      notePrefix: "تنبيه هام: ",
      note: "الورشة تتطلب تخصيص وقت كافي أسبوعياً للمشاركة والمراجعات. نرجو ملء كافة الحقول بدقة، والحرص على كتابة دافعك بوضوح ورابط الصفحة الشخصية ومستودع GitHub.",
      submit: "إرسال طلب التقديم",


      form: {
        sections: {
          personalInformation: "المعلومات الشخصية",
          technicalBackground: "الخلفية التقنية",
          personalPages: "الصفحات الشخصية",
          motivation: "الدافع للتقديم",
        },

        fields: {
          fullName: "الاسم بالكامل",
          emailAddress: "البريد الإلكتروني",
          whatsappNumber: "رقم الواتساب",
          githubHandle: "اسم المستخدم على GitHub",
          discordHandle: "اسم المستخدم على Discord",

          currentStatus: "حالتك الحالية",
          collegeMajor: "التخصص الجامعي",
          programmingExperience: "الخبرة في البرمجة",
          technologies: "التقنيات",
          gitExperience: "الخبرة في Git",

          personalPageUrl: "رابط الصفحة الشخصية",
          githubRepoUrl: "رابط مستودع GitHub",
          aiUsage: "استخدام الذكاء الاصطناعي",

          motivation: "الدافع للتقديم",
        },

        placeholders: {
          fullName: "مثال: إيمان أيمن",
          emailAddress: "developer@example.com",
          whatsappNumber: "+201012345678",
          githubHandle: "username",
          discordHandle: "username",

          currentStatus: "اختاري حالتك الحالية",
          collegeMajor: "مثال: هندسة الحاسبات",
          programmingExperience: "مثال: سنة و6 أشهر",
          technologies: "مثال: React, TypeScript, Node.js...",
          gitExperience: "اختاري مستوى خبرتك في Git",

          personalPageUrl: "https://yourportfolio.com",
          githubRepoUrl: "https://github.com/username/repository",
          aiUsage: "احكي لنا عن استخدامك لأدوات الذكاء الاصطناعي",
          motivation: "احكي لنا عن دوافعك للانضمام، في 50 حرفًا على الأقل...",
        },

        options: {
          currentStatus: {
            student: "طالب / طالبة",
            graduate: "خريج / خريجة",
            workingInTech: "أعمل في مجال التكنولوجيا",
            switchingCareer: "أغيّر مساري المهني",
            other: "أخرى",
          },

          gitExperience: {
            never: "لم أستخدم Git من قبل",
            basicsOnly: "الأساسيات فقط",
            comfortable: "أستخدم Git براحة",
          },
        },
      },



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
      apply: "Apply for next cohort",
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
      signInTitle: "Sign in to see this week",
      logIn: "Log in",
      authFailedTitle: "Authentication failed",
      authFailedBody: "Could not complete sign in. Please try again.",
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
      signOut: "Sign out",
    },
    apply: {
      eyebrow: "Upcoming Cohort / Cohort 02",
      title: "Cohort 02 Application",
      lead: "An intensive 8-week engineering workshop building on a living production product. One pull request each week, public review, and rigorous architectural standards. Fill out the application carefully to apply.",
      weeks: "8 Full Weeks",
      prs: "1 PR Every Week",
      reviews: "Public Code Reviews",
      product: "Real Living Product",
      notePrefix: "Important Note: ",
      note: "The workshop requires a serious weekly time commitment for coding and peer reviews. Please fill all fields accurately, including your published personal page and repository links.",
      submit: "Submit Application",


      form: {
        sections: {
          personalInformation: "Personal Information",
          technicalBackground: "Technical Background",
          personalPages: "Personal Pages",
          motivation: "Motivation",
        },

        fields: {
          fullName: "Full Name",
          emailAddress: "Email Address",
          whatsappNumber: "WhatsApp Number",
          githubHandle: "GitHub Handle",
          discordHandle: "Discord Handle",

          currentStatus: "Current Status",
          collegeMajor: "College Major",
          programmingExperience: "Programming Experience",
          technologies: "Technologies",
          gitExperience: "Git Experience",

          personalPageUrl: "Personal Page URL",
          githubRepoUrl: "GitHub Repository URL",
          aiUsage: "AI Usage",

          motivation: "Motivation",
        },

        placeholders: {
          fullName: "e.g. Eman Ayman",
          emailAddress: "developer@example.com",
          whatsappNumber: "+201012345678",
          githubHandle: "username",
          discordHandle: "username",

          currentStatus: "Select your current status",
          collegeMajor: "e.g. Computer Engineering",
          programmingExperience: "e.g. 1 year, 6 months",
          technologies: "List the technologies you've worked with (e.g. React, TypeScript, Node.js)",
          gitExperience: "Select your Git experience",

          personalPageUrl: "https://yourportfolio.com",
          githubRepoUrl: "https://github.com/username/repository",
          aiUsage: "How have you used AI tools?",
          motivation: "Tell us why you want to join (at least 50 characters)...",
        },

        options: {
          currentStatus: {
            student: "student",
            graduate: "graduate",
            workingInTech: "working in Tech",
            switchingCareer: "switching Career",
            other: "other",
          },

          gitExperience: {
            never: "never",
            basicsOnly: "basics only",
            comfortable: "comfortable",
          },
        },
      },


    },
    error: "Something broke in the workshop. Reload and try again.",
    footer: "Learn in public. Build for real.",
    language: "العربية",
  },
} as const;
