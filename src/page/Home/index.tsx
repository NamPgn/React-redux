import React, { useEffect } from "react";
import ConfigHomePage from "./Container/Config";
const HomePage = () => {
  useEffect(() => {
    document.title = "Hoạt hình trung quốc";
  }, []);
  return <ConfigHomePage />;
};

export default HomePage;
