/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  INITIAL_BUSINESS_CONFIG,
  INITIAL_SERVICES,
  INITIAL_GALLERY,
  INITIAL_REVIEWS,
  INITIAL_BOOKINGS,
} from './data/initialData';
import {
  BusinessConfig,
  ElectricalService,
  GalleryItem,
  CustomerReview,
  BookingRequest,
  ContactEnquiry,
} from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { WorkGallery } from './components/WorkGallery';
import { Testimonials } from './components/Testimonials';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import {
  Calendar,
  MessageCircle,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Wrench,
  AlertTriangle,
} from 'lucide-react';

export default function App() {
  // Business Config State (Persisted)
  const [business, setBusiness] = useState<BusinessConfig>(() => {
    try {
      const saved = localStorage.getItem('ebrima_business_config');
      return saved ? JSON.parse(saved) : INITIAL_BUSINESS_CONFIG;
    } catch {
      return INITIAL_BUSINESS_CONFIG;
    }
  });

  // Services State
  const [services, setServices] = useState<ElectricalService[]>(INITIAL_SERVICES);

  // Gallery State (Persisted)
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('ebrima_gallery');
      return saved ? JSON.parse(saved) : INITIAL_GALLERY;
    } catch {
      return INITIAL_GALLERY;
    }
  });

  // Reviews State
  const [reviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);

  // Bookings State (Persisted)
  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    try {
      const saved = localStorage.getItem('ebrima_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // Enquiries State (Persisted)
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem('ebrima_enquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Hero Image State (Persisted)
  const [heroImage, setHeroImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('ebrima_hero_image');
      return saved || '/src/assets/images/ebrima_hero_banner_1792275875245.jpg';
    } catch {
      return '/src/assets/images/ebrima_hero_banner_1792275875245.jpg';
    }
  });

  // Exact Photo State from user (Persisted)
  const [exactPhoto, setExactPhoto] = useState<string>(() => {
    try {
      return localStorage.getItem('ebrima_exact_photo') || '';
    } catch {
      return '';
    }
  });

  // UI Navigation & Modals State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ebrima_business_config', JSON.stringify(business));
    } catch (e) {
      console.error(e);
    }
  }, [business]);

  useEffect(() => {
    try {
      localStorage.setItem('ebrima_gallery', JSON.stringify(gallery));
    } catch (e) {
      console.error(e);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem('ebrima_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('ebrima_enquiries', JSON.stringify(enquiries));
    } catch (e) {
      console.error(e);
    }
  }, [enquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('ebrima_hero_image', heroImage);
    } catch (e) {
      console.error(e);
    }
  }, [heroImage]);

  useEffect(() => {
    try {
      if (exactPhoto) {
        localStorage.setItem('ebrima_exact_photo', exactPhoto);
      }
    } catch (e) {
      console.error(e);
    }
  }, [exactPhoto]);

  const handleUploadExactPhoto = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setExactPhoto(dataUrl);
        setHeroImage(dataUrl);
        setGallery((prev) => [
          {
            id: `gal-exact-${Date.now()}`,
            title: 'Ebrima on Site - Circuit Breaker Wiring (Original Photo)',
            category: 'Electrical Wiring',
            image: dataUrl,
            description: 'Original photograph: Ebrima performing electrical installation work on site in The Gambia.',
            dateAdded: new Date().toISOString().split('T')[0],
          },
          ...prev,
        ]);
      }
    };
    reader.readAsDataURL(file);
  };

  // Global Drag/Drop and Paste listener so user can drop the photo anywhere
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.startsWith('image/')) {
            const file = items[i].getAsFile();
            if (file) handleUploadExactPhoto(file);
          }
        }
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer?.files?.[0] && e.dataTransfer.files[0].type.startsWith('image/')) {
        handleUploadExactPhoto(e.dataTransfer.files[0]);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    window.addEventListener('paste', handlePaste);
    window.addEventListener('drop', handleDrop);
    window.addEventListener('dragover', handleDragOver);

    return () => {
      window.removeEventListener('paste', handlePaste);
      window.removeEventListener('drop', handleDrop);
      window.removeEventListener('dragover', handleDragOver);
    };
  }, []);

  // Handler functions
  const handleOpenBooking = (serviceId?: string) => {
    setPreSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleBookingSubmitted = (newBooking: BookingRequest) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleEnquirySubmitted = (newEnquiry: ContactEnquiry) => {
    setEnquiries((prev) => [newEnquiry, ...prev]);
  };

  const handleUpdateBookingStatus = (
    id: string,
    status: BookingRequest['status'],
    notes?: string,
    newDate?: string,
    newTime?: string
  ) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        return {
          ...b,
          status,
          adminNotes: notes !== undefined ? notes : b.adminNotes,
          preferredDate: newDate || b.preferredDate,
          preferredTime: newTime || b.preferredTime,
        };
      })
    );
  };

  const handleDeleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const handleUpdateEnquiryStatus = (id: string, status: ContactEnquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  };

  const handleDeleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  };

  const handleAddGalleryItem = (item: GalleryItem) => {
    setGallery((prev) => [item, ...prev]);
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  const handleUpdateService = (updated: ElectricalService) => {
    setServices((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
  };

  const pendingBookingsCount = bookings.filter((b) => b.status === 'pending').length;

  const defaultWhatsAppUrl = `https://wa.me/${business.whatsappRaw}?text=${encodeURIComponent(
    'Hello Ebrima Electrical Services, I am interested in your electrical installation and repair services in The Gambia. Please provide me with more information.'
  )}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        business={business}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={handleOpenBooking}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        pendingBookingsCount={pendingBookingsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: HOME PAGE */}
        {activeTab === 'home' && (
          <>
            {/* Hero Section with Panoramic Breaker Panel Backdrop */}
            <Hero
              business={business}
              onOpenBooking={() => handleOpenBooking()}
              onExploreServices={() => setActiveTab('services')}
              customHeroImage={heroImage}
              onUpdateHeroImage={setHeroImage}
              exactPhoto={exactPhoto}
              onUploadExactPhoto={handleUploadExactPhoto}
            />

            {/* Behind the Scenes Spotlight Strip */}
            <section className="bg-slate-900 border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 text-center sm:text-left">
                  <div className="w-11 h-11 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-400">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold flex items-center justify-center sm:justify-start gap-2">
                      <span>Real Work, Real Workmanship</span>
                      <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full uppercase">
                        On Site
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Residing in Banjul &bull; Ready to travel to any town or village across The Gambia for your home or business.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setActiveTab('gallery')}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 transition-colors"
                  >
                    View Ebrima at Work &rarr;
                  </button>
                </div>
              </div>
            </section>

            {/* Welcome to Ebrima Electrical Services */}
            <section className="py-14 bg-slate-950 border-b border-slate-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-semibold tracking-wider uppercase border border-amber-400/20">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Welcome to Ebrima Electrical Services</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Professional Electrical Work for Homes and Businesses
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    At Ebrima Electrical Services, we believe that every home, family compound, retail shop, and office deserves safe, dependable, and durable electrical work. Staying in Banjul and available for assignments in any town or village across The Gambia, we bring precision, circuit safety testing, and quality finishing to every installation and repair.
                  </p>
                </div>
              </div>
            </section>

            {/* Popular Electrical Services Preview */}
            <section className="py-16 sm:py-20 bg-slate-900/60 border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-amber-400 tracking-wider mb-2">
                      <Zap className="w-4 h-4" />
                      <span>Most Popular Services</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Featured Electrical Services Across The Gambia
                    </h3>
                  </div>

                  <button
                    onClick={() => setActiveTab('services')}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>View all 8 services</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {services.slice(0, 4).map((svc) => (
                    <div
                      key={svc.id}
                      className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-amber-400/40 transition-all group"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                        <img
                          src={svc.image}
                          alt={svc.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors mb-2">
                            {svc.title}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                            {svc.shortDescription}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                          <button
                            onClick={() => handleOpenBooking(svc.id)}
                            className="text-xs font-bold text-amber-400 hover:text-amber-300"
                          >
                            Book Service &rarr;
                          </button>

                          <a
                            href={`https://wa.me/${business.whatsappRaw}?text=${encodeURIComponent(
                              `Hello Ebrima Electrical Services, I would like to enquire about ${svc.title} in Banjul.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/50"
                            title="WhatsApp Inquiry"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Why Customers Should Choose Us (Requirement 3 & 11) */}
            <WhyChooseUs onOpenBooking={() => handleOpenBooking()} />

            {/* Work Gallery Preview (Requirement 3 & 9) */}
            <section className="py-16 sm:py-20 bg-slate-950 border-b border-slate-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                      Recent Projects
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      Our Work Gallery
                    </h3>
                  </div>

                  <button
                    onClick={() => setActiveTab('gallery')}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300"
                  >
                    <span>Explore complete gallery ({gallery.length} photos)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gallery.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveTab('gallery')}
                      className="cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-amber-400/40 transition-all group"
                    >
                      <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-amber-300">
                          {item.category}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-white text-sm line-clamp-1 group-hover:text-amber-400 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials (Requirement 3) */}
            <Testimonials reviews={reviews} />

            {/* High-Impact Call to Action (Requirement 3) */}
            <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
                  Ready to assist you across The Gambia
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Have an Electrical Project or Fault in The Gambia?
                </h2>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                  Don't compromise on electrical safety. Whether you require a new installation, switch replacement, breaker maintenance, or urgent troubleshooting, Ebrima is ready to assist at your town or village.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => handleOpenBooking()}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base shadow-xl shadow-amber-400/20 transition-all hover:scale-105"
                  >
                    <Calendar className="w-5 h-5 text-slate-950" />
                    <span>Book an Electrician</span>
                  </button>

                  <a
                    href={defaultWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-xl shadow-emerald-600/20 transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                    <span>Chat on WhatsApp (+220 866863541)</span>
                  </a>
                </div>
              </div>
            </section>
          </>
        )}

        {/* VIEW 2: DEDICATED SERVICES PAGE */}
        {activeTab === 'services' && (
          <ServicesSection
            services={services}
            business={business}
            onBookService={(serviceId) => handleOpenBooking(serviceId)}
          />
        )}

        {/* VIEW 3: WORK GALLERY */}
        {activeTab === 'gallery' && (
          <WorkGallery
            galleryItems={gallery}
            business={business}
            onOpenBooking={() => handleOpenBooking()}
            onAddGalleryItem={handleAddGalleryItem}
            onDeleteGalleryItem={handleDeleteGalleryItem}
          />
        )}

        {/* VIEW 4: ABOUT US */}
        {activeTab === 'about' && (
          <AboutSection
            business={business}
            onOpenBooking={() => handleOpenBooking()}
            exactPhoto={exactPhoto}
            onUploadExactPhoto={handleUploadExactPhoto}
          />
        )}

        {/* VIEW 5: CONTACT & BANJUL LOCATION */}
        {activeTab === 'contact' && (
          <ContactSection
            business={business}
            onEnquirySubmitted={handleEnquirySubmitted}
          />
        )}
      </main>

      {/* Online Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
        business={business}
        preSelectedServiceId={preSelectedServiceId}
        onBookingSubmitted={handleBookingSubmitted}
      />

      {/* Business Owner Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogin={() => setIsAdminLoggedIn(true)}
        onLogout={() => setIsAdminLoggedIn(false)}
        bookings={bookings}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onDeleteBooking={handleDeleteBooking}
        enquiries={enquiries}
        onUpdateEnquiryStatus={handleUpdateEnquiryStatus}
        onDeleteEnquiry={handleDeleteEnquiry}
        business={business}
        onUpdateBusinessConfig={setBusiness}
        services={services}
        onUpdateService={handleUpdateService}
        gallery={gallery}
        onAddGalleryItem={handleAddGalleryItem}
        onDeleteGalleryItem={handleDeleteGalleryItem}
      />

      {/* Persistent Floating WhatsApp Button (Requirement 6) */}
      <FloatingWhatsApp business={business} />

      {/* Comprehensive Footer */}
      <Footer
        business={business}
        services={services}
        setActiveTab={setActiveTab}
        onOpenBooking={handleOpenBooking}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />
    </div>
  );
}
