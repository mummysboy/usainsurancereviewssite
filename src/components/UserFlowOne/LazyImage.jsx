import React, { useState, useRef, useEffect } from "react";

const LazyImage = ({ src, alt, placeholder }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = src; // Set the image source when it comes into view
          observer.unobserve(img);
        }
      });
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return (
    <div className="lazy-image-wrapper">
      {/* Placeholder Image */}
      {!isLoaded && (
        <img src={placeholder} alt="placeholder" className="lazy-placeholder" />
      )}
      {/* Actual Image */}
      <img
        ref={imgRef}
        alt={alt}
        className="lazy-image"
        onLoad={() => setIsLoaded(true)}
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
};

export default LazyImage;
