/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BusinessConfig {
  name: string;
  location: string;
  whatsappNumber: string;
  whatsappRaw: string;
  phone: string;
  openingHours: string;
  serviceAreas: string[];
  announcement?: string;
}

export interface ElectricalService {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'installation' | 'repair' | 'maintenance' | 'specialized';
  image: string;
  features: string[];
  recommendedFor: string;
}

export interface BookingRequest {
  id: string;
  fullName: string;
  phoneNumber: string;
  serviceId: string;
  serviceTitle: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
  description: string;
  status: 'pending' | 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';
  createdAt: string;
  adminNotes?: string;
}

export interface ContactEnquiry {
  id: string;
  fullName: string;
  phoneNumber: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Electrical Wiring' | 'Lighting Installation' | 'Socket and Switch Installation' | 'Electrical Repairs' | 'Residential Projects' | 'Commercial Projects';
  image: string;
  description: string;
  dateAdded: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  roleOrLocation: string;
  rating: number;
  reviewText: string;
  serviceUsed: string;
  date: string;
}
