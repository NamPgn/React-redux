// Example usage of the new Product Admin structure

import React from 'react';
import ProductAdmin2D from './productAdmin2D';
import ProductAdmin3D from './productAdmin3D';
import ProductAdminWrapper from './productAdminWrapper';
import ProductAdmin from './index'; // Default 3D version

// Example 1: Using individual components
const ExampleIndividualUsage = () => {
  return (
    <div>
      {/* Use only 2D version */}
      <ProductAdmin2D />
      
      {/* Use only 3D version */}
      <ProductAdmin3D />
    </div>
  );
};

// Example 2: Using wrapper with tabs
const ExampleWrapperUsage = () => {
  return (
    <div>
      {/* This provides tabs to switch between 2D and 3D */}
      <ProductAdminWrapper />
    </div>
  );
};

// Example 3: Using default (backward compatibility)
const ExampleDefaultUsage = () => {
  return (
    <div>
      {/* This uses 3D version by default */}
      <ProductAdmin />
    </div>
  );
};

// Example 4: Conditional rendering based on user preference
const ExampleConditionalUsage = ({ userPreference }: { userPreference: '2d' | '3d' }) => {
  if (userPreference === '2d') {
    return <ProductAdmin2D />;
  }
  return <ProductAdmin3D />;
};

// Example 5: Route-based usage (for routing)
export const ProductRoutes = {
  '/admin/products': <ProductAdminWrapper />, // Both 2D and 3D with tabs
  '/admin/products/2d': <ProductAdmin2D />,   // Only 2D
  '/admin/products/3d': <ProductAdmin3D />,   // Only 3D
  '/admin/products/default': <ProductAdmin />, // Default 3D
};

export default ExampleWrapperUsage;
