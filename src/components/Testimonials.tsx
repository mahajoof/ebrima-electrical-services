/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, Quote, CheckCircle2, MessageSquare } from 'lucide-react';
import { CustomerReview } from '../types';

interface TestimonialsProps {
  reviews: CustomerReview[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ reviews }) => {
  return (
    <section className="py-16 sm:py-24 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3 border border-amber-400/20">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Customer Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Real feedback from residents, shop owners, and property managers who have trusted Ebrima Electrical Services for installations and repair jobs across The Gambia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <Quote className="w-6 h-6 text-slate-700 mb-2" />

                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-4">
                  "{rev.reviewText}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                  <span>{rev.author}</span>
                  <span title="Verified Customer">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                </div>
                <div className="text-xs text-amber-400/90 font-medium mt-0.5">
                  {rev.roleOrLocation}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>{rev.serviceUsed}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
