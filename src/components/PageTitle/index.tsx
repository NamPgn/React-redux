import React from 'react';

interface PageTitleProps {
  title: string; // Tiêu đề trang
  subtitle?: string; // Tiêu đề phụ (tuỳ chọn)
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default PageTitle;
