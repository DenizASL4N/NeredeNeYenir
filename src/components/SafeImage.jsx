import { useState } from 'react';

const PLACEHOLDER = '/fotograf-yok.svg';

// <img> that falls back to a placeholder when the photo is missing or fails to load
export default function SafeImage({ src, alt, ...props }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const showPlaceholder = !src || failedSrc === src;

  return (
    <img
      src={showPlaceholder ? PLACEHOLDER : src}
      alt={alt}
      onError={() => setFailedSrc(src)}
      {...props}
    />
  );
}
