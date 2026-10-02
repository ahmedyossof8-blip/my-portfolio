'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'nav.works': 'Works',
    'nav.disciplines': 'Disciplines',
    'nav.contact': 'Contact',
    'nav.connect': "Let's Connect",

    // Hero
    'hero.h1': 'Engineering Resilient',
    'hero.hAccent': 'Backend Systems',
    'hero.h2': '& Fluid Interactive Products.',
    'hero.bio': 'Designing scalable backend architectures, high-performance RESTful APIs, resilient database systems, and fluid, interactive web products.',
    'hero.ctaWorks': 'Explore Flagship Works',
    'hero.ctaContact': 'Initiate Contact',

    // Projects
    'projects.badge': 'FEATURED_FLAGSHIP_SHOWCASES',
    'projects.heading': 'Selected Flagship Works.',
    'projects.subheading': 'Production digital platforms engineered with high performance, resilient architectures, and fluid motion physics.',
    'projects.p1.title': 'SAT & IG Bookstore',
    'projects.p1.subtitle': 'Bilingual Educational Platform & Logistics Flow',
    'projects.p1.summary': 'Scalable bilingual curriculum marketplace, Supabase CDN integration, client-side cart synchronization, and WhatsApp automated checkout dispatch.',
    'projects.p1.desc': 'The SAT & IG Bookstore is an enterprise educational e-commerce platform built to serve thousands of academic book orders during peak seasons. Features automated PDF sample delivery, local cart persistence, bilingual Arabic/English interface state, and instant order payload routing to WhatsApp dispatchers.',
    'projects.p1.h1': 'Multi-curriculum catalog serving Cambridge, Edexcel, and American boards.',
    'projects.p1.h2': 'Supabase CDN asset storage & direct WhatsApp automated order routing.',
    'projects.p1.h3': 'Fully responsive dual-language store with local cart persistence.',
    'projects.p1.cta': 'Explore Platform ↗',

    'projects.p2.title': 'F1 Velocity Quiz',
    'projects.p2.subtitle': 'Interactive Real-Time Motorsport Trivia Engine',
    'projects.p2.summary': 'Motorsport telemetry & interactive trivia engine, sub-millisecond state handling, and reactive motion physics.',
    'projects.p2.desc': 'F1 Velocity Quiz is an immersive web game built for motorsport enthusiasts. Features state-driven card animations, Framer Motion page transitions, rapid input response time, and instant score telemetry feedback.',
    'projects.p2.h1': 'Engaging Formula 1 question engine with smooth motion-driven transitions.',
    'projects.p2.h2': 'Interactive scoring mechanics, state-driven card animations, and score telemetry.',
    'projects.p2.h3': 'Optimized for ultra-low latency and engaging micro-interactions.',
    'projects.p2.cta': 'Launch Game ↗',

    'projects.specs': 'Specs',

    // Disciplines
    'disciplines.badge': 'CORE_ENGINEERING_DISCIPLINES',
    'disciplines.heading': 'Core Disciplines.',
    'disciplines.subheading': 'High-level architectural domains engineered with strict type-safety, resilience, and high visual standards.',
    'disciplines.d1.title': 'System Architecture & Scalability',
    'disciplines.d1.sub': 'Scalable & Decoupled Services',
    'disciplines.d1.desc': 'Designing resilient microservices, high-throughput RESTful APIs, asynchronous event architectures, and fault-tolerant cloud backends.',
    
    'disciplines.d2.title': 'Database Engineering & Performance',
    'disciplines.d2.sub': 'Data Modeling & Query Optimization',
    'disciplines.d2.desc': 'Relational schema modeling, query execution plan optimization, indexing strategies, ACID compliance, and robust data persistence pipelines.',

    'disciplines.d3.title': 'API Integrations & Automations',
    'disciplines.d3.sub': 'Automated Pipelines & Integration',
    'disciplines.d3.desc': 'Building automated background jobs, webhooks, WhatsApp API checkout integrations, CI/CD deployment pipelines, and custom integration engines.',

    'disciplines.d4.title': 'Modern Web & Interactive UIs',
    'disciplines.d4.sub': 'Client State & Motion Physics',
    'disciplines.d4.desc': 'High-performance interactive web interfaces, fluid motion physics, zero-CLS layouts, clean client-side state management, and accessibility standards.',

    // Contact Terminal Footer
    'footer.status': 'SYS_STATUS: OPERATIONAL',
    'footer.contactHeading': 'Dispatch System Contact',
    'footer.contactBio': 'Available for high-impact backend architecture, database engineering, API automation, and modern web products.',
    'footer.copyBtn': 'COPY EMAIL',
    'footer.copied': 'COPIED TO CLIPBOARD!',
    'footer.github': 'GitHub Profile ↗',
    'footer.rights': 'All rights reserved.',
  },
  ar: {
    // Header
    'nav.works': 'الأعمال',
    'nav.disciplines': 'التخصصات',
    'nav.contact': 'التواصل',
    'nav.connect': 'تواصل معي',

    // Hero
    'hero.h1': 'هندسة وتطوير',
    'hero.hAccent': 'أنظمة خلفية موثوقة',
    'hero.h2': 'ومنتجات تفاعلية عالية الأداء.',
    'hero.bio': 'بناء بنى تحتية خلفية موثوقة، واجهات برمجية عالية السرعة، هندسة قواعد بيانات متقدمة، وتطبيقات ويب تفاعلية وعصرية.',
    'hero.ctaWorks': 'استكشف المشاريع',
    'hero.ctaContact': 'ابدأ التواصل',

    // Projects
    'projects.badge': 'أبرز المنصات والمشاريع',
    'projects.heading': 'المشاريع المنفذة.',
    'projects.subheading': 'منصات رقمية متكاملة مصممة بأعلى معايير الأداء والسرعة وتجربة المستخدم.',
    'projects.p1.title': 'مكتبة SAT & IG',
    'projects.p1.subtitle': 'منصة تجارة إلكترونية تعليمية ثنائية اللغة',
    'projects.p1.summary': 'سوق تعليمي ثنائي اللغة قابل للتوسع، تكامل مع Supabase CDN، مزامنة سلة التسوق محلياً، وإرسال تلقائي للطلبات عبر واتساب.',
    'projects.p1.desc': 'منصة تعليمية متكاملة مصممة لتحمل آلاف الطلبات المتزامنة خلال المواسم الأكاديمية. تتميز بعرض عينات الكتيبات سحابياً، وحفظ السلة محلياً، والتكامل التلقائي مع واتساب.',
    'projects.p1.h1': 'كتالوج شامل لمناهج كامبريدج وإدكسل والمناهج الأمريكية.',
    'projects.p1.h2': 'تخزين سحابي وسريع عبر Supabase CDN مع ربط تلقائي للواتساب.',
    'projects.p1.h3': 'متجر متعدد اللغات سريع ومستجيب بالكامل.',
    'projects.p1.cta': 'استكشف المنصة ↗',

    'projects.p2.title': 'اختبار F1 Velocity',
    'projects.p2.subtitle': 'تحدي سباقات الفورمولا 1 التفاعلي',
    'projects.p2.summary': 'محرك أسئلة تفاعلي لسباقات الفورمولا 1، معالجة للحالة بدقة متناهية، وفيزياء حركة تفاعلية.',
    'projects.p2.desc': 'تطبيق ألعاب تفاعلي لعشاق الفورمولا 1. يتميز بانتقالات انسيابية للغاية، ومحرك أسئلة سريع الاستجابة، وحساب حي للنتائج.',
    'projects.p2.h1': 'محرك أسئلة فورمولا 1 تفاعلي بانتقالات انسيابية.',
    'projects.p2.h2': 'حساب فوري للنقاط مع تفاعلات حركية متقدمة.',
    'projects.p2.h3': 'سرعة استجابة فائقة للأزرار والتفاعلات.',
    'projects.p2.cta': 'ابدأ اللعبة ↗',

    'projects.specs': 'المواصفات',

    // Disciplines
    'disciplines.badge': 'التخصصات الهندسية الأساسية',
    'disciplines.heading': 'مجالات التخصص.',
    'disciplines.subheading': 'المجالات الهندسية الرئيسية المصممة وفق أعلى معايير الأداء والاعتمادية.',
    'disciplines.d1.title': 'بناء الأنظمة وتوسيع نطاقها',
    'disciplines.d1.sub': 'خدمات موثوقة ومستقلة',
    'disciplines.d1.desc': 'بناء خدمات برمجية مستقلة، واجهات برمجية RESTful، وأنظمة معالجة البيانات غير المتزامنة.',
    
    'disciplines.d2.title': 'هندسة وقواعد البيانات والأداء',
    'disciplines.d2.sub': 'نمذجة البيانات وتحسين الاستعلامات',
    'disciplines.d2.desc': 'تصميم الجداول وخطط الاستعلامات، الفهرسة المتقدمة، وضمان سلامة البيانات وفق معايير ACID.',

    'disciplines.d3.title': 'الربط البرمجي وأتمتة العمليات',
    'disciplines.d3.sub': 'خطوط معالجة تلقائية',
    'disciplines.d3.desc': 'أتمتة المهام الخلفية، الربط البرمجي للخدمات مثل واتساب، وخطوط النشر التلقائي CI/CD.',

    'disciplines.d4.title': 'الواجهات الرقمية المتقدمة والتفاعلية',
    'disciplines.d4.sub': 'تفاعلات حركية واستجابة فائقة',
    'disciplines.d4.desc': 'بناء واجهات تفاعلية عالية السلاسة، انتقالات انسيابية، وإدارة نظيفة لحالة التطبيق.',

    // Contact Terminal Footer
    'footer.status': 'حالة النظام: يعمل بكفاءة',
    'footer.contactHeading': 'مركز التواصل المباشر',
    'footer.contactBio': 'متاح لتطوير البنى التحتية الخلفية، قواعد البيانات، أتمتة العمليات، والتطبيقات المتكاملة.',
    'footer.copyBtn': 'نسخ البريد',
    'footer.copied': 'تم النسخ بنجاح!',
    'footer.github': 'ملف GitHub ↗',
    'footer.rights': 'جميع الحقوق محفوظة.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key: string): string => {
    return translations[language]?.[key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
