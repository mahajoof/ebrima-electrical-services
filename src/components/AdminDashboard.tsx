/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Edit,
  Save,
  Trash2,
  Plus,
  RefreshCw,
  LogOut,
  ChevronRight,
  Shield,
  Layers,
  Inbox,
  Settings,
  Image as ImageIcon,
  Check,
  Search,
  Download,
  Upload,
} from 'lucide-react';
import {
  BookingRequest,
  BusinessConfig,
  ContactEnquiry,
  ElectricalService,
  GalleryItem,
} from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  bookings: BookingRequest[];
  onUpdateBookingStatus: (
    id: string,
    status: BookingRequest['status'],
    notes?: string,
    newDate?: string,
    newTime?: string
  ) => void;
  onDeleteBooking: (id: string) => void;
  enquiries: ContactEnquiry[];
  onUpdateEnquiryStatus: (id: string, status: ContactEnquiry['status']) => void;
  onDeleteEnquiry: (id: string) => void;
  business: BusinessConfig;
  onUpdateBusinessConfig: (updated: BusinessConfig) => void;
  services: ElectricalService[];
  onUpdateService: (updated: ElectricalService) => void;
  gallery: GalleryItem[];
  onAddGalleryItem: (item: GalleryItem) => void;
  onDeleteGalleryItem: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  isAdminLoggedIn,
  onLogin,
  onLogout,
  bookings,
  onUpdateBookingStatus,
  onDeleteBooking,
  enquiries,
  onUpdateEnquiryStatus,
  onDeleteEnquiry,
  business,
  onUpdateBusinessConfig,
  services,
  onUpdateService,
  gallery,
  onAddGalleryItem,
  onDeleteGalleryItem,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'bookings' | 'enquiries' | 'settings' | 'gallery' | 'services'>('bookings');

  // Booking filters & search
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('all');
  const [bookingSearch, setBookingSearch] = useState('');
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');

  // Business config edit state
  const [configForm, setConfigForm] = useState<BusinessConfig>({ ...business });
  const [configSaved, setConfigSaved] = useState(false);

  // New Gallery item form
  const [showAddGallery, setShowAddGallery] = useState(false);
  const [newGalTitle, setNewGalTitle] = useState('');
  const [newGalCategory, setNewGalCategory] = useState<GalleryItem['category']>('Electrical Wiring');
  const [newGalImage, setNewGalImage] = useState('');
  const [newGalDesc, setNewGalDesc] = useState('');

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '2200' || pinInput.trim() === 'admin') {
      onLogin();
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBusinessConfig(configForm);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 2500);
  };

  const handleAddGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalTitle.trim() || !newGalImage.trim()) return;

    const newItem: GalleryItem = {
      id: `gal-${Date.now().toString().slice(-4)}`,
      title: newGalTitle.trim(),
      category: newGalCategory,
      image: newGalImage.trim(),
      description: newGalDesc.trim() || 'Work completed in Banjul.',
      dateAdded: new Date().toISOString().split('T')[0],
    };

    onAddGalleryItem(newItem);
    setNewGalTitle('');
    setNewGalImage('');
    setNewGalDesc('');
    setShowAddGallery(false);
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = bookingStatusFilter === 'all' || b.status === bookingStatusFilter;
    const matchesSearch =
      b.fullName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.phoneNumber.includes(bookingSearch) ||
      b.serviceTitle.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.location.toLowerCase().includes(bookingSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getCustomerWhatsAppUrl = (phone: string, name: string, serviceTitle: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const message = `Hello ${name}, this is Ebrima from Ebrima Electrical Services in Banjul regarding your booking request for ${serviceTitle}.`;
    return `https://wa.me/${cleanPhone.startsWith('220') ? cleanPhone : '220' + cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const exportBookingsJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(bookings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ebrima_electrical_bookings_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">Business Owner Portal</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 font-semibold">
                  Ebrima Electrical Services
                </span>
              </div>
              <p className="text-xs text-slate-400">Manage bookings, customer requests, gallery, and settings</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-950/40 text-slate-300 hover:text-red-400 text-xs font-semibold border border-slate-700 transition-colors"
                title="Lock portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lock / Log Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Barrier if Not Logged In */}
        {!isAdminLoggedIn ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-white">Owner Authentication</h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                This dashboard is protected for the business owner to manage private bookings and customer enquiries.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter 4-digit Security PIN"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  className="w-full text-center text-lg tracking-widest px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 transition-colors"
                  maxLength={10}
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-red-400 mt-2">Incorrect PIN. Please try again.</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md shadow-amber-400/20 transition-all"
              >
                Unlock Dashboard
              </button>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setPinInput('2200')}
                  className="text-xs text-slate-400 hover:text-amber-400 underline"
                >
                  Quick Demo Access: Auto-fill PIN (2200)
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard View */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Admin Nav Tabs */}
            <div className="bg-slate-950/60 border-b border-slate-800 px-4 sm:px-6 flex items-center gap-1 overflow-x-auto py-2">
              <button
                onClick={() => setActiveAdminTab('bookings')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeAdminTab === 'bookings'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Customer Bookings ({bookings.length})</span>
                {bookings.filter((b) => b.status === 'pending').length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[10px]">
                    {bookings.filter((b) => b.status === 'pending').length} new
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveAdminTab('enquiries')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeAdminTab === 'enquiries'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <Inbox className="w-4 h-4" />
                <span>Enquiries ({enquiries.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('gallery')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeAdminTab === 'gallery'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Gallery Photos ({gallery.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('settings')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeAdminTab === 'settings'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Business Info &amp; Settings</span>
              </button>
            </div>

            {/* Admin Tab Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* TAB 1: BOOKINGS */}
              {activeAdminTab === 'bookings' && (
                <div className="space-y-6">
                  {/* Controls: Search, Status filter, Export */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-slate-400 font-semibold">Filter:</span>
                      {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setBookingStatusFilter(st)}
                          className={`text-xs px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                            bookingStatusFilter === st
                              ? 'bg-amber-400 text-slate-950 font-bold'
                              : 'bg-slate-900 text-slate-300 hover:text-white'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="relative flex-1 md:w-56">
                        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search bookings..."
                          value={bookingSearch}
                          onChange={(e) => setBookingSearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <button
                        onClick={exportBookingsJson}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 whitespace-nowrap"
                        title="Download Bookings as JSON"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>

                  {/* Bookings List */}
                  {filteredBookings.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl bg-slate-950 border border-slate-800">
                      <Calendar className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                      <p className="text-slate-300 font-semibold text-sm">No bookings found</p>
                      <p className="text-xs text-slate-500 mt-1">
                        When customers submit the online booking form, their requests will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredBookings.map((b) => (
                        <div
                          key={b.id}
                          className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 hover:border-slate-700 transition-all"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                            <div className="flex items-center gap-2.5">
                              <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                                {b.id}
                              </span>
                              <h4 className="text-base font-bold text-white">{b.fullName}</h4>
                              <span className="text-xs text-slate-400">({b.phoneNumber})</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                                  b.status === 'confirmed'
                                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                    : b.status === 'pending'
                                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                    : b.status === 'completed'
                                    ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                                    : 'bg-red-500/15 text-red-400 border border-red-500/30'
                                }`}
                              >
                                {b.status}
                              </span>
                              <span className="text-xs text-slate-500">{b.createdAt}</span>
                            </div>
                          </div>

                          {/* Details Row */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                            <div>
                              <span className="text-slate-500 block">Service:</span>
                              <span className="font-semibold text-white">{b.serviceTitle}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block">Date &amp; Time:</span>
                              <span className="font-semibold text-white">
                                {b.preferredDate} &bull; {b.preferredTime}
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-500 block">Location:</span>
                              <span className="font-semibold text-white">{b.location}</span>
                            </div>
                          </div>

                          {/* Description box */}
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-300">
                            <span className="font-semibold text-slate-400 block mb-1">Problem Description:</span>
                            <p>{b.description}</p>
                          </div>

                          {/* Admin Notes if any */}
                          {b.adminNotes && (
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                              <span className="font-bold">Owner Note: </span>
                              {b.adminNotes}
                            </div>
                          )}

                          {/* Actions Row */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            {/* Contact Customer via WhatsApp */}
                            <div className="flex items-center gap-2">
                              <a
                                href={getCustomerWhatsAppUrl(b.phoneNumber, b.fullName, b.serviceTitle)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/30 text-xs font-semibold"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp Customer</span>
                              </a>
                              <a
                                href={`tel:${b.phoneNumber}`}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                <span>Call</span>
                              </a>
                            </div>

                            {/* Status controls */}
                            <div className="flex flex-wrap items-center gap-2">
                              {b.status !== 'confirmed' && (
                                <button
                                  onClick={() => onUpdateBookingStatus(b.id, 'confirmed')}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Confirm</span>
                                </button>
                              )}

                              {b.status !== 'completed' && (
                                <button
                                  onClick={() => onUpdateBookingStatus(b.id, 'completed')}
                                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs"
                                >
                                  Mark Completed
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  if (editingBookingId === b.id) {
                                    setEditingBookingId(null);
                                  } else {
                                    setEditingBookingId(b.id);
                                    setEditNotes(b.adminNotes || '');
                                    setRescheduleDate(b.preferredDate);
                                    setRescheduleTime(b.preferredTime);
                                  }
                                }}
                                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800"
                              >
                                {editingBookingId === b.id ? 'Close Edit' : 'Edit / Note'}
                              </button>

                              {b.status !== 'cancelled' && (
                                <button
                                  onClick={() => onUpdateBookingStatus(b.id, 'cancelled')}
                                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-red-950/40 text-red-400 text-xs font-medium border border-slate-800"
                                >
                                  Cancel
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  if (confirm('Delete this booking record permanently?')) {
                                    onDeleteBooking(b.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-900"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Inline Edit & Reschedule Panel */}
                          {editingBookingId === b.id && (
                            <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 space-y-3 mt-3">
                              <h5 className="text-xs font-bold text-amber-400">Update Booking &amp; Reschedule</h5>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[11px] text-slate-400 mb-1">Reschedule Date</label>
                                  <input
                                    type="date"
                                    value={rescheduleDate}
                                    onChange={(e) => setRescheduleDate(e.target.value)}
                                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] text-slate-400 mb-1">Time Slot</label>
                                  <input
                                    type="text"
                                    value={rescheduleTime}
                                    onChange={(e) => setRescheduleTime(e.target.value)}
                                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-[11px] text-slate-400 mb-1">Internal Notes</label>
                                <textarea
                                  rows={2}
                                  value={editNotes}
                                  onChange={(e) => setEditNotes(e.target.value)}
                                  placeholder="Add notes for yourself (e.g., parts required, customer phoned...)"
                                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white resize-none"
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    onUpdateBookingStatus(
                                      b.id,
                                      rescheduleDate !== b.preferredDate ? 'rescheduled' : b.status,
                                      editNotes,
                                      rescheduleDate,
                                      rescheduleTime
                                    );
                                    setEditingBookingId(null);
                                  }}
                                  className="px-4 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs"
                                >
                                  Save Updates
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: ENQUIRIES */}
              {activeAdminTab === 'enquiries' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white mb-2">Customer Messages from Contact Form</h4>
                  {enquiries.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl bg-slate-950 border border-slate-800">
                      <Inbox className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                      <p className="text-slate-300 font-semibold text-sm">No enquiries yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {enquiries.map((enq) => (
                        <div key={enq.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                            <div>
                              <span className="font-bold text-white text-sm">{enq.fullName}</span>
                              <span className="text-xs text-slate-400 ml-2">({enq.phoneNumber})</span>
                            </div>
                            <span className="text-xs text-slate-500">{enq.createdAt}</span>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-amber-400">Subject: {enq.subject}</span>
                            <p className="text-xs text-slate-300 mt-1">{enq.message}</p>
                          </div>
                          <div className="pt-2 flex items-center justify-between">
                            <a
                              href={`https://wa.me/${enq.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hello ${enq.fullName}, this is Ebrima from Ebrima Electrical Services responding to your website enquiry regarding "${enq.subject}".`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Reply on WhatsApp</span>
                            </a>
                            <button
                              onClick={() => onDeleteEnquiry(enq.id)}
                              className="text-slate-500 hover:text-red-400 p-1"
                              title="Delete enquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: GALLERY PHOTOS */}
              {activeAdminTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white">Manage Completed Work Photos</h4>
                      <p className="text-xs text-slate-400">Add or remove images displayed on the public Work Gallery page</p>
                    </div>
                    <button
                      onClick={() => setShowAddGallery(!showAddGallery)}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{showAddGallery ? 'Cancel' : 'Add New Photo'}</span>
                    </button>
                  </div>

                  {/* Add Photo Form */}
                  {showAddGallery && (
                    <form onSubmit={handleAddGallerySubmit} className="p-5 rounded-2xl bg-slate-950 border border-amber-400/30 space-y-4">
                      <h5 className="text-sm font-bold text-white">Upload / Add New Work Photo</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Project Title</label>
                          <input
                            type="text"
                            placeholder="e.g. Modern Office Wiring in Banjul"
                            value={newGalTitle}
                            onChange={(e) => setNewGalTitle(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Category</label>
                          <select
                            value={newGalCategory}
                            onChange={(e) => setNewGalCategory(e.target.value as any)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                          >
                            <option value="Electrical Wiring">Electrical Wiring</option>
                            <option value="Lighting Installation">Lighting Installation</option>
                            <option value="Socket and Switch Installation">Socket and Switch Installation</option>
                            <option value="Electrical Repairs">Electrical Repairs</option>
                            <option value="Residential Projects">Residential Projects</option>
                            <option value="Commercial Projects">Commercial Projects</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs text-slate-300">Image Source (File or URL)</label>
                          <label className="cursor-pointer text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                            <Upload className="w-3 h-3" />
                            <span>Select Photo from Device</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (ev) => {
                                    if (ev.target?.result) {
                                      setNewGalImage(ev.target.result as string);
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          placeholder="Paste image URL or click 'Select Photo from Device' above..."
                          value={newGalImage.startsWith('data:') ? 'Image selected from device' : newGalImage}
                          onChange={(e) => setNewGalImage(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                          required
                        />
                        {newGalImage && (
                          <div className="mt-2 w-24 h-24 rounded-lg overflow-hidden border border-slate-700 bg-slate-950">
                            <img src={newGalImage} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Short Description</label>
                        <input
                          type="text"
                          placeholder="Describe the job and location..."
                          value={newGalDesc}
                          onChange={(e) => setNewGalDesc(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                        >
                          Add to Work Gallery
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Existing Photos Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {gallery.map((g) => (
                      <div key={g.id} className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between">
                        <div className="aspect-[4/3] bg-slate-900 relative">
                          <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
                          <button
                            onClick={() => onDeleteGalleryItem(g.id)}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="p-3">
                          <span className="text-[10px] text-amber-400 font-semibold">{g.category}</span>
                          <h5 className="font-bold text-white text-xs line-clamp-1 mt-0.5">{g.title}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: SETTINGS */}
              {activeAdminTab === 'settings' && (
                <form onSubmit={handleSaveConfig} className="space-y-6 max-w-2xl">
                  <div>
                    <h4 className="text-base font-bold text-white">Update Business Information</h4>
                    <p className="text-xs text-slate-400">
                      Changes here will immediately update across the entire website and all WhatsApp bridges.
                    </p>
                  </div>

                  {configSaved && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>Business information updated successfully!</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Business Name</label>
                      <input
                        type="text"
                        value={configForm.name}
                        onChange={(e) => setConfigForm({ ...configForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                        <input
                          type="text"
                          value={configForm.location}
                          onChange={(e) => setConfigForm({ ...configForm, location: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          WhatsApp Display Number
                        </label>
                        <input
                          type="text"
                          value={configForm.whatsappNumber}
                          onChange={(e) => setConfigForm({ ...configForm, whatsappNumber: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        WhatsApp Raw Number (digits only, e.g. 220866863541)
                      </label>
                      <input
                        type="text"
                        value={configForm.whatsappRaw}
                        onChange={(e) => setConfigForm({ ...configForm, whatsappRaw: e.target.value.replace(/[^0-9]/g, '') })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Opening Hours</label>
                      <input
                        type="text"
                        value={configForm.openingHours}
                        onChange={(e) => setConfigForm({ ...configForm, openingHours: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Service Coverage Areas (comma separated)
                      </label>
                      <input
                        type="text"
                        value={configForm.serviceAreas.join(', ')}
                        onChange={(e) =>
                          setConfigForm({
                            ...configForm,
                            serviceAreas: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-400/20"
                    >
                      Save Settings
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
