/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GalleryItem } from '../types';

export const RAW_IMAGE_PATTERN =
  /whatsapp|image\s*202|2026|screenshot|img[_\-\s]?\d+|dsc[_\-\s]?\d+|photo[_\-\s]?\d+|pasted\s*image|\.(jpe?g|png|webp|avif|gif)|describe the job|completed electrical installation and repair project|image selected from device|untitled/i;

export interface WorkPreset {
  title: string;
  description: string;
  category: GalleryItem['category'];
}

export const EBRIMA_WORK_PRESETS: WorkPreset[] = [
  {
    title: 'Ebrima On Site: Miniature Circuit Breaker Assembly & Wiring',
    description:
      'On-site electrical work: Ebrima assembling, wiring, and testing miniature circuit breakers with red feed lines, precision terminal tightening, and safety grounding in The Gambia.',
    category: 'Electrical Wiring',
  },
  {
    title: 'Circuit Breaker Box & Terminal Connections',
    description:
      'Behind the scenes on site: Ebrima carefully wiring the circuit breaker panel, dressing incoming power lines, and securing terminal connections beside an ornamental window in The Gambia.',
    category: 'Electrical Wiring',
  },
  {
    title: 'Main Distribution Board Wiring & Safety Earthing',
    description:
      'Neat distribution board installation with clearly labelled circuit breakers, color-coded supply lines, and proper safety earthing to protect the premises against power surges.',
    category: 'Electrical Wiring',
  },
  {
    title: 'Conduit Cable Routing and Breaker Box Mounting',
    description:
      'On-site electrical installation: running high-capacity insulated cables through protective conduit piping and securely mounting the consumer unit to the wall.',
    category: 'Electrical Wiring',
  },
  {
    title: 'Electrical Fault Tracing & Circuit Diagnostics',
    description:
      'Systematic testing of circuit breakers and terminal connections to trace intermittent faults, prevent tripping, and ensure durable, safe power flow.',
    category: 'Electrical Repairs',
  },
  {
    title: 'Multi-Circuit Distribution Panel Commissioning',
    description:
      'Full electrical setup: organizing multiple circuit lines, balancing phase loads, and testing each circuit breaker before commissioning.',
    category: 'Commercial Projects',
  },
  {
    title: 'Heavy-Duty Power Socket & Appliance Line Installation',
    description:
      'Installation of dedicated switched socket outlets with heavy-duty insulated wiring for air conditioners, refrigerators, and workshop machinery.',
    category: 'Socket and Switch Installation',
  },
  {
    title: 'Indoor LED Ambient Lighting & Compound Security Floodlights',
    description:
      'Installation of bright energy-efficient ceiling fixtures and weatherproof outdoor compound floodlights with clean concealed wiring.',
    category: 'Lighting Installation',
  },
];

const CATEGORY_PRESETS: Record<string, { titles: string[]; descriptions: string[] }> = {
  'Electrical Wiring': {
    titles: [
      'Ebrima On Site: Miniature Circuit Breaker Assembly & Wiring',
      'Circuit Breaker Box & Terminal Connections',
      'Main Distribution Board Wiring & Safety Earthing',
      'Conduit Cable Routing and Breaker Box Mounting',
      'Wall-Mounted Consumer Unit & Circuit Protection Setup',
    ],
    descriptions: [
      'On-site electrical work: Ebrima assembling, wiring, and testing miniature circuit breakers with red feed lines, precision terminal tightening, and safety grounding in The Gambia.',
      'Behind the scenes on site: Ebrima carefully wiring the circuit breaker panel, dressing incoming power lines, and securing terminal connections beside an ornamental window in The Gambia.',
      'Neat distribution board installation with clearly labelled circuit breakers, color-coded supply lines, and proper safety earthing to protect the premises.',
      'On-site electrical installation: running insulated power lines through protective conduit piping and securely mounting the consumer unit.',
      'Precision terminal wiring, line dressing, and comprehensive safety commissioning of multi-breaker consumer units in The Gambia.',
    ],
  },
  'Electrical Repairs': {
    titles: [
      'Electrical Fault Tracing & Circuit Diagnostics',
      'On-Site Breaker Replacement & Terminal Rewiring',
      'Diagnosing Tripping Breakers & Power Fluctuations',
      'Safe Replacement of Burnt Connections & Terminals',
    ],
    descriptions: [
      'Systematic testing of circuit breakers and terminal connections to trace intermittent faults, prevent tripping, and ensure safe power flow.',
      'Troubleshooting damaged connections, replacing worn circuit breakers, and restoring full electrical safety on site in The Gambia.',
      'Using diagnostic testing meters to trace short circuits, isolate faults, and ensure stable voltage across all outlets.',
      'Emergency inspection, isolating hazardous connections, and rewiring terminals with heat-resistant materials.',
    ],
  },
  'Lighting Installation': {
    titles: [
      'Indoor LED Ambient Lighting & Compound Security Floodlights',
      'Modern Ceiling Downlights & Recessed Spotlights',
      'Outdoor Compound Perimeter Security Floodlights',
      'Energy-Saving LED Fixture Fitting & Switch Setup',
    ],
    descriptions: [
      'Installation of bright energy-efficient ceiling fixtures and weatherproof outdoor compound floodlights with clean concealed wiring.',
      'Recessed ceiling spotlights with smooth dimmer switches for clean, modern residential and commercial lighting.',
      'High-lumen weatherproof floodlights mounted with day/night sensors for complete compound security and perimeter visibility.',
      'Upgrading outdated fixtures to modern high-efficiency LED lights with balanced illumination across every room.',
    ],
  },
  'Socket and Switch Installation': {
    titles: [
      'Heavy-Duty Power Socket & Appliance Line Installation',
      'Modern Flush-Mounted Wall Switches & 13A Sockets',
      'Dedicated AC & Refrigerator Power Point Fitting',
      'Weatherproof Outdoor Socket & Switch Assembly',
    ],
    descriptions: [
      'Installation of dedicated switched socket outlets with heavy-duty insulated wiring for air conditioners, refrigerators, and heavy equipment.',
      'Adding clean flush-mounted double sockets and 2-way staircase switches with durable faceplates in homes and offices.',
      'Safe wiring of dedicated high-amperage isolator switches and appliance power points to prevent line overloading.',
      'Water-resistant outdoor socket enclosures for garden, compound, and garage power access in The Gambia.',
    ],
  },
  'Residential Projects': {
    titles: [
      'Residential Compound Electrical Installation on Site',
      'Complete Home Rewiring & Circuit Breaker Assembly',
      'Family Compound Inverter & Backup Generator Switch Setup',
      'Private Residence Electrical Safety Upgrade',
    ],
    descriptions: [
      'Comprehensive electrical installation for houses and family compounds: circuit breaker wiring, conduit routing, and light fitting.',
      'Full home electrical overhaul with color-coded safety cables, miniature circuit breakers, and earthing protection in The Gambia.',
      'Manual transfer switches and dedicated backup wiring for inverters and generator power during local power cuts.',
      'Replacing aged aluminum or damaged wiring with high-grade copper cables and modern circuit protection devices.',
    ],
  },
  'Commercial Projects': {
    titles: [
      'Multi-Circuit Distribution Panel Commissioning',
      'Commercial Retail Shop Electrical Wiring and Breakers',
      'Office Space Power Distribution & Workstation Points',
      'Market Stall & Business Electrical Overhaul',
    ],
    descriptions: [
      'Full commercial electrical setup: organizing multiple circuit lines, balancing phase loads, and testing each circuit breaker before commissioning.',
      'Safe high-capacity electrical wiring and showcase lighting for retail stores and commercial storefronts in The Gambia.',
      'Clean power trunking, dedicated surge-protected computer sockets, and breaker panels for office workspaces.',
      'Reliable electrical installations designed for continuous daily commercial operation without downtime.',
    ],
  },
};

export function isRawWhatsAppOrFilename(str?: string): boolean {
  if (!str) return true;
  const trimmed = str.trim();
  if (trimmed.length === 0) return true;
  return RAW_IMAGE_PATTERN.test(trimmed);
}

export function getCleanWorkTitle(title: string | undefined, category: string, index = 0): string {
  if (!title || isRawWhatsAppOrFilename(title)) {
    const categoryGroup = CATEGORY_PRESETS[category] || CATEGORY_PRESETS['Electrical Wiring'];
    const titles = categoryGroup.titles;
    return titles[index % titles.length];
  }
  return title.trim();
}

export function getCleanWorkDescription(
  desc: string | undefined,
  category: string,
  index = 0
): string {
  if (!desc || isRawWhatsAppOrFilename(desc)) {
    const categoryGroup = CATEGORY_PRESETS[category] || CATEGORY_PRESETS['Electrical Wiring'];
    const descriptions = categoryGroup.descriptions;
    return descriptions[index % descriptions.length];
  }
  return desc.trim();
}

/**
 * Ensures a gallery item has professional, authentic titles and descriptions
 * reflecting the actual electrical work on site instead of WhatsApp filenames or codes.
 */
export function cleanGalleryItem(item: GalleryItem, index = 0): GalleryItem {
  const title = getCleanWorkTitle(item.title, item.category, index);
  const description = getCleanWorkDescription(item.description, item.category, index);

  return {
    ...item,
    title,
    description,
  };
}

/**
 * Sanitizes an array of gallery items, stripping any residual WhatsApp 2026 image strings.
 */
export function cleanGalleryList(items: GalleryItem[]): GalleryItem[] {
  return items.map((item, idx) => cleanGalleryItem(item, idx));
}
