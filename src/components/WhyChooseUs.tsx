/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Clock,
  Sparkles,
  MapPin,
  ThumbsUp,
  AlertTriangle,
  Zap,
} from 'lucide-react';

interface WhyChooseUsProps {
  onOpenBooking: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenBooking }) => {
  const reasons = [
    {
      icon: ShieldCheck,
      title: 'Safety-First Electrical Standards',
      desc: 'Electrical systems must be treated with utmost caution. We prioritize safe testing, proper earth grounding, circuit breaker calibration, and durable fittings to prevent electrical fires and shock hazards.',
    },
    {
      icon: MapPin,
      title: 'Nationwide Service Across The Gambia',
      desc: 'Residing in Banjul, Ebrima travels to homes, compounds, commercial shops, and offices in any town or village across The Gambia — from Greater Banjul and Brikama to the North Bank and upcountry regions.',
    },
    {
      icon: Sparkles,
      title: 'Clean & Tidy Workmanship',
      desc: 'We take genuine pride in neat conduit channeling, straight socket alignment, and organized distribution boards. We leave your home or business clean and orderly when the job is done.',
    },
    {
      icon: Clock,
      title: 'Dependable Scheduling & Communication',
      desc: 'We value your time. We communicate clearly through WhatsApp and phone, provide straightforward assessments before starting work, and complete assignments with diligence.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-900/40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3 border border-amber-400/20">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Reliable, Honest &amp; Professional Electrical Care
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Electrical problems can be dangerous when neglected or handled without the right tools. Here is why homeowners and businesses across The Gambia trust Ebrima Electrical Services.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-5 text-amber-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {r.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Electrical Safety Notice Banner (Requirement 11) */}
        <div className="rounded-3xl bg-amber-500/10 border border-amber-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Important Electrical Safety Advice
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                If you notice burning smells, sparking outlets, buzzing panels, or frequent circuit breaker trips, switch off the main breaker and never touch exposed wires. Contact a trained professional for safe troubleshooting.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenBooking}
            className="w-full md:w-auto px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm whitespace-nowrap shadow-md shadow-amber-400/20 transition-all"
          >
            Request Inspection
          </button>
        </div>
      </div>
    </section>
  );
};
