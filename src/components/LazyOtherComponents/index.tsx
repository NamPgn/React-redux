import React, { useState, useEffect } from "react";

function LazyLoadOtherComponents({
  id,
  children,
}: {
  id?: any;
  children: any;
}) {
  const [showOtherProducts, setShowOtherProducts] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setShowOtherProducts(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    setShowOtherProducts(false);
  }, [id]);
  return <div>{showOtherProducts && children}</div>;
}

export default LazyLoadOtherComponents;
