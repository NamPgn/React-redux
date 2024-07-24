import React, { useState, useEffect, useRef } from "react";

function LazyLoadOtherComponents({ children }) {
  const [showOtherProducts, setShowOtherProducts] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowOtherProducts(true);
        }
      },
      { threshold: 1.0 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, []);
  return (
    <div>
      {showOtherProducts && children}
      <div ref={bottomRef} style={{ height: '1px' }} />
    </div>
  );
}

export default LazyLoadOtherComponents;
