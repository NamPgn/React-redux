import React from "react";

interface PageTitleProps {
  title: string; // Tiêu đề trang
  subtitle?: string; // Tiêu đề phụ (tuỳ chọn)
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1.5 text-sm text-gray-500 font-normal">
          {subtitle}
        </p>
      )}
      <div className="mt-3 flex items-center">
        <div className="h-0.5 w-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
        <div className="h-0.5 w-6 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full ml-1.5"></div>
      </div>
    </div>
  );
};

export default PageTitle;
