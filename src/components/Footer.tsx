/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Zap,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Shield,
  Lock,
  ArrowUp,
  CheckCircle,
} from 'lucide-react';
import { BusinessConfig, ElectricalService } from '../types';

interface FooterProps {
  business: BusinessConfig;
  services: ElectricalService[];
  setActiveTab: (tab: string) => void;
  onOpenBooking: (serviceId?: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  business,
  services,
  setActiveTab,
  onOpenBooking,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (tabId: string) => {
    setActiveTab(tabId);
    scrollToTop();
  };

  const whatsappUrl = `https://wa.me/${business.whatsappRaw}?text=${encodeURIComponent(
    'Hello Ebrima Electrical Services, I would like to get in touch regarding electrical services in The Gambia.'
  )}`;

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Top Banner */}
      <div className="bg-slate-900 border-b border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Need Electrical Work in The Gambia?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Reliable installation, troubleshooting, and repairs for homes, shops, and offices. Based in Banjul and servicing any town or village across The Gambia.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              Book an Electrician
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>WhatsApp: {business.whatsappNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/20">
                <Zap className="w-5 h-5 text-slate-950 fill-slate-950" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white">Ebrima Electrical Services</span>
                <p className="text-xs text-amber-400">Banjul, The Gambia</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Providing dependable electrical installations, repairs, troubleshooting, and routine maintenance for residential and commercial customers across The Gambia.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Banjul, The Gambia</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: {business.whatsappNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon – Sat: 8:00 AM – 7:00 PM</span>
              </div>
            </div>
          </div>

          {/* Electrical Services */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Electrical Services
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {services.map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => {
                    handleNav('services');
                  }}
                  className="text-left text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-amber-400"></span>
                  <span>{svc.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links & Safety */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-amber-400 transition-colors"
                >
                  All 8 Electrical Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Work Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  About Us &amp; Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact &amp; Location
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 pt-2 border-t border-slate-900"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Business Owner Portal</span>
                </button>
              </li>
            </ul>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <span className="font-semibold text-slate-200 block">Safety Disclaimer:</span>
              <p>
                Never attempt dangerous high-voltage electrical repairs on your own. Always consult a professional electrician.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright */}
      <div className="border-t border-slate-900 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} Ebrima Electrical Services &bull; Banjul, The Gambia. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors text-slate-400"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
