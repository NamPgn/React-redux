import React, { memo, useState } from "react";
import { Tabs, Button } from "antd";
import { Film, Box } from "lucide-react";
import ProductAdmin2D from "./productAdmin2D";
import ProductAdmin3D from "./productAdmin3D";

const ProductAdminWrapper = memo(() => {
  const [activeTab, setActiveTab] = useState<string>("3d");

  const tabItems = [
    {
      key: "2d",
      label: (
        <div className="flex items-center gap-2">
          <Film size={16} />
          <span>Phim 2D</span>
        </div>
      ),
      children: <ProductAdmin2D />,
    },
    {
      key: "3d",
      label: (
        <div className="flex items-center gap-2">
          <Box size={16} />
          <span>Phim 3D</span>
        </div>
      ),
      children: <ProductAdmin3D />,
    },
  ];

  return (
    <div className="w-full">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        className="w-full"
        tabBarStyle={{
          marginBottom: 24,
          borderBottom: "1px solid #f0f0f0",
        }}
      />
    </div>
  );
});

ProductAdminWrapper.displayName = 'ProductAdminWrapper';

export default ProductAdminWrapper;
