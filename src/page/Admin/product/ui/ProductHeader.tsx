import React from 'react';
import { Button, Space, Typography, Select, Input } from 'antd';
import {
  MenuOutlined,
  PlusOutlined,
  FileTextOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';
import MVLink from '../../../../components/Location/Link';

const { Title } = Typography;
const { Search } = Input;

interface ProductHeaderProps {
  onOpenDrawer: () => void;
  onGenerateEpisode: () => void;
  selectedCategory: string;
  onCategoryFilter: (value: string) => void;
  onEpisodeSearch: (value: string) => void;
  categories: any[];
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  onOpenDrawer,
  onGenerateEpisode,
  selectedCategory,
  onCategoryFilter,
  onEpisodeSearch,
  categories,
}) => {
  return (
    <div>
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '16px 0',
        marginBottom: '16px',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
          Quản lý episode
        </Title>
        
        <Space size="middle" wrap>
          <Button
            type="default"
            icon={<MenuOutlined />}
            onClick={onOpenDrawer}
            size="middle"
          >
            Quản lý
          </Button>

          <MVLink to="/dashboard/product/add">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="middle"
            >
              Thêm sản phẩm
            </Button>
          </MVLink>

          <Button
            type="default"
            icon={<FileTextOutlined />}
            onClick={onGenerateEpisode}
            size="middle"
          >
            Tạo tập phim
          </Button>
        </Space>
      </div>

      {/* Filter Section */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        marginBottom: '16px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <Select
          style={{ width: 240 }}
          placeholder="Chọn danh mục để lọc"
          allowClear
          value={selectedCategory || undefined}
          onChange={onCategoryFilter}
          options={categories?.map((item: any) => ({
            label: item.name,
            value: item._id,
          }))}
          suffixIcon={<FilterOutlined />}
        />
        
        <Search
          style={{ width: 240 }}
          placeholder="Tìm kiếm tập phim (episode)"
          allowClear
          onSearch={onEpisodeSearch}
          onChange={(e) => {
            if (!e.target.value) {
              onEpisodeSearch("");
            }
          }}
        />
      </div>
    </div>
  );
};

export default ProductHeader; 