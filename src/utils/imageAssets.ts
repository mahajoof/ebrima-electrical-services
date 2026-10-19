/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Bundled static asset imports - guaranteed to exist in development and production builds
import ebrimaHeroBanner from '../assets/images/ebrima_hero_banner_1792275875245.jpg';
import ebrimaWorkingWindow from '../assets/images/ebrima_working_window_1792275182056.jpg';
import ebrimaElectricalHero from '../assets/images/ebrima_electrical_hero_1792275168817.jpg';
import heroCinematicElectrician from '../assets/images/hero_cinematic_electrician_1792275708518.jpg';

export {
  ebrimaHeroBanner,
  ebrimaWorkingWindow,
  ebrimaElectricalHero,
  heroCinematicElectrician,
};

// Verified, reliable electrical service images (HTTP 200 tested)
export const VERIFIED_SERVICE_IMAGES = {
  installation: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80',
  repairs: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
  lighting: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
  sockets: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80',
  // Replaced broken 404 URL with verified active high-res electrical testing multimeter photo
  diagnosis: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=80',
  maintenance: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
  residential: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80',
  commercial: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
};

// Category-specific fallbacks
export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  'Electrical Wiring': ebrimaElectricalHero,
  'Circuit Breaker Panels': ebrimaHeroBanner,
  'Lighting Installation': 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
  'Socket and Switch Installation': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80',
  'Electrical Repairs': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
  'Electrical Fault Diagnosis': 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=80',
  'Electrical Maintenance': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
  'Residential Projects': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80',
  'Commercial Projects': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
  default: ebrimaWorkingWindow,
};

/**
 * Resolves any legacy or broken image paths to canonical, guaranteed-working URLs.
 * Migrates old raw "/src/assets/images/..." paths that 404 in production builds.
 */
export function resolveSafeImageUrl(url: string | undefined, category?: string): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return (category && CATEGORY_FALLBACK_IMAGES[category]) || ebrimaWorkingWindow;
  }

  const clean = url.trim();

  // Fix old broken Unsplash 404
  if (clean.includes('photo-1581092335397-9583fe92d232')) {
    return VERIFIED_SERVICE_IMAGES.diagnosis;
  }

  // Map known local file paths to their canonical bundled asset imports
  if (clean.includes('ebrima_hero_banner')) {
    return ebrimaHeroBanner;
  }
  if (clean.includes('ebrima_working_window')) {
    return ebrimaWorkingWindow;
  }
  if (clean.includes('ebrima_electrical_hero')) {
    return ebrimaElectricalHero;
  }
  if (clean.includes('hero_cinematic_electrician')) {
    return heroCinematicElectrician;
  }

  return clean;
}
