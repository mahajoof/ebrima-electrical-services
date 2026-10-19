/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { resolveSafeImageUrl, CATEGORY_FALLBACK_IMAGES } from '../utils/imageAssets';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  category?: string;
  fallbackSrc?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  category,
  fallbackSrc,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const initialResolved = resolveSafeImageUrl(src, category);
  const [imgSrc, setImgSrc] = useState<string>(initialResolved);
  const [hasFailedOnce, setHasFailedOnce] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync if parent updates src
  useEffect(() => {
    const next = resolveSafeImageUrl(src, category);
    setImgSrc(next);
    setHasFailedOnce(false);
    setIsLoaded(false);
  }, [src, category]);

  const handleError = () => {
    if (!hasFailedOnce) {
      setHasFailedOnce(true);
      const fallback =
        fallbackSrc ||
        (category && CATEGORY_FALLBACK_IMAGES[category]) ||
        CATEGORY_FALLBACK_IMAGES.default;
      setImgSrc(fallback);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${containerClassName}`}>
      {/* Subtle skeleton/placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 animate-pulse" />
      )}
      <img
        {...props}
        src={imgSrc}
        alt={alt}
        onError={handleError}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        referrerPolicy="no-referrer"
        loading="lazy"
      />
    </div>
  );
};
