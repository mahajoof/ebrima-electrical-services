/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { BusinessConfig } from '../types';

interface FloatingWhatsAppProps {
  business: BusinessConfig;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ business }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);

  // Show small greeting badge after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const defaultMessage =
    'Hello Ebrima Electrical Services, I am interested in your electrical installation and repair services in The Gambia. Please provide me with more information.';

  const directWhatsAppUrl = `https://wa.me/${business.whatsappRaw}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Popup Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden animate-fade-in text-white">
          {/* Header */}
          <div className="bg-emerald-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Ebrima Electrical Services</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  Banjul, The Gambia &bull; Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-700/50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-950 space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 leading-relaxed">
              Hello! 👋 Looking for dependable electrical repairs, wiring, or lighting in The Gambia? Tap below to chat directly with us on WhatsApp.
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-[11px]">
              <span className="font-semibold block text-emerald-200">Pre-filled Message:</span>
              "{defaultMessage}"
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-3 bg-slate-900 border-t border-slate-800">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all"
            >
              <Send className="w-4 h-4 fill-slate-950" />
              <span>Start WhatsApp Chat (+220 866863541)</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Prompt Bubble before opened */}
      {!isOpen && hasPrompted && (
        <div
          onClick={() => setIsOpen(true)}
          className="mb-2 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs text-slate-200 shadow-xl cursor-pointer hover:border-emerald-400 transition-colors animate-bounce"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Need an electrician in The Gambia? Chat now</span>
        </div>
      )}

      {/* Main Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all group relative"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp: +220 866863541"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
      </button>
    </div>
  );
};
