/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Zap,
  Phone,
  MessageCircle,
  Menu,
  X,
  Calendar,
  Lock,
  MapPin,
  Clock,
  Shield,
} from 'lucide-react';
import { BusinessConfig } from '../types';

interface NavbarProps {
  business: BusinessConfig;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: (serviceId?: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  pendingBookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  business,
  activeTab,
  setActiveTab,
  onOpenBooking,
  onOpenAdmin,
  isAdminLoggedIn,
  pendingBookingsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Work Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${business.whatsappRaw}?text=${encodeURIComponent(
    'Hello Ebrima Electrical Services, I am interested in your electrical installation and repair services in The Gambia. Please provide me with more information.'
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white transition-colors">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 border-b border-slate-800/80 text-xs py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{business.location}</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Mon – Sat: 8:00 AM – 7:00 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {business.whatsappNumber}</span>
            </a>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors ml-2 pl-3 border-l border-slate-700"
              title="Business Owner Portal"
            >
              <Lock className="w-3 h-3" />
              <span className="hidden sm:inline">Owner Login</span>
              {isAdminLoggedIn && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1" />
              )}
              {!isAdminLoggedIn && pendingBookingsCount > 0 && (
                <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 font-bold rounded-full text-[10px]">
                  {pendingBookingsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Zap className="w-6 h-6 text-slate-950 fill-slate-950" />
          </div>
          <div>
            <div className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-2">
              <span>Ebrima</span>
              <span className="text-amber-400">Electrical Services</span>
            </div>
            <p className="text-xs text-slate-400 tracking-wide font-medium flex items-center gap-1">
              <span>Installation &amp; Repairs</span>
              <span className="inline-block w-1 h-1 rounded-full bg-amber-400"></span>
              <span>Based in Banjul &bull; Serving Nationwide</span>
            </p>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === link.id
                  ? 'bg-slate-800 text-amber-400 shadow-sm border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-600/15 text-emerald-300 hover:bg-emerald-600/25 border border-emerald-500/30 text-xs sm:text-sm font-medium transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs sm:text-sm font-bold shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4" />
            <span>Book an Electrician</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => onOpenBooking()}
            className="px-3 py-2 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold sm:hidden"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/98 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                activeTab === link.id
                  ? 'bg-amber-400/15 text-amber-400 font-bold border border-amber-400/30'
                  : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-800 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-400/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Electrician</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-semibold text-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Chat on WhatsApp (+220 866863541)</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-slate-400 hover:text-amber-400"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Business Owner Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
