import React from "react";

interface PageTitleProps {
  title: string; // Tiêu đề trang
  subtitle?: string; // Tiêu đề phụ (tuỳ chọn)
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      {subtitle && (
        <p className="mt-3 text-lg text-gray-600 md:text-xl">{subtitle}</p>
      )}
      <div className="mt-4 h-1 w-16 bg-orange-500 rounded"></div>
    </div>
  );
};

export default PageTitle;
