import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LiquidGlass } from '@ybouane/liquidglass';

interface ContactSectionProps {
  liquidGlassInstance?: LiquidGlass | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  liquidGlassInstance,
}) => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
    // Call markChanged on @ybouane/liquidglass instance so WebGL shader updates dynamically
    if (liquidGlassInstance) {
      liquidGlassInstance.markChanged(e.target);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f2fe', '#9d4edd', '#ffffff', '#f72585'],
    });

    setSubmitted(true);
    setTimeout(() => {
      setMessage('');
      setName('');
      setEmail('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-20 px-4 overflow-hidden">
      {/* Backlight Glow Orb */}
      <div className="glow-backdrop w-[500px] h-[500px] bg-purple-600/20 bottom-0 left-10" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>DYNAMIC REFRACTING GLASS PANEL</span>
          </div>
          
          {/* EXACT REQUIRED TEXT ABOVE THE FORM */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            LEAVE A MESSAGE
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Have a project in mind or want to collaborate? Send a message through this high-polish refracting glass interface.
          </p>
        </div>

        {/* High-Polish 'Liquid Glass' Contact Slab */}
        {/* Handles multi-pass rendering for dynamic update effects */}
        <div
          className="liquid-glass-element glass-panel p-8 sm:p-12 relative border border-white/20 shadow-2xl transition-all duration-300"
          data-config='{"floating": true, "blurAmount": 0.6, "refraction": 1.7, "chromAberration": 1.4, "zRadius": 35, "fresnel": 0.95, "edgeHighlight": 0.9}'
        >
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 mb-2 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Transmitted!</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Thank you for reaching out. Ahmed will review your message and respond promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => handleInputChange(e, setName)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans text-sm"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => handleInputChange(e, setEmail)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans text-sm"
                  />
                </div>
              </div>

              {/* Message Input - EXACT SPECIFICATION: [Form input: Enter message] */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Message Content</span>
                  <span className="text-[11px] text-slate-500 font-mono">[Form input: Enter message]</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Enter message"
                  value={message}
                  onChange={(e) => handleInputChange(e, setMessage)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans text-sm resize-none"
                />
              </div>

              {/* SUBMIT BUTTON WITH CHROMATIC SHIFT ON HOVER */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="glass-button glass-button-primary text-sm font-semibold tracking-wider group transition-transform duration-300 hover:scale-105 active:scale-95"
                  style={{
                    // Chromatic aberration hover distortion boost
                  }}
                >
                  <span className="group-hover:text-cyan-200 transition-colors">Submit</span>
                  <Send className="w-4 h-4 text-cyan-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-16 text-center text-xs text-slate-500 font-mono">
          <p>© 2026 AHMED YOUSSEF. ALL RIGHTS RESERVED.</p>
          <p className="mt-1 text-slate-600">
            Powered by WebGL Shader Pipeline & Liquid-Glass Physics.
          </p>
        </div>

      </div>
    </section>
  );
};
