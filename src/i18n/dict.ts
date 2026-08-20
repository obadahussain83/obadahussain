/**
 * Bilingual dictionary (English / Arabic).
 * Icons and brand names live in the /data files; only translatable
 * copy lives here. Array items are index-aligned with the /data arrays.
 */

export type Lang = "en" | "ar";

export const dict = {
  en: {
    dir: "ltr",
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      services: "Services",
      contact: "Contact",
      cta: "Let's Talk",
    },
    hero: {
      hello: "Hello, I'm",
      firstName: "Obada",
      lastName: "Hussein",
      role: "Full Stack Developer",
      description:
        "I develop modern web applications — from intuitive user interfaces to robust backend systems — with a focus on performance, usability and clean architecture.",
      cta1: "View My Work",
      cta2: "Contact Me",
      scroll: "Scroll",
    },
    about: {
      eyebrow: "Get to know me",
      title: "About Me",
      text:
        "I'm a Full Stack Developer passionate about building modern digital products and creating smooth user experiences. I enjoy transforming ideas into functional, responsive and scalable applications — writing clean, maintainable code that stands the test of time.",
      download: "Download CV",
      stats: [
        { label: "Selected Projects" },
        { label: "Technologies" },
        { label: "Core Focus", value: "Full Stack" },
      ],
      cards: [
        { label: "Location", value: "Palestine" },
        { label: "Specialization", value: "Full Stack Development" },
        { label: "Experience", value: "Web Development" },
        { label: "Availability", value: "Available for Freelance" },
      ],
    },
    skills: {
      eyebrow: "My Stack",
      title: "Technologies I Work With",
      description:
        "A curated set of tools and technologies I use to design and build full stack applications.",
      categories: {
        Frontend: "Frontend",
        Mobile: "Mobile",
        Backend: "Backend",
        Database: "Database",
        Tools: "Tools",
      } as Record<string, string>,
    },
    projects: {
      eyebrow: "Portfolio",
      title: "Featured Projects",
      description: "A selection of products and platforms I've designed and built.",
      view: "View Project",
      tags: { personal: "Personal", company: "Grids Apps" },
      filters: { all: "All", company: "Company", personal: "Personal" },
      items: [
        {
          title: "Al-Hawkama Governance Platform",
          description:
            "Government governance platform for the Palestinian Ministry of Social Development — managing institutional workflows, oversight and reporting through a secure, role-based web system.",
        },
        {
          title: "Dorosak",
          description:
            "Modern educational platform featuring interactive learning interfaces and AI-assisted experiences.",
        },
        {
          title: "NexStock SaaS Landing Page",
          description:
            "Inventory and stock management system with dashboards, product management and reporting tools.",
        },
        {
          title: "Digital Invitations",
          description:
            "Interactive digital invitation experiences with animations, countdowns, maps and mobile-first layouts.",
        },
        {
          title: "Addha",
          description:
            "A scorekeeping calculator for card games — track rounds, running scores and results in real time. Currently a web app, with a mobile app planned.",
        },
      ],
    },
    services: {
      eyebrow: "Expertise",
      title: "What I Do",
      description:
        "Four core areas where I focus, from architecture to the last pixel.",
      items: [
        {
          title: "Full Stack Development",
          description:
            "End-to-end web applications across frontend, backend, databases and deployment.",
        },
        {
          title: "Frontend Engineering",
          description:
            "Accessible, performant interfaces built with React, Next.js and TypeScript.",
        },
        {
          title: "Backend & APIs",
          description:
            "Secure, scalable server logic and REST APIs with Laravel, .NET and Node.js.",
        },
        {
          title: "Dashboards & Digital Products",
          description:
            "Data-rich dashboards and polished product experiences, shipped to production.",
        },
      ],
    },
    experience: {
      eyebrow: "Timeline",
      title: "My Journey",
      description: "The path that shaped me as a developer.",
      items: [
        {
          period: "Education",
          title: "Computer Engineering",
          subtitle: "An-Najah National University",
          description:
            "Studying core computer engineering and software fundamentals, algorithms and system design.",
        },
        {
          period: "Focus",
          title: "Full Stack Development",
          subtitle: "Web & Digital Products",
          description:
            "Building real-world web applications and digital products across the full stack.",
        },
        {
          period: "Experience",
          title: "Full Stack Developer",
          subtitle: "Grids Apps",
          description:
            "Building and shipping production web and mobile applications end-to-end — crafting responsive interfaces and robust backend services with modern technologies.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's Build Something Together",
      description:
        "Have a project in mind or want to work together? Feel free to contact me.",
      labels: {
        Phone: "Phone",
        Email: "Email",
        WhatsApp: "WhatsApp",
        Location: "Location",
      } as Record<string, string>,
      whatsappValue: "Chat on WhatsApp",
      whatsappCta: "Chat on WhatsApp",
      emailCta: "Email Me",
      form: {
        name: "Your name",
        email: "Your email",
        phone: "Your phone (optional)",
        message: "Tell me about your project...",
        send: "Send Message",
        sent: "Message Sent!",
        errName: "Name is required.",
        errEmailReq: "Email is required.",
        errEmailValid: "Enter a valid email.",
        errPhone: "Enter a valid phone number.",
        errMsgReq: "Message is required.",
        errMsgLen: "Message should be at least 10 characters.",
      },
    },
    footer: { rights: "All rights reserved." },
    toggles: { lang: "العربية", theme: "Theme" },
  },

  ar: {
    dir: "rtl",
    nav: {
      home: "الرئيسية",
      about: "نبذة عني",
      skills: "المهارات",
      projects: "المشاريع",
      services: "الخدمات",
      contact: "تواصل",
      cta: "لنتحدّث",
    },
    hero: {
      hello: "مرحباً، أنا",
      firstName: "عبادة",
      lastName: "حسين",
      role: "مطوّر Full Stack",
      description:
        "أطوّر تطبيقات ويب حديثة — من واجهات مستخدم سلسة إلى أنظمة خلفية قوية — مع التركيز على الأداء وسهولة الاستخدام والبنية النظيفة.",
      cta1: "شاهد أعمالي",
      cta2: "تواصل معي",
      scroll: "مرّر للأسفل",
    },
    about: {
      eyebrow: "تعرّف عليّ",
      title: "نبذة عني",
      text:
        "أنا مطوّر Full Stack شغوف ببناء منتجات رقمية حديثة وخلق تجارب مستخدم سلسة. أستمتع بتحويل الأفكار إلى تطبيقات عملية وسريعة الاستجابة وقابلة للتوسّع — بكتابة كود نظيف وقابل للصيانة يصمد أمام الزمن.",
      download: "تحميل السيرة الذاتية",
      stats: [
        { label: "مشاريع مختارة" },
        { label: "تقنية" },
        { label: "التركيز", value: "Full Stack" },
      ],
      cards: [
        { label: "الموقع", value: "فلسطين" },
        { label: "التخصّص", value: "تطوير Full Stack" },
        { label: "الخبرة", value: "تطوير الويب" },
        { label: "التوفّر", value: "متاح للعمل الحر" },
      ],
    },
    skills: {
      eyebrow: "أدواتي",
      title: "التقنيات التي أعمل بها",
      description:
        "مجموعة مختارة من الأدوات والتقنيات التي أستخدمها لتصميم وبناء تطبيقات متكاملة.",
      categories: {
        Frontend: "الواجهة الأمامية",
        Mobile: "الموبايل",
        Backend: "الواجهة الخلفية",
        Database: "قواعد البيانات",
        Tools: "الأدوات",
      } as Record<string, string>,
    },
    projects: {
      eyebrow: "أعمالي",
      title: "مشاريع مختارة",
      description: "مجموعة من المنتجات والمنصّات التي صمّمتها وبنيتها.",
      view: "عرض المشروع",
      tags: { personal: "مشروع شخصي", company: "Grids Apps" },
      filters: { all: "الكل", company: "شركة", personal: "شخصي" },
      items: [
        {
          title: "منصّة الحوكمة",
          description:
            "منصّة حوكمة حكومية لوزارة التنمية الاجتماعية الفلسطينية — إدارة سير العمل المؤسسي والرقابة والتقارير عبر نظام ويب آمن قائم على الصلاحيات.",
        },
        {
          title: "Dorosak",
          description:
            "منصّة تعليمية حديثة تتميّز بواجهات تعلّم تفاعلية وتجارب مدعومة بالذكاء الاصطناعي.",
        },
        {
          title: "NexStock SaaS Landing Page",
          description:
            "نظام لإدارة المخزون والبضائع مع لوحات تحكّم وإدارة المنتجات وأدوات تقارير.",
        },
        {
          title: "Digital Invitations",
          description:
            "تجارب دعوات رقمية تفاعلية مع حركات وعدّادات تنازلية وخرائط وتصاميم تناسب الموبايل أولاً.",
        },
        {
          title: "عدّها",
          description:
            "حاسبة نقاط لألعاب الشدّة — تتبّع الجولات والنقاط والنتائج لحظياً. حالياً موقع ويب، ومخطّط له كتطبيق موبايل قريباً.",
        },
      ],
    },
    services: {
      eyebrow: "الخبرات",
      title: "ما الذي أقوم به",
      description: "أربعة مجالات أساسية أركّز عليها، من البنية إلى آخر بكسل.",
      items: [
        {
          title: "تطوير Full Stack",
          description:
            "تطبيقات ويب متكاملة تغطّي الواجهة الأمامية والخلفية وقواعد البيانات والنشر.",
        },
        {
          title: "هندسة الواجهة الأمامية",
          description:
            "واجهات سهلة الوصول وعالية الأداء مبنية بـ React و Next.js و TypeScript.",
        },
        {
          title: "الواجهة الخلفية وواجهات API",
          description:
            "منطق خادم آمن وقابل للتوسّع وواجهات REST باستخدام Laravel و .NET و Node.js.",
        },
        {
          title: "لوحات التحكّم والمنتجات الرقمية",
          description:
            "لوحات تحكّم غنية بالبيانات وتجارب منتجات متقنة، جاهزة للإنتاج.",
        },
      ],
    },
    experience: {
      eyebrow: "المسيرة",
      title: "رحلتي",
      description: "الطريق الذي شكّلني كمطوّر.",
      items: [
        {
          period: "التعليم",
          title: "هندسة الحاسوب",
          subtitle: "جامعة النجاح الوطنية",
          description:
            "دراسة أساسيات هندسة الحاسوب والبرمجيات والخوارزميات وتصميم الأنظمة.",
        },
        {
          period: "التركيز",
          title: "تطوير Full Stack",
          subtitle: "منتجات الويب والرقمية",
          description:
            "بناء تطبيقات ويب ومنتجات رقمية واقعية عبر كامل المكدّس التقني.",
        },
        {
          period: "الخبرة",
          title: "مطوّر Full Stack",
          subtitle: "شركة Grids Apps",
          description:
            "تطوير وإطلاق تطبيقات ويب وموبايل إنتاجية بشكل كامل — بناء واجهات متجاوبة وخدمات خلفية متينة باستخدام تقنيات حديثة.",
        },
      ],
    },
    contact: {
      eyebrow: "تواصل",
      title: "لنبنِ شيئاً معاً",
      description: "لديك مشروع في بالك أو ترغب بالعمل معاً؟ لا تتردّد بالتواصل معي.",
      labels: {
        Phone: "الهاتف",
        Email: "البريد الإلكتروني",
        WhatsApp: "واتساب",
        Location: "الموقع",
      } as Record<string, string>,
      whatsappValue: "محادثة عبر واتساب",
      whatsappCta: "محادثة عبر واتساب",
      emailCta: "راسلني بالإيميل",
      form: {
        name: "اسمك",
        email: "بريدك الإلكتروني",
        phone: "رقم هاتفك (اختياري)",
        message: "أخبرني عن مشروعك...",
        send: "إرسال الرسالة",
        sent: "تم إرسال الرسالة!",
        errName: "الاسم مطلوب.",
        errEmailReq: "البريد الإلكتروني مطلوب.",
        errEmailValid: "أدخل بريداً إلكترونياً صحيحاً.",
        errPhone: "أدخل رقم هاتف صحيح.",
        errMsgReq: "الرسالة مطلوبة.",
        errMsgLen: "يجب ألا تقل الرسالة عن 10 أحرف.",
      },
    },
    footer: { rights: "جميع الحقوق محفوظة." },
    toggles: { lang: "English", theme: "المظهر" },
  },
} as const;

export type Dict = (typeof dict)["en"];
