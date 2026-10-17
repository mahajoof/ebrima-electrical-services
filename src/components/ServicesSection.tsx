/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Calendar,
  MessageCircle,
  CheckCircle2,
  Zap,
  ArrowRight,
  Shield,
  Layers,
  Wrench,
  Search,
} from 'lucide-react';
import { ElectricalService, BusinessConfig } from '../types';

interface ServicesSectionProps {
  services: ElectricalService[];
  business: BusinessConfig;
  onBookService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  business,
  onBookService,
}) => {
  const [filter, setFilter] = useState<'all' | 'installation' | 'repair' | 'maintenance' | 'specialized'>('all');
  const [search, setSearch] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All 8 Services' },
    { id: 'installation', label: 'Installations' },
    { id: 'repair', label: 'Repairs & Diagnosis' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'specialized', label: 'Residential & Commercial' },
  ];

  const filteredServices = services.filter((s) => {
    const matchesFilter = filter === 'all' || s.category === filter;
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
      s.features.some((f) => f.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getServiceWhatsAppUrl = (serviceTitle: string) => {
    const text = `Hello Ebrima Electrical Services, I would like to enquire about your ${serviceTitle} in The Gambia. Please provide details and availability.`;
    return `https://wa.me/${business.whatsappRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="services-section" className="py-16 sm:py-24 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3 border border-amber-400/20">
            <Zap className="w-3.5 h-3.5" />
            <span>Comprehensive Electrical Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Electrical Services
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            From single socket repairs to full-building rewiring and commercial maintenance, Ebrima Electrical Services delivers dependable, safe, and quality workmanship for homes and businesses in any town or village across The Gambia.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1 bg-slate-950/80 rounded-2xl border border-slate-800 w-full md:w-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  filter === tab.id
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services, wiring, sockets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="rounded-3xl bg-slate-950 border border-slate-800/90 overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Service #{index + 1}</span>
                  </div>

                  {/* Quick Target Recommendation */}
                  <div className="absolute bottom-3 left-4 right-4 text-xs text-slate-300 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800/80">
                    <span className="text-amber-400 font-semibold">Recommended for: </span>
                    <span>{service.recommendedFor}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {service.fullDescription}
                  </p>

                  {/* Key checklist items */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      What We Handle:
                    </div>
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Book Service & WhatsApp Enquiry */}
              <div className="p-6 pt-0 sm:p-7 sm:pt-0 border-t border-slate-900/80 mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => onBookService(service.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md shadow-amber-400/15 transition-all active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Service</span>
                </button>

                <a
                  href={getServiceWhatsAppUrl(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-emerald-950/60 text-slate-200 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 font-semibold text-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Have a custom electrical requirement in The Gambia?</h4>
              <p className="text-sm text-slate-400 mt-0.5">
                Tell us about your home compound, shop, or commercial project in any town or village. We offer customized diagnostic and installation assistance.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onBookService('')}
              className="w-full md:w-auto px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm whitespace-nowrap transition-all"
            >
              Request Custom Service
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
