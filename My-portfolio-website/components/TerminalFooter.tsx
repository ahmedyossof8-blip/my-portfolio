'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Copy, Check, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TerminalFooter() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const email = 'engahmed.yossof@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="py-24 relative bg-[#070709] border-t border-white/[0.08] overflow-hidden">
      {/* Diffused Light Orb for Authentic Refraction */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] mesh-orb-1 pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Luxury Liquid Glass Centerpiece Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl backdrop-blur-2xl bg-zinc-900/40 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 sm:p-14 relative mb-16 overflow-hidden group"
        >
          {/* Subtle Ambient Hover Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4FF00]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D4FF00]/10 transition-all duration-700" />

          {/* Header Row */}
          <div className="flex items-center gap-2 font-mono text-xs text-[#D4FF00] mb-8 bg-[#D4FF00]/10 px-3.5 py-1.5 rounded-full border border-[#D4FF00]/20 w-max">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-semibold">{t('contact.badge')}</span>
          </div>

          {/* Contact Content */}
          <div className="space-y-6">
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-100 tracking-tight leading-[1.1]">
              {t('contact.heading1')}{' '}
              <span className="text-[#D4FF00]">{t('contact.headingAccent')}</span>?
            </h3>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              {t('contact.bio')}
            </p>

            {/* Interactive Action Pill */}
            <div className="pt-4">
              <div className="inline-flex flex-wrap items-center gap-3 p-2.5 rounded-2xl bg-black/60 border border-white/10 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.05] text-xs sm:text-sm text-zinc-200 font-mono">
                  <Mail className="w-4 h-4 text-[#D4FF00]" />
                  <span>{email}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D4FF00] hover:bg-[#c4ee00] text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(212,255,0,0.3)] min-h-[44px]"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-zinc-950" />
                      <span>{t('contact.copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-zinc-950" />
                      <span>{t('contact.copyBtn')}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Streamlined Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06] text-xs font-mono text-zinc-400">
          <div>
            <span>© {new Date().getFullYear()} Ahmed Yossof. {t('contact.rights')}</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ahmedyossof8-blip"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-zinc-300 hover:text-[#D4FF00] hover:border-white/20 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-zinc-300 hover:text-[#D4FF00] hover:border-white/20 transition-all"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:engahmed.yossof@gmail.com"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] hover:bg-[#D4FF00] hover:text-zinc-950 transition-all font-semibold"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{t('nav.contact')}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
