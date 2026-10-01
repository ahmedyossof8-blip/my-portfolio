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
      {/* Floating Centered Sleek Liquid Glass Bar */}
      <div className="pointer-events-auto max-w-3xl w-full flex items-center justify-between px-5 py-2 rounded-full backdrop-blur-xl bg-zinc-900/40 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all">
        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Section: Language Toggle & Connect CTA */}
        <div className="flex items-center gap-2">
          {/* Liquid Glass Language Toggle Pill */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-200 hover:text-[#D4FF00] transition-all active:scale-95 min-h-[36px]"
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span className="font-bold">{language === 'en' ? 'عربي' : 'EN'}</span>
          </button>

          {/* Connect Button */}
          <div className="hidden sm:flex items-center">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-button text-xs font-mono text-zinc-100 hover:text-[#D4FF00] active:scale-95 transition-all min-h-[36px]"
            >
              <span>{t('nav.connect')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-full bg-white/[0.06] border border-white/10 text-zinc-300 hover:text-white min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-[#D4FF00]" /> : <Menu className="w-4 h-4" />}
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
            className="pointer-events-auto absolute top-16 left-4 right-4 sm:hidden rounded-2xl backdrop-blur-2xl bg-zinc-950/90 border border-white/10 p-5 shadow-2xl space-y-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.04] text-sm font-mono text-zinc-200 hover:text-[#D4FF00] hover:bg-white/[0.08] transition-colors min-h-[44px]"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#D4FF00] text-zinc-950 font-bold text-xs uppercase tracking-wider min-h-[44px]"
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
