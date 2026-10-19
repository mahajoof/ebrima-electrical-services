/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Zap,
  MapPin,
  Clock,
  Wrench,
  HeartHandshake,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { BusinessConfig } from '../types';
import { fixImagePath } from '../utils/workSanitizer';

interface AboutSectionProps {
  business: BusinessConfig;
  onOpenBooking: () => void;
  exactPhoto?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  business,
  onOpenBooking,
  exactPhoto,
}) => {
  const whatsappUrl = `https://wa.me/${business.whatsappRaw}?text=${encodeURIComponent(
    'Hello Ebrima Electrical Services, I would like to learn more about your services and discuss an electrical project in The Gambia.'
  )}`;

  const imageSrc =
    fixImagePath(exactPhoto) || '/images/ebrima_working_window_1792275182056.jpg';

  return (
    <section className="py-16 sm:py-24 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic On-Site Photo of Ebrima */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900">
              <img
                src={imageSrc}
                alt="Ebrima on site installing circuit breakers and electrical wiring in The Gambia"
                className="w-full h-80 sm:h-96 md:h-[460px] object-cover object-top select-none"
                loading="lazy"
                onError={(e) => {
                  if (e.currentTarget.src !== '/images/ebrima_working_window_1792275182056.jpg') {
                    e.currentTarget.src = '/images/ebrima_working_window_1792275182056.jpg';
                  }
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/30 text-xs font-bold text-amber-300 flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Meet Ebrima &bull; Professional Electrician</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Residing in Banjul &bull; Working Across The Gambia</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Ebrima travels to any place, town, or village in The Gambia to provide dependable, professional electrical installation, maintenance, and fault repair.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-semibold tracking-wider uppercase border border-amber-400/20">
              <Zap className="w-3.5 h-3.5" />
              <span>About Ebrima Electrical Services</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Safe, Reliable Electrical Workmanship Across The Gambia
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Ebrima Electrical Services was established with a clear mission: to provide homeowners, tenants, shops, commercial facilities, and institutions with dependable, high-quality electrical installation, repair, and maintenance services.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              While Ebrima is based and stays in Banjul, his services are not limited to one city. He is ready to travel to <span className="text-amber-400 font-semibold">any town or village throughout The Gambia</span> — from the Greater Banjul and Kombo regions to Brikama, the North Bank, and upcountry communities.
            </p>

            {/* Mission & Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2 font-bold text-white text-sm mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Our Mission</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  To keep homes and businesses safe, properly wired, and powered with durable electrical installations, upfront communication, and conscientious workmanship.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2 font-bold text-white text-sm mb-1.5">
                  <HeartHandshake className="w-4 h-4 text-amber-400" />
                  <span>Commitment to Satisfaction</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every installation and repair is tested rigorously before finishing. We make sure all sockets, switches, breakers, and lights operate smoothly and safely.
                </p>
              </div>
            </div>

            {/* Core Commitments */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Available to travel to any town or village across The Gambia</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thorough safety inspections on every breaker panel and circuit</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Neat conduit channeling and clean, orderly job finishes</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all shadow-md shadow-amber-400/20"
              >
                Book an Electrician
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp (+220 866863541)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
