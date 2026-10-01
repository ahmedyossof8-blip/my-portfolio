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
    'hero.hAccent': 'Systems',
    'hero.h2': '& High-Performance Products.',
    'hero.bio': 'Designing scalable backend architectures, high-performance RESTful APIs, robust database systems, and fluid, interactive web products.',
    'hero.ctaWorks': 'Explore Flagship Works',
    'hero.ctaContact': 'Initiate Contact',
    'hero.badge': '● Resilient Systems & Architecture',

    // Projects
    'projects.badge': 'FEATURED_FLAGSHIP_WORKS',
    'projects.heading': 'Selected Engineering Works.',
    'projects.subheading': 'Production digital platforms engineered with high performance, tactile motion physics, and clean code.',
    'projects.p1.title': 'SAT & IG Bookstore',
    'projects.p1.subtitle': 'Bilingual Educational Platform & Logistics Flow',
    'projects.p1.summary': 'High-speed bilingual e-commerce ecosystem serving Cambridge, Edexcel, and American academic curriculums with Supabase CDN asset storage and direct automated WhatsApp checkout routing.',
    'projects.p1.desc': 'The SAT & IG Bookstore is an enterprise educational e-commerce platform built to serve thousands of academic book orders during peak seasons. Features automated PDF sample delivery, local cart persistence, bilingual Arabic/English interface state, and instant order payload routing to WhatsApp dispatchers.',
    'projects.p1.h1': 'Multi-curriculum catalog serving Cambridge, Edexcel, and American boards.',
    'projects.p1.h2': 'Supabase CDN asset storage & direct WhatsApp automated order routing.',
    'projects.p1.h3': 'Fully responsive dual-language store with local cart persistence.',
    'projects.p1.cta': 'Explore Live Store',

    'projects.p2.title': 'F1 Velocity Quiz',
    'projects.p2.subtitle': 'Interactive Real-Time Motorsport Trivia',
    'projects.p2.summary': 'Dynamic Formula 1 trivia application engineered with fluid motion-driven animations, rapid state handling, interactive timing telemetry, and real-time score analytics.',
    'projects.p2.desc': 'F1 Velocity Quiz is an immersive web game built for motorsport enthusiasts. Features state-driven card animations, Framer Motion page transitions, rapid input response time, and instant score telemetry feedback.',
    'projects.p2.h1': 'Engaging Formula 1 question engine with smooth motion-driven transitions.',
    'projects.p2.h2': 'Interactive scoring mechanics, state-driven card animations, and score telemetry.',
    'projects.p2.h3': 'Optimized for ultra-low latency and engaging micro-interactions.',
    'projects.p2.cta': 'Play Game',

    'projects.specs': 'Specs',

    // Disciplines
    'disciplines.badge': 'CORE_ENGINEERING_DISCIPLINES',
    'disciplines.heading': 'Engineering Disciplines.',
    'disciplines.subheading': 'High-level architectural domains engineered with strict type-safety, resilience, and high visual standards.',
    'disciplines.d1.title': 'System Design & Architecture',
    'disciplines.d1.sub': 'Scalable & Decoupled Services',
    'disciplines.d1.desc': 'Designing resilient microservices, high-throughput RESTful APIs, asynchronous event architectures, and fault-tolerant cloud backends.',
    
    'disciplines.d2.title': 'Database Engineering',
    'disciplines.d2.sub': 'Data Modeling & Query Optimization',
    'disciplines.d2.desc': 'Relational schema modeling, query execution plan optimization, indexing strategies, ACID compliance, and robust data persistence pipelines.',

    'disciplines.d3.title': 'Workflow & Process Automation',
    'disciplines.d3.sub': 'Automated Pipelines & Integration',
    'disciplines.d3.desc': 'Building automated background jobs, webhooks, WhatsApp API checkout integrations, CI/CD deployment pipelines, and custom OCR extraction engines.',

    'disciplines.d4.title': 'Modern Web & Responsive Frontend',
    'disciplines.d4.sub': 'Client State & Motion Physics',
    'disciplines.d4.desc': 'High-performance interactive web interfaces, fluid motion physics, zero-CLS layouts, clean client-side state management, and accessibility standards.',

    // Contact Footer
    'contact.badge': 'Architectural Contact Dispatch',
    'contact.heading1': 'Ready to Engineer Your',
    'contact.headingAccent': 'Next Product',
    'contact.bio': 'Available for backend architecture, database design, workflow automation, and full-stack web application development.',
    'contact.copyBtn': 'COPY EMAIL',
    'contact.copied': 'COPIED TO CLIPBOARD!',
    'contact.rights': 'All rights reserved.',
  },
  ar: {
    // Header
    'nav.works': 'الأعمال',
    'nav.disciplines': 'التخصصات',
    'nav.contact': 'التواصل',
    'nav.connect': 'تواصل معي',

    // Hero
    'hero.h1': 'هندسة وتطوير',
    'hero.hAccent': 'أنظمة موثوقة',
    'hero.h2': 'ومنتجات عالية الأداء.',
    'hero.bio': 'بناء بنى تحتية خلفية موثوقة، واجهات برمجية عالية السرعة، هندسة قواعد بيانات متقدمة، وتطبيقات ويب متكاملة وعصرية.',
    'hero.ctaWorks': 'استكشف المشاريع',
    'hero.ctaContact': 'ابدأ التواصل',
    'hero.badge': '● بنى تحتية وأنظمة متكاملة',

    // Projects
    'projects.badge': 'أبرز المشاريع الهندسية',
    'projects.heading': 'المشاريع المنفذة.',
    'projects.subheading': 'منصات رقمية متكاملة مصممة بأعلى معايير الأداء والسرعة وتجربة المستخدم.',
    'projects.p1.title': 'مكتبة SAT & IG',
    'projects.p1.subtitle': 'منصة تجارة إلكترونية تعليمية ثنائية اللغة',
    'projects.p1.summary': 'منظومة تجارة إلكترونية سريعة تخدم المناهج البريطانية والأمريكية مع ربط تلقائي للطلبات عبر واتساب.',
    'projects.p1.desc': 'منصة تعليمية متكاملة مصممة لتحمل آلاف الطلبات المتزامنة خلال المواسم الأكاديمية. تتميز بعرض عينات الكتيبات سحابياً، وحفظ السلة محلياً، والتكامل التلقائي مع واتساب.',
    'projects.p1.h1': 'كتالوج شامل لمناهج كامبريدج وإدكسل والمناهج الأمريكية.',
    'projects.p1.h2': 'تخزين سحابي وسريع عبر Supabase CDN مع ربط تلقائي للواتساب.',
    'projects.p1.h3': 'متجر متعدد اللغات سريع ومستجيب بالكامل.',
    'projects.p1.cta': 'استكشف المتجر',

    'projects.p2.title': 'اختبار F1 Velocity',
    'projects.p2.subtitle': 'تحدي سباقات الفورمولا 1 التفاعلي',
    'projects.p2.summary': 'محرك أسئلة تفاعلي لسباقات الفورمولا 1 مجهز بحركات انسيابية وحساب فوري للنقاط.',
    'projects.p2.desc': 'تطبيق ألعاب تفاعلي لعشاق الفورمولا 1. يتميز بانتقالات انسيابية للغاية، ومحرك أسئلة سريع الاستجابة، وحساب حي للنتائج.',
    'projects.p2.h1': 'محرك أسئلة فورمولا 1 تفاعلي بانتقالات انسيابية.',
    'projects.p2.h2': 'حساب فوري للنقاط مع تفاعلات حركية متقدمة.',
    'projects.p2.h3': 'سرعة استجابة فائقة للأزرار والتفاعلات.',
    'projects.p2.cta': 'ابدأ اللعب',

    'projects.specs': 'المواصفات',

    // Disciplines
    'disciplines.badge': 'التخصصات الهندسية الأساسية',
    'disciplines.heading': 'مجالات التخصص.',
    'disciplines.subheading': 'المجالات الهندسية الرئيسية المصممة وفق أعلى معايير الأداء والاعتمادية.',
    'disciplines.d1.title': 'تصميم وتنسيق الأنظمة',
    'disciplines.d1.sub': 'خدمات موثوقة ومستقلة',
    'disciplines.d1.desc': 'بناء خدمات برمجية مستقلة، واجهات برمجية RESTful، وأنظمة معالجة البيانات غير المتزامنة.',
    
    'disciplines.d2.title': 'هندسة قواعد البيانات',
    'disciplines.d2.sub': 'نمذجة البيانات وتحسين الاستعلامات',
    'disciplines.d2.desc': 'تصميم الجداول وخطط الاستعلامات، الفهرسة المتقدمة، وضمان سلامة البيانات وفق معايير ACID.',

    'disciplines.d3.title': 'أتمتة سير العمل والعمليات',
    'disciplines.d3.sub': 'خطوط معالجة تلقائية',
    'disciplines.d3.desc': 'أتمتة المهام الخلفية، الربط البرمجي للخدمات مثل واتساب، وخطوط النشر التلقائي CI/CD.',

    'disciplines.d4.title': 'تطوير الواجهات المتقدمة',
    'disciplines.d4.sub': 'تفاعلات حركية واستجابة فائقة',
    'disciplines.d4.desc': 'بناء واجهات تفاعلية عالية السلاسة، انتقالات انسيابية، وإدارة نظيفة لحالة التطبيق.',

    // Contact Footer
    'contact.badge': 'مركز التواصل المباشر',
    'contact.heading1': 'هل أنت جاهز لتطوير',
    'contact.headingAccent': 'مشروعك القادم',
    'contact.bio': 'متاح لتطوير البنى التحتية الخلفية، قواعد البيانات، وأتمتة العمليات، والتطبيقات المتكاملة.',
    'contact.copyBtn': 'نسخ البريد',
    'contact.copied': 'تم النسخ بنجاح!',
    'contact.rights': 'جميع الحقوق محفوظة.',
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
