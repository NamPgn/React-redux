import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

interface BreadcrumbItem {
  path: string;
  name: string;
}

const MyBreadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbItems = [
    {
      title: (
        <Link to="/dashboard" className="flex items-center">
          <HomeOutlined className="mr-1" />
          <span>Home</span>
        </Link>
      ),
    },
    ...pathnames.map((path, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      const name = path.charAt(0).toUpperCase() + path.slice(1);
      return {
        title: index === pathnames.length - 1 ? (
          <span className="text-gray-500">{name}</span>
        ) : (
          <Link to={routeTo} className="hover:text-blue-500 transition-colors">
            {name}
          </Link>
        ),
      };
    }),
  ];

  return (
    <Breadcrumb
      items={breadcrumbItems}
      className="text-sm"
      separator={<span className="text-gray-400">/</span>}
    />
  );
};

export default MyBreadcrumb;