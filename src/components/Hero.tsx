/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  Calendar,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle,
  Clock,
  MapPin,
  Camera,
  Upload,
  Check,
  Sparkles,
} from 'lucide-react';
import { BusinessConfig } from '../types';

interface HeroProps {
  business: BusinessConfig;
  onOpenBooking: () => void;
  onExploreServices: () => void;
  customHeroImage?: string;
  onUpdateHeroImage?: (url: string) => void;
  exactPhoto?: string;
  onUploadExactPhoto?: (file: File) => void;
}

export const Hero: React.FC<HeroProps> = ({
  business,
  onOpenBooking,
  onExploreServices,
  customHeroImage,
  onUpdateHeroImage,
  exactPhoto,
  onUploadExactPhoto,
}) => {
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [customInputUrl, setCustomInputUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // If user uploaded an exact photo, use it; otherwise fallback to default
  const heroImageSrc =
    exactPhoto || customHeroImage || '/src/assets/images/ebrima_hero_banner_1792275875245.jpg';

  const whatsappUrl = `https://wa.me/${business.whatsappRaw}?text=${encodeURIComponent(
    'Hello Ebrima Electrical Services, I need electrical installation / repair work in The Gambia. Please provide me with more information.'
  )}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadExactPhoto) {
      onUploadExactPhoto(file);
    }
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInputUrl.trim() && onUpdateHeroImage) {
      onUpdateHeroImage(customInputUrl.trim());
      setShowImageSelector(false);
      setCustomInputUrl('');
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 min-h-[600px] sm:min-h-[660px] lg:min-h-[720px] flex items-center border-b border-slate-900">
      {/* Full-Bleed Panoramic Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImageSrc}
          alt="Ebrima Electrical Services - On Site Work"
          className="w-full h-full object-cover object-right sm:object-center"
          referrerPolicy="no-referrer"
        />

        {/* Cinematic Gradient Overlays: Deep dark navy on left for maximum text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/92 sm:via-slate-950/80 to-slate-950/30 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Action Buttons */}
          <div className="lg:col-span-8 space-y-6">
            {/* Yellow Eyebrow Badge (Matching Reference Screenshot) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-amber-400 font-extrabold text-xs sm:text-sm tracking-widest uppercase flex items-center gap-2">
                <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
                EBRIMA ELECTRICAL SERVICES
              </span>
              <span className="hidden sm:inline-block text-slate-500">&bull;</span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 font-medium bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Based in Banjul &bull; Working Across The Gambia
              </span>
            </div>

            {/* Headline (Matching Reference Screenshot: Big, Bold, with Yellow Highlight) */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-2xl">
              Reliable Electrical Solutions You Can{' '}
              <span className="text-amber-400 inline-block">
                Trust.
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
              Electrical installation, wiring, repairs, troubleshooting, and maintenance for homes and businesses — staying in Banjul and ready to travel to any town or village across The Gambia.
            </p>

            {/* Action Buttons (Yellow primary, Dark outline, Green WhatsApp) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center justify-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-amber-400/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
                <span>Book an Electrician</span>
              </button>

              <button
                onClick={onExploreServices}
                className="flex items-center justify-center gap-2 px-5 py-3.5 sm:px-6 sm:py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-bold text-sm sm:text-base backdrop-blur-md transition-all"
              >
                <span>Explore Services</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3.5 sm:px-6 sm:py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-emerald-600" />
                <span>WhatsApp Chat</span>
              </a>
            </div>

            {/* Trust Highlights Checklist */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Residential &amp; Commercial</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Safe Fault Diagnosis</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Available in Any Town or Village</span>
              </div>
            </div>
          </div>

          {/* Right Column: Ebrima's Exact Photo Frame (If present, shows in full glory) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative group max-w-xs sm:max-w-sm rounded-3xl p-2 bg-gradient-to-b from-slate-800/80 via-slate-900 to-slate-950 border border-slate-700/80 shadow-2xl backdrop-blur-md">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-900">
                <img
                  src={exactPhoto || '/src/assets/images/ebrima_working_window_1792275182056.jpg'}
                  alt="Ebrima on site performing electrical circuit breaker wiring"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/40 text-[11px] font-bold text-amber-300 flex items-center gap-1.5 shadow">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ebrima at Work</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <div className="text-white font-bold text-sm">Circuit Breaker Assembly</div>
                  <div className="text-slate-300 text-xs">On site in The Gambia</div>
                </div>
              </div>

              {/* Upload Exact Photo Button */}
              <div className="mt-2 p-2 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Select Ebrima Photo from Device</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Floating Image Changer Tool */}
      <div className="absolute bottom-4 right-4 z-20">
        {!showImageSelector ? (
          <button
            onClick={() => setShowImageSelector(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 text-[11px] font-medium text-slate-400 hover:text-amber-400 border border-slate-800 backdrop-blur-md transition-colors"
            title="Swap hero background image"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Options</span>
          </button>
        ) : (
          <div className="bg-slate-900 border border-slate-700 p-3 rounded-2xl shadow-2xl w-80 space-y-2 text-xs text-white">
            <div className="flex items-center justify-between font-bold text-amber-400">
              <span>Photo Options</span>
              <button
                onClick={() => setShowImageSelector(false)}
                className="text-slate-400 hover:text-white"
              >
                &times;
              </button>
            </div>
            <p className="text-[11px] text-slate-300">
              Pick from device or paste image URL:
            </p>

            <button
              type="button"
              onClick={() => {
                fileInputRef.current?.click();
                setShowImageSelector(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Photo from Device</span>
            </button>

            <form onSubmit={handleApplyCustomUrl} className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Paste Image URL here..."
                value={customInputUrl}
                onChange={(e) => setCustomInputUrl(e.target.value)}
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-amber-400 hover:bg-amber-400 hover:text-slate-950 font-bold text-xs"
              >
                Apply
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
