/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  FileText,
  AlertCircle,
  CheckCircle2,
  MessageCircle,
  ShieldAlert,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { ElectricalService, BookingRequest, BusinessConfig } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ElectricalService[];
  business: BusinessConfig;
  preSelectedServiceId?: string;
  onBookingSubmitted: (booking: BookingRequest) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  business,
  preSelectedServiceId,
  onBookingSubmitted,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (8:00 AM – 12:00 PM)');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<BookingRequest | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preSelectedServiceId) {
      setServiceId(preSelectedServiceId);
    } else if (services.length > 0 && !serviceId) {
      setServiceId(services[0].id);
    }
  }, [preSelectedServiceId, services]);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setPreferredDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  if (!isOpen) return null;

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Please provide a contact phone number';
    } else if (phoneNumber.trim().length < 7) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!serviceId) errors.serviceId = 'Please select a service';
    if (!preferredDate) errors.preferredDate = 'Please select a preferred date';
    if (!location.trim()) errors.location = 'Please specify your location or address in Banjul / surrounding area';
    if (!description.trim()) errors.description = 'Please describe the electrical work or issue';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const selectedService = services.find((s) => s.id === serviceId);
    const serviceTitle = selectedService ? selectedService.title : 'General Electrical Work';

    const newBooking: BookingRequest = {
      id: `BK-${Date.now().toString().slice(-5)}`,
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      serviceId,
      serviceTitle,
      preferredDate,
      preferredTime,
      location: location.trim(),
      description: description.trim(),
      status: 'pending',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    setTimeout(() => {
      onBookingSubmitted(newBooking);
      setSubmittedBooking(newBooking);
      setIsSubmitting(false);
    }, 400);
  };

  const handleResetAndClose = () => {
    setSubmittedBooking(null);
    setFullName('');
    setPhoneNumber('');
    setDescription('');
    setLocation('');
    setFormErrors({});
    onClose();
  };

  const getWhatsAppBookingUrl = (booking: BookingRequest) => {
    const message = `*NEW ELECTRICAL BOOKING REQUEST*
*Ref:* ${booking.id}
*Name:* ${booking.fullName}
*Phone:* ${booking.phoneNumber}
*Service:* ${booking.serviceTitle}
*Date:* ${booking.preferredDate}
*Time Slot:* ${booking.preferredTime}
*Location/Address:* ${booking.location}
*Description:* ${booking.description}

_Hello Ebrima Electrical Services, I have submitted this appointment request online and would like to confirm availability._`;

    return `https://wa.me/${business.whatsappRaw}?text=${encodeURIComponent(message)}`;
  };

  const quickLocations = [
    'Banjul Central',
    'Near Albert Market',
    'Half Die',
    'Campama',
    'Box Bar Road',
    'Kanifing Area',
    'Serrekunda Area',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 shadow-md shadow-amber-400/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Book an Electrician</h3>
              <p className="text-xs text-slate-400">Ebrima Electrical Services &bull; Banjul, The Gambia</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto space-y-6">
          {submittedBooking ? (
            /* Confirmation Receipt View */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Request Received &bull; Reference #{submittedBooking.id}
                </span>
                <h4 className="text-2xl font-extrabold text-white mt-3">
                  Thank You, {submittedBooking.fullName}!
                </h4>
                <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                  Your booking request has been saved and made available to Ebrima. Please note that an appointment is considered tentative until confirmed by the business.
                </p>
              </div>

              {/* Booking Details Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left text-xs sm:text-sm space-y-2 text-slate-300">
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Requested Service:</span>
                  <span className="font-semibold text-white">{submittedBooking.serviceTitle}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Preferred Date &amp; Time:</span>
                  <span className="font-semibold text-white">
                    {submittedBooking.preferredDate} ({submittedBooking.preferredTime})
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-semibold text-white">{submittedBooking.location}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400">Contact Number:</span>
                  <span className="font-semibold text-amber-400">{submittedBooking.phoneNumber}</span>
                </div>
              </div>

              {/* Instant WhatsApp bridge action */}
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 text-left">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-white">Speed up your confirmation via WhatsApp</h5>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Send your pre-filled booking summary directly to Ebrima on WhatsApp for quick scheduling and immediate questions.
                    </p>
                    <a
                      href={getWhatsAppBookingUrl(submittedBooking)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3.5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20"
                    >
                      <MessageCircle className="w-4 h-4 fill-slate-950 text-emerald-500" />
                      <span>Send Booking to WhatsApp (+220 866863541)</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium transition-colors"
                >
                  Done &amp; Return to Website
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Important Confirmation Notice Requirement */}
              <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-start gap-3 text-xs text-amber-300 leading-relaxed">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Booking Request Notice: </span>
                  Submitting this form sends an appointment request. Ebrima Electrical Services will contact you by phone or WhatsApp to verify availability and confirm the final time slot.
                </div>
              </div>

              {/* Full Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Full Name <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Lamin Sanneh"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border ${
                        formErrors.fullName ? 'border-red-500' : 'border-slate-800'
                      } text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors`}
                    />
                  </div>
                  {formErrors.fullName && (
                    <p className="text-xs text-red-400 mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Phone Number (WhatsApp) <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="e.g. +220 7891234 or 8668635"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border ${
                        formErrors.phoneNumber ? 'border-red-500' : 'border-slate-800'
                      } text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors`}
                    />
                  </div>
                  {formErrors.phoneNumber && (
                    <p className="text-xs text-red-400 mt-1">{formErrors.phoneNumber}</p>
                  )}
                </div>
              </div>

              {/* Service Required */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Service Required <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <Zap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {services.map((svc) => (
                      <option key={svc.id} value={svc.id}>
                        {svc.title}
                      </option>
                    ))}
                    <option value="other">Other / Custom Electrical Work</option>
                  </select>
                </div>
                {formErrors.serviceId && (
                  <p className="text-xs text-red-400 mt-1">{formErrors.serviceId}</p>
                )}
              </div>

              {/* Preferred Date & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Preferred Date <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border ${
                        formErrors.preferredDate ? 'border-red-500' : 'border-slate-800'
                      } text-white text-sm focus:outline-none focus:border-amber-400 transition-colors`}
                    />
                  </div>
                  {formErrors.preferredDate && (
                    <p className="text-xs text-red-400 mt-1">{formErrors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="Morning (8:00 AM – 12:00 PM)">Morning (8:00 AM – 12:00 PM)</option>
                      <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                      <option value="Late Afternoon (4:00 PM – 7:00 PM)">Late Afternoon (4:00 PM – 7:00 PM)</option>
                      <option value="Emergency / As soon as possible">Emergency / ASAP Callout</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Location or Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Location, Town, or Village in The Gambia <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Banjul, Serrekunda, Brikama, Barra, Farafenni, or your village"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border ${
                      formErrors.location ? 'border-red-500' : 'border-slate-800'
                    } text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors`}
                  />
                </div>
                {formErrors.location && (
                  <p className="text-xs text-red-400 mt-1">{formErrors.location}</p>
                )}

                {/* Quick location chips */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[11px] text-slate-500">Quick select:</span>
                  {[
                    'Banjul (Central/Half Die)',
                    'Serrekunda & Latrikunda',
                    'Bakau & Coastal Areas',
                    'Brikama & West Coast',
                    'North Bank (Barra/Farafenni)',
                    'Upcountry Town/Village',
                  ].map((loc) => (
                    <button
                      type="button"
                      key={loc}
                      onClick={() => setLocation(loc)}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description of the electrical problem */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Description of Electrical Problem or Installation <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <textarea
                    rows={3}
                    placeholder="Please tell us what needs fixing or installing (e.g., spark at socket, breaker keeps tripping, installing new compound lighting...)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border ${
                      formErrors.description ? 'border-red-500' : 'border-slate-800'
                    } text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none`}
                  />
                </div>
                {formErrors.description && (
                  <p className="text-xs text-red-400 mt-1">{formErrors.description}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold shadow-md shadow-amber-400/20 transition-all disabled:opacity-50"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Request...' : 'Submit Booking Request'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
