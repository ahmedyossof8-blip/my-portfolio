'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Mail, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t('nav.works'), href: '#works' },
    { name: t('nav.disciplines'), href: '#disciplines' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <header className="fixed top-5 left-0 right-0 z-40 px-4 sm:px-6 pointer-events-none flex justify-center">
      {/* Floating Centered Dala Glass Bar */}
      <div className="pointer-events-auto max-w-3xl w-full flex items-center justify-between px-5 py-2.5 rounded-full backdrop-blur-xl bg-black/60 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all">
        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-[0.025em] text-ash-gray hover:text-bone-white hover:bg-white/[0.06] transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Section: Language Toggle & Primary CTA */}
        <div className="flex items-center gap-2.5">
          {/* Dala Language Toggle Pill */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] hover:border-white/20 text-xs font-mono text-ash-gray hover:text-bone-white transition-all active:scale-95 min-h-[36px]"
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-saffron-spark" />
            <span className="font-semibold">{language === 'en' ? 'عربي' : 'EN'}</span>
          </button>

          {/* Primary Connect Button — Electric Iris Pill */}
          <div className="hidden sm:flex items-center">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-electric-iris hover:bg-electric-iris-hover text-white text-xs font-medium uppercase tracking-[0.025em] shadow-[0_0_20px_rgba(128,82,255,0.35)] hover:shadow-[0_0_30px_rgba(128,82,255,0.55)] active:scale-95 transition-all min-h-[36px]"
            >
              <span>{t('nav.connect')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-full bg-white/[0.06] border border-white/10 text-ash-gray hover:text-bone-white min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-saffron-spark" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-16 left-4 right-4 sm:hidden rounded-3xl backdrop-blur-2xl bg-black/95 border border-white/[0.1] p-5 shadow-2xl space-y-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/[0.04] text-sm font-medium text-ash-gray hover:text-bone-white hover:bg-white/[0.08] transition-colors min-h-[44px]"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-electric-iris text-white font-semibold text-xs uppercase tracking-wider min-h-[44px] shadow-[0_0_20px_rgba(128,82,255,0.4)]"
              >
                <Mail className="w-4 h-4" />
                <span>{t('nav.connect')}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
