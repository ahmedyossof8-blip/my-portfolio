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
    <footer id="contact" className="py-24 relative bg-black border-t border-white/[0.08] overflow-hidden">
      {/* Diffused Light Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] mesh-orb-1 pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Luxury Dala Liquid Glass Centerpiece Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl backdrop-blur-2xl bg-black/60 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-8 sm:p-14 relative mb-16 overflow-hidden group"
        >
          {/* Subtle Ambient Hover Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-electric-iris/5 rounded-full blur-3xl pointer-events-none group-hover:bg-electric-iris/10 transition-all duration-700" />

          {/* Header Row Badge */}
          <div className="flex items-center gap-2 font-mono text-xs text-saffron-spark mb-8 bg-saffron-spark/10 px-3.5 py-1.5 rounded-full border border-saffron-spark/20 w-max">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-semibold">{t('contact.badge')}</span>
          </div>

          {/* Contact Headline & Info */}
          <div className="space-y-6">
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-bone-white tracking-[-0.04em] leading-[1.08]">
              {t('contact.heading1')}{' '}
              <span className="text-electric-iris font-medium">{t('contact.headingAccent')}</span>?
            </h3>
            <p className="text-silver-mist text-base sm:text-lg max-w-2xl leading-relaxed font-light">
              {t('contact.bio')}
            </p>

            {/* Interactive Tactile Email Copy Action */}
            <div className="pt-4">
              <div className="inline-flex flex-wrap items-center gap-3 p-2.5 rounded-2xl bg-black/80 border border-white/[0.08] shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.04] text-xs sm:text-sm text-bone-white font-mono">
                  <Mail className="w-4 h-4 text-electric-iris" />
                  <span>{email}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-electric-iris hover:bg-electric-iris-hover text-white font-medium text-xs uppercase tracking-[0.025em] transition-all shadow-[0_0_20px_rgba(128,82,255,0.35)] min-h-[44px]"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>{t('contact.copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-white" />
                      <span>{t('contact.copyBtn')}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06] text-xs font-mono text-ash-gray">
          <div>
            <span>© {new Date().getFullYear()} Ahmed Yossof. {t('contact.rights')}</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ahmedyossof8-blip"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-silver-mist hover:text-bone-white hover:border-white/20 transition-all"
            >
              <Github className="w-4 h-4 text-electric-iris" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-silver-mist hover:text-bone-white hover:border-white/20 transition-all"
            >
              <Linkedin className="w-4 h-4 text-electric-iris" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:engahmed.yossof@gmail.com"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-saffron-spark hover:border-saffron-spark/30 transition-all font-semibold"
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
