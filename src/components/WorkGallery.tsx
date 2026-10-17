/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  Layers,
  Image as ImageIcon,
  ZoomIn,
  X,
  MessageCircle,
  Calendar,
  CheckCircle,
  Tag,
  Upload,
  Plus,
  Trash2,
  Sparkles,
  Camera,
  Edit2,
  Check,
} from 'lucide-react';
import { GalleryItem, BusinessConfig } from '../types';
import {
  getCleanWorkTitle,
  getCleanWorkDescription,
  cleanGalleryItem,
  EBRIMA_WORK_PRESETS,
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
  onAddGalleryItem,
  onDeleteGalleryItem,
  onUpdateGalleryItem,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // New photo upload modal state
  const [uploadPreview, setUploadPreview] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<GalleryItem['category']>('Electrical Wiring');
  const [newDesc, setNewDesc] = useState<string>('');

  // Editing existing photo modal state
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editCategory, setEditCategory] = useState<GalleryItem['category']>('Electrical Wiring');
  const [editDesc, setEditDesc] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'All',
    'Electrical Wiring',
    'Lighting Installation',
    'Socket and Switch Installation',
    'Electrical Repairs',
    'Residential Projects',
    'Commercial Projects',
  ];

  // Process items to ensure no raw camera/WhatsApp 2026 filenames or codes appear
  const sanitizedItems = galleryItems.map((item, idx) => ({
    ...item,
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

  const handleFileSelected = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setUploadPreview(dataUrl);
        // Generate a clean title and description of the actual electrical work instead of camera / whatsapp codes
        const suggestedTitle = getCleanWorkTitle('', newCategory, galleryItems.length);
        const suggestedDesc = getCleanWorkDescription('', newCategory, galleryItems.length);
        setNewTitle(suggestedTitle);
        setNewDesc(suggestedDesc);
        setShowUploadModal(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBatchFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    if (files.length === 1) {
      handleFileSelected(files[0]);
      return;
    }

    // Multiple files: import all with clean professional titles and actual work descriptions
    Array.from(files).forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl && onAddGalleryItem) {
          const item: GalleryItem = {
            id: `gal-upload-${Date.now()}-${idx}`,
            title: getCleanWorkTitle('', newCategory, galleryItems.length + idx),
            category: newCategory,
            image: dataUrl,
            description: getCleanWorkDescription('', newCategory, galleryItems.length + idx),
            dateAdded: new Date().toISOString().split('T')[0],
          };
          onAddGalleryItem(cleanGalleryItem(item, galleryItems.length + idx));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadPreview || !onAddGalleryItem) return;

    const finalTitle = getCleanWorkTitle(newTitle.trim(), newCategory, galleryItems.length);
    const finalDesc = getCleanWorkDescription(newDesc.trim(), newCategory, galleryItems.length);
    const newItem: GalleryItem = {
      id: `gal-work-${Date.now()}`,
      title: finalTitle,
      category: newCategory,
      image: uploadPreview,
      description: finalDesc,
      dateAdded: new Date().toISOString().split('T')[0],
    };

    onAddGalleryItem(cleanGalleryItem(newItem, galleryItems.length));
    setUploadPreview('');
    setNewTitle('');
    setNewDesc('');
    setShowUploadModal(false);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setEditTitle(item.displayTitle || getCleanWorkTitle(item.title, item.category, 0));
    setEditCategory(item.category);
    setEditDesc(item.displayDesc || getCleanWorkDescription(item.description, item.category, 0));
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !onUpdateGalleryItem) return;

    const finalTitle = getCleanWorkTitle(editTitle.trim(), editCategory, 0);
    const finalDesc = getCleanWorkDescription(editDesc.trim(), editCategory, 0);

    const updated: GalleryItem = {
      ...editingItem,
      title: finalTitle,
      category: editCategory,
      description: finalDesc,
    };

    onUpdateGalleryItem(cleanGalleryItem(updated));
    if (selectedPhoto && selectedPhoto.id === updated.id) {
      setSelectedPhoto(cleanGalleryItem(updated));
    }
    setEditingItem(null);
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
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

          {/* Prominent Upload Action Button */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-xl shadow-amber-400/20 transition-all hover:scale-105 active:scale-95"
            >
              <Upload className="w-4 h-4 text-slate-950" />
              <span>Upload Work Photo</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleBatchFiles(e.target.files)}
              className="hidden"
            />
          </div>
        </div>

        {/* Drag and Drop Zone Banner */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDraggingOver(true);
          }}
          onDragLeave={() => setIsDraggingOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDraggingOver(false);
            if (e.dataTransfer.files) {
              handleBatchFiles(e.dataTransfer.files);
            }
          }}
          onClick={() => dropzoneInputRef.current?.click()}
          className={`cursor-pointer mb-10 rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
            isDraggingOver
              ? 'border-amber-400 bg-amber-400/10 scale-[1.01]'
              : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
          }`}
        >
          <input
            ref={dropzoneInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleBatchFiles(e.target.files)}
            className="hidden"
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm text-slate-300">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white">Have more photos of Ebrima's work? </span>
              <span className="text-slate-400">Drag &amp; drop pictures here, or click to browse from your phone or computer.</span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-md bg-amber-400/15 text-amber-400 font-semibold border border-amber-400/30 whitespace-nowrap">
              Auto-formats Titles &bull; No camera codes
            </span>
          </div>
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
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      onClick={() => setSelectedPhoto(item)}
                      className="cursor-pointer font-bold text-white text-base group-hover:text-amber-400 transition-colors line-clamp-1"
                    >
                      {item.displayTitle}
                    </h3>

                    {/* Edit button to rename work title */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEdit(item);
                      }}
                      className="p-1 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded transition-colors"
                      title="Edit Work Title & Description"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {item.displayDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>On Site in The Gambia</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedPhoto(item)}
                      className="text-amber-400 font-semibold hover:underline"
                    >
                      View &rarr;
                    </button>
                    {onDeleteGalleryItem && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Remove "${item.displayTitle}" from gallery?`)) {
                            onDeleteGalleryItem(item.id);
                          }
                        }}
                        className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
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

              <div className="relative aspect-[16/10] bg-slate-950">
                <img
                  src={selectedPhoto.image}
                  alt={(selectedPhoto as any).displayTitle || selectedPhoto.title}
                  className="w-full h-full object-cover"
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

                  <button
                    onClick={() => handleOpenEdit(selectedPhoto)}
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-amber-400 font-semibold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit Title / Info</span>
                  </button>
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

        {/* Upload Details Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
                    <Upload className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">Add Photo to Work Gallery</h3>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnail Preview */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={uploadPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quick Work Presets */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                  1-Click Work Presets (Select what Ebrima worked on):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {EBRIMA_WORK_PRESETS.slice(0, 4).map((preset) => (
                    <button
                      type="button"
                      key={preset.title}
                      onClick={() => {
                        setNewTitle(preset.title);
                        setNewDesc(preset.description);
                        setNewCategory(preset.category);
                      }}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-300 font-medium transition-colors border border-slate-700/60"
                    >
                      {preset.title.replace('Ebrima On Site: ', '')}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSaveModal} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Work Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Miniature Circuit Breaker Installation & Wiring"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Electrical Wiring">Electrical Wiring</option>
                    <option value="Lighting Installation">Lighting Installation</option>
                    <option value="Socket and Switch Installation">Socket and Switch Installation</option>
                    <option value="Electrical Repairs">Electrical Repairs</option>
                    <option value="Residential Projects">Residential Projects</option>
                    <option value="Commercial Projects">Commercial Projects</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Actual Work Description (Shown below photo)
                  </label>
                  <textarea
                    rows={2}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Describe what Ebrima installed or repaired..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md shadow-amber-400/20"
                  >
                    Add to Gallery
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Existing Photo Modal */}
        {editingItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
                    <Edit2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">Edit Work Description &amp; Title</h3>
                </div>
                <button
                  onClick={() => setEditingItem(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Photo Thumbnail */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={editingItem.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quick Work Presets */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                  Quick Select Actual Work:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {EBRIMA_WORK_PRESETS.map((preset) => (
                    <button
                      type="button"
                      key={preset.title}
                      onClick={() => {
                        setEditTitle(preset.title);
                        setEditDesc(preset.description);
                        setEditCategory(preset.category);
                      }}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-300 font-medium transition-colors border border-slate-700/60"
                    >
                      {preset.title.replace('Ebrima On Site: ', '')}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Work Title
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="e.g. Circuit Breaker Installation & Wiring"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Electrical Wiring">Electrical Wiring</option>
                    <option value="Lighting Installation">Lighting Installation</option>
                    <option value="Socket and Switch Installation">Socket and Switch Installation</option>
                    <option value="Electrical Repairs">Electrical Repairs</option>
                    <option value="Residential Projects">Residential Projects</option>
                    <option value="Commercial Projects">Commercial Projects</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Actual Work Description (Shown below photo)
                  </label>
                  <textarea
                    rows={3}
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    placeholder="Explain what Ebrima worked on in this picture..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md shadow-amber-400/20"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
