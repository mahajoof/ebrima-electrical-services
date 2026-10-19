/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Image as ImageIcon,
  ZoomIn,
  X,
  MessageCircle,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { GalleryItem, BusinessConfig } from '../types';
import {
  getCleanWorkTitle,
  getCleanWorkDescription,
  fixImagePath,
} from '../utils/workSanitizer';

interface WorkGalleryProps {
  galleryItems: GalleryItem[];
  business: BusinessConfig;
  onOpenBooking: () => void;
  onAddGalleryItem?: (item: GalleryItem) => void;
  onDeleteGalleryItem?: (id: string) => void;
  onUpdateGalleryItem?: (item: GalleryItem) => void;
}

export const WorkGallery: React.FC<WorkGalleryProps> = ({
  galleryItems,
  business,
  onOpenBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Electrical Wiring',
    'Lighting Installation',
    'Socket and Switch Installation',
    'Electrical Repairs',
    'Residential Projects',
    'Commercial Projects',
  ];

  // Process items to ensure no raw camera or WhatsApp 2026 filenames appear
  const sanitizedItems = galleryItems.map((item, idx) => ({
    ...item,
    image: fixImagePath(item.image),
    displayTitle: getCleanWorkTitle(item.title, item.category, idx),
    displayDesc: getCleanWorkDescription(item.description, item.category, idx),
  }));

  const filteredItems = sanitizedItems.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const getInquiryWhatsAppUrl = (title: string) => {
    const text = `Hello Ebrima Electrical Services, I saw your project "${title}" in your gallery and I would like to request similar electrical work in The Gambia.`;
    return `https://wa.me/${business.whatsappRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3 border border-amber-400/20">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Workmanship &amp; Completed Jobs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Work Gallery
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Real photographs of completed electrical installations, wiring projects, breaker panel assemblies, and lighting setups across The Gambia.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-amber-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between"
            >
              <div
                onClick={() => setSelectedPhoto(item)}
                className="cursor-pointer relative aspect-[4/3] overflow-hidden bg-slate-950"
              >
                <img
                  src={item.image}
                  alt={item.displayTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                  loading="lazy"
                  onError={(e) => {
                    if (e.currentTarget.src !== '/images/ebrima_electrical_hero_1792275168817.jpg') {
                      e.currentTarget.src = '/images/ebrima_electrical_hero_1792275168817.jpg';
                    }
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/70 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-amber-400" />
                </div>

                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-amber-400 border border-slate-700/60">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => setSelectedPhoto(item)}
                    className="cursor-pointer font-bold text-white text-base group-hover:text-amber-400 transition-colors line-clamp-1"
                  >
                    {item.displayTitle}
                  </h3>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {item.displayDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>On Site in The Gambia</span>
                  </span>

                  <button
                    onClick={() => setSelectedPhoto(item)}
                    className="text-amber-400 font-semibold hover:underline"
                  >
                    View &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-950/80 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] max-h-[55vh] bg-slate-950 flex items-center justify-center">
                <img
                  src={fixImagePath(selectedPhoto.image)}
                  alt={(selectedPhoto as any).displayTitle || selectedPhoto.title}
                  className="w-full h-full object-cover select-none"
                  onError={(e) => {
                    if (e.currentTarget.src !== '/images/ebrima_electrical_hero_1792275168817.jpg') {
                      e.currentTarget.src = '/images/ebrima_electrical_hero_1792275168817.jpg';
                    }
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/20">
                      {selectedPhoto.category}
                    </span>
                    <span className="text-xs text-slate-400">Added: {selectedPhoto.dateAdded}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {getCleanWorkTitle(
                    (selectedPhoto as any).displayTitle || selectedPhoto.title,
                    selectedPhoto.category,
                    0
                  )}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {getCleanWorkDescription(
                    (selectedPhoto as any).displayDesc || selectedPhoto.description,
                    selectedPhoto.category,
                    0
                  )}
                </p>

                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      setSelectedPhoto(null);
                      onOpenBooking();
                    }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Similar Service</span>
                  </button>

                  <a
                    href={getInquiryWhatsAppUrl(
                      getCleanWorkTitle(
                        (selectedPhoto as any).displayTitle || selectedPhoto.title,
                        selectedPhoto.category,
                        0
                      )
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
