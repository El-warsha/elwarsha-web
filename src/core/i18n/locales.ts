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
      labelPickerTitle: "تصفية حسب تصنيف المهمة",
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
   
  applicationForm: {
    sections: {
      section1: {
        section: "القسم",
        sectionTitle: "المعلومات الشخصية وبيانات التواصل",
        sectionSubtitle: "بيانات التواصل الأساسية لإرسال تحديثات طلب التقديم إليك",
      },
      section2: {
        section: "القسم",
        sectionTitle: "الخلفية الأكاديمية والتقنية",
        sectionSubtitle: "تعرّفنا على خلفيتك التقنية لمساعدتنا في توزيع وتنظيم فرق العمل الهندسية",
      },
      section3: {
        section: "القسم",
        sectionTitle: "مهمة الصفحة الشخصية",
        sectionSubtitle: "رابط صفحتك الشخصية المنشورة ومستودع GitHub الذي يثبت إكمالك للتحدي التحضيري",
      },
      section4: {
        section: "القسم",
        sectionTitle: "الدافع والالتزام",
        sectionSubtitle: "أخبرنا عن دوافعك واستعدادك لتخصيص الوقت المطلوب والتعاون مع زملائك",
      },
    },

    fields: {
      fullName: "الاسم بالكامل",
      namePlacholder: "أدخل اسمك بالكامل",
      email: "البريد الإلكتروني",
      emailPlacholder: "أدخل بريدك الإلكتروني",

      whatsappNumber: "رقم واتساب",
      whatsPlacholder: "أدخل رقم واتساب الخاص بك",

      githubHandle: "اسم المستخدم على GitHub",
      githubHandlePlacholder: "أدخل اسم المستخدم على GitHub",

      discordHandle: "اسم المستخدم على Discord",
      discordHandlePlacholder: "أدخل اسم المستخدم على Discord",

      currentStatus: {
        label: "حالتك الحالية",
        defaultOption: "اختر حالتك الحالية",
      },

      collegeMajor: "الكلية والتخصص",
      collegeMajorPlacholder: "أدخل اسم الكلية والتخصص",

      programmingExperience: "خبرتك في البرمجة",
      programmingExperiencePlacholder: "مثال: سنة واحدة، 8 أشهر",

      technologies: "التقنيات التي تستخدمها",
      technologiesPlacholder: "JavaScript، TypeScript، React، Express، PostgreSQL",

      gitExperience: {
        label: "خبرتك في استخدام Git",
        defaultOptions: "اختر مستوى خبرتك في Git",
      },

      personalPageUrl: "رابط الصفحة الشخصية",
      personalPageUrlPlacholder: "https://username.github.io",

      githubRepoUrl: "رابط مستودع GitHub",
      githubRepoUrlPlacholder: "https://github.com/username/my-page",

      aiUsage: "استخدام أدوات الذكاء الاصطناعي",
      aiUsagePlacholder: "مثال: نعم، استخدمت Cursor للإكمال التلقائي / لا، كتبت الكود يدويًا",

      motivation: "لماذا تريد الانضمام إلى الورشة؟",
      motivationPlacholder: "أخبرنا عن أهدافك واستعدادك لإنجاز المهام الأسبوعية",
    },

    validation: {
      nameRequired: "الاسم بالكامل مطلوب",
      nameMin: "يجب ألا يقل الاسم عن 3 أحرف",
      nameLetters: "يرجى استخدام الحروف والمسافات فقط",

      emailRequired: "البريد الإلكتروني مطلوب",
      emailInvalid: "يرجى إدخال بريد إلكتروني صحيح",

      whatsappRequired: "رقم واتساب مطلوب",
      whatsappInvalid: "يرجى إدخال رقم واتساب صحيح يتكون من 10 إلى 15 رقمًا، ويمكن أن يبدأ بعلامة الدولة (+)",

      githubRequired: "اسم المستخدم على GitHub مطلوب",
      githubInvalid: "يجب أن يحتوي اسم المستخدم على الحروف الإنجليزية والأرقام والشرطة (-) فقط",

      discordRequired: "اسم المستخدم على Discord مطلوب",
      discordInvalid: "يجب أن يتراوح اسم المستخدم بين حرفين و32 حرفًا، وأن يحتوي على الحروف الإنجليزية الصغيرة والأرقام والنقاط (.) والشرطة السفلية (_) فقط، دون وجود نقطتين متتاليتين",

      gitExperienceRequired:'مطلوب ادخال مستوى الخبرة فى استخدام Git',
      statusRequired: "يرجى اختيار حالتك الحالية",
      collegeMajorRequired: "الكلية والتخصص مطلوبان",
      programmingExperienceRequired: "يرجى توضيح مدة خبرتك في تعلم البرمجة",
      technologiesRequired: "يرجى إدخال لغات البرمجة والتقنيات التي استخدمتها فعليًا في كتابة الكود",

      personalPageUrlRequired: "رابط الصفحة الشخصية المنشورة مطلوب",
      personalPageUrlInvalid: "يرجى إدخال رابط صحيح يبدأ بـ http:// أو https://",

      githubRepoUrlRequired: "رابط مستودع GitHub مطلوب",
      githubRepoUrlInvalid: "يرجى إدخال رابط مستودع GitHub صحيح، مثل https://github.com/username/repository",

      aiUsageRequired: "يرجى توضيح كيفية استخدامك لأدوات الذكاء الاصطناعي أو ذكر أنك لم تستخدم أيًا منها",

      motivationMin: "يرجى كتابة 50 حرفًا على الأقل لتوضيح سبب رغبتك في الانضمام إلى البرنامج",
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
      labelPickerTitle: "Filter by Task Label",
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
      applicationForm: {
        sections:{
          section1:{
            section:'Section',

       sectionTitle:'Personal & Contact Information',
       sectionSubtitle:'Primarly Contact details to reach you with application updates',
          },
                  section2:{
            section:'Section',

       sectionTitle:'Academic & Technical Background',
       sectionSubtitle:'Your technical background to help us balance and organize engineering pods  ',
          },
                  section3:{
            section:'Section',

       sectionTitle:' Personal Page Task ',
       sectionSubtitle:'Your published personal site and repository link proving completion of the prep challenge ',
          },
                        section4:{
            section:'Section',

       sectionTitle:' Motivation & Commitment ',
       sectionSubtitle:'Tell us about your drive and readiness to commit time and collabrate with peers ',
          }
        },

fields: {
  fullName: "Full Name",
  namePlacholder:'Enter your Full name',
  email: "Email Address",
  emailPlacholder:'Enter your Email',

  whatsappNumber: "WhatsApp Number",
  whatsPlacholder:'Enter your whatsApp Number',

  githubHandle: "GitHub Username",
  githubHandlePlacholder:'Enter your githubHandle',

  discordHandle: "Discord Username",
  discordHandlePlacholder:'Enter your discordHandle',

  currentStatus: {label:"Current Status",defaultOption:'Select Your Current Status'},
  collegeMajor: "College Major",
  collegeMajorPlacholder:'Enter your collegeMajor',

  programmingExperience: "Programming Experience",
  programmingExperiencePlacholder:'e.g. 1 year, 8 months',


  technologies: "Technologies You Use",
  technologiesPlacholder:'JavaScript, TypeScript, React, Express, PostgresSQL',

  gitExperience: {label:"Git Experience",defaultOptions:'Select Your Git Experience'},
  personalPageUrl: "Personal Page URL",
  personalPageUrlPlacholder:'https://username github.io',

  githubRepoUrl: "GitHub Repository URL",
  githubRepoUrlPlacholder:'https://github.com/username/my-page',

  aiUsage: "AI Tools Usage",
  aiUsagePlacholder:'e.g. Yes, used Cursor for autocompletion / No, wrote it manually',

  motivation: "Why Do You Want to Join ElWarsha?",
  motivationPlacholder:'Tell us about your goals and readiness for weekly deliverables',

},


  "validation": {
    nameRequired: "Full name is required",
    nameMin: "Name must be at least 3 letters long",
    nameLetters: "Please use letters and spaces only",

    emailRequired: "Email address is required",
    emailInvalid: "Please enter a valid email address",

    whatsappRequired: "WhatsApp number is required",
    whatsappInvalid: "Please enter a valid WhatsApp number with 10 to 15 digits, optionally starting with a country code (+)",

    githubRequired: "GitHub username is required",
    githubInvalid: "Username must contain only English letters, numbers, and hyphens (-)",

    discordRequired: "Discord username is required",
    discordInvalid: "Username must be 2 to 32 characters long and contain only lowercase English letters, numbers, periods (.), and underscores (_), without consecutive periods",
      gitExperienceRequired:'Git Experience is Required',

    statusRequired: "Please select your current status",
    collegeMajorRequired: "College and major are required",
    programmingExperienceRequired: "Please enter your programming learning experience",
    technologiesRequired: "Please enter the programming languages and technologies you have actually coded with",

    personalPageUrlRequired: "Published personal page URL is required",
    personalPageUrlInvalid: "Please enter a valid URL starting with http:// or https://",

    githubRepoUrlRequired: "GitHub repository URL is required",
    githubRepoUrlInvalid: "Please enter a valid GitHub repository URL, such as https://github.com/username/repository",

    aiUsageRequired: "Please describe how you used AI tools, or state that you did not use any",

    motivationMin: "Please enter at least 50 characters explaining why you want to join the program"
  
},

      },
    },
    error: "Something broke in the workshop. Reload and try again.",
    footer: "Learn in public. Build for real.",
    language: "العربية",
  },
} as const;
