/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  Navigation,
} from 'lucide-react';
import { BusinessConfig, ContactEnquiry } from '../types';

interface ContactSectionProps {
  business: BusinessConfig;
  onEnquirySubmitted: (enquiry: ContactEnquiry) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  business,
  onEnquirySubmitted,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [formError, setFormError] = useState('');

  const whatsappDirectUrl = `https://wa.me/${business.whatsappRaw}?text=${encodeURIComponent(
    'Hello Ebrima Electrical Services, I would like to get in touch regarding electrical services in The Gambia.'
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim() || !message.trim()) {
      setFormError('Please fill in your name, phone number, and message.');
      return;
    }

    setFormError('');
    const newEnquiry: ContactEnquiry = {
      id: `ENQ-${Date.now().toString().slice(-4)}`,
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      subject,
      message: message.trim(),
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'new',
    };

    onEnquirySubmitted(newEnquiry);
    setIsSent(true);
  };

  const getWhatsAppEnquiryUrl = () => {
    const text = `*NEW CONTACT ENQUIRY*
*Name:* ${fullName}
*Phone:* ${phoneNumber}
*Subject:* ${subject}
*Message:* ${message}

_Hello Ebrima Electrical Services, I am submitting this inquiry from your website._`;
    return `https://wa.me/${business.whatsappRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact-section" className="py-16 sm:py-24 bg-slate-900/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3 border border-amber-400/20">
            <MapPin className="w-3.5 h-3.5" />
            <span>Contact &amp; Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get in Touch with Ebrima Electrical Services
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Have a question, need an urgent electrical repair, or want to discuss a new installation? Reach out directly via WhatsApp, phone, or send an enquiry below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Confirmed Business Contact Info & Banjul Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Confirmed Details Card */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-slate-800/80 pb-3 flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-400" />
                <span>Business Information</span>
              </h3>

              <div className="space-y-4 text-sm">
                {/* Business Name */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Business Name</span>
                    <span className="font-bold text-white text-base">{business.name}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Location</span>
                    <span className="font-semibold text-white">{business.location}</span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Staying in Banjul &bull; Available to travel to any town or village across The Gambia
                    </span>
                  </div>
                </div>

                {/* WhatsApp & Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">WhatsApp &amp; Phone Contact</span>
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-400 hover:text-emerald-300 text-base block"
                    >
                      {business.whatsappNumber}
                    </a>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Quickest response time via WhatsApp message
                    </span>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Opening Hours</span>
                    <span className="font-semibold text-white block">{business.openingHours}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Call to Action */}
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>Chat on WhatsApp (+220 866863541)</span>
              </a>
            </div>

            {/* Service Coverage Areas */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Service Coverage Areas</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {business.serviceAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Map Showing Banjul, The Gambia */}
            <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300 px-2 pt-1">
                <span className="font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Banjul, The Gambia
                </span>
                <span className="text-slate-500">Capital City</span>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[16/10] border border-slate-800 relative bg-slate-900">
                <iframe
                  title="Banjul The Gambia Location Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-16.6150%2C13.4350%2C-16.5550%2C13.4750&amp;layer=mapnik&amp;marker=13.4549%2C-16.5790"
                  className="w-full h-full border-0 filter invert contrast-125 opacity-80"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/90 backdrop-blur-sm p-2 rounded-xl text-[11px] text-slate-300 border border-slate-800 flex items-center justify-between">
                  <span>Banjul Island &amp; Greater Banjul Area</span>
                  <span className="text-amber-400 font-bold">+220 866863541</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white">Send a Message</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Fill in your details below. You can also send this inquiry directly to our WhatsApp.
                </p>
              </div>

              {isSent ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Message Sent Successfully!</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, {fullName}. We have received your enquiry and will respond to your phone number ({phoneNumber}) shortly.
                  </p>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppEnquiryUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-slate-950 text-emerald-500" />
                      <span>Forward to WhatsApp</span>
                    </a>

                    <button
                      onClick={() => {
                        setIsSent(false);
                        setMessage('');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Full Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Awa Camara"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Phone / WhatsApp Number <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +220 7891234"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Electrical Installation Quote">Electrical Installation Quote</option>
                      <option value="Urgent Electrical Repair">Urgent Electrical Repair</option>
                      <option value="Commercial Shop / Office Service">Commercial Shop / Office Service</option>
                      <option value="Routine Maintenance Check">Routine Maintenance Check</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Message <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your message, questions, or address details here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">
                      We respect your privacy and will never share your details.
                    </span>

                    <button
                      type="submit"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md shadow-amber-400/20 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Enquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
