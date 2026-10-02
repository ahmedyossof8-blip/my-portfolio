'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, Github, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TerminalFooter() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const email = 'ahmedyossof8@gmail.com';

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="relative bg-[#09090b] border-t border-white/[0.07] backdrop-blur-2xl pt-20 pb-28 sm:pb-16 overflow-hidden">
      {/* Subtle Background Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(ellipse at bottom, #8052ff 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-white/[0.02] border border-white/[0.07] p-8 sm:p-12 backdrop-blur-2xl shadow-2xl shadow-black/60 mb-12">
          
          {/* Status Bar Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-white/[0.07]">
            <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-ash-gray">
              <ShieldCheck className="w-4 h-4 text-electric-iris" />
              <span></span>
            </div>
          </div>

          {/* Main Footer Headline & Bio */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.04em] text-bone-white">
                {t('footer.contactHeading')}
              </h2>
              <p className="text-silver-mist text-base font-light max-w-xl leading-relaxed">
                {t('footer.contactBio')}
              </p>
            </div>

            {/* Contact Action Box */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3">
              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className="group relative flex items-center justify-between gap-3 px-6 py-4 rounded-2xl bg-electric-iris hover:bg-electric-iris-hover text-white transition-all shadow-[0_0_25px_rgba(128,82,255,0.35)] hover:shadow-[0_0_35px_rgba(128,82,255,0.55)] active:scale-95 text-left w-full"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white/90 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/70">
                      {copied ? t('footer.copied') : t('footer.copyBtn')}
                    </span>
                    <span className="text-sm font-mono font-medium">{email}</span>
                  </div>
                </div>
                {copied ? (
                  <Check className="w-5 h-5 text-emerald-300" />
                ) : (
                  <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded-md text-white/90 group-hover:bg-white/20 transition-colors">
                    COPY
                  </span>
                )}
              </button>

              {/* Direct Mailto Link as Fall-through */}
              <a
                href={`mailto:${email}`}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl glass-button text-ash-gray hover:text-bone-white text-xs font-mono transition-all active:scale-95"
              >
                <span>Direct Mailto Client ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Social Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ash-gray pt-4 border-t border-white/[0.05]">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ahmedyossof8-blip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-ash-gray hover:text-bone-white transition-colors"
            >
              <Github className="w-4 h-4 text-electric-iris" />
              <span>{t('footer.github')}</span>
            </a>
          </div>

          <div className="text-center sm:text-right">
            <span>© {new Date().getFullYear()} Ahmed Yossof. {t('footer.rights')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
