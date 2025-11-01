import React, { useState } from 'react';
import { Button, Space, Typography, Select, Input, Modal, theme } from 'antd';
import {
  MenuOutlined,
  PlusOutlined,
  FileTextOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';
import MVLink from '../../../../components/Location/Link';
import AddMultipleEpisodes from '../component/addMultipleEpisode';
import ProductAddModal from '../component/add';
import { PRODUCT_VERSIONS } from '../types';

const { Title } = Typography;
const { Search } = Input;

interface ProductHeaderProps {
  onOpenDrawer: () => void;
  onGenerateEpisode: () => void;
  isGeneratingEpisodes?: boolean;
  selectedCategory: string;
  onCategoryFilter: (value: string) => void;
  onEpisodeSearch: (value: string) => void;
  categories: any[];
  onRefresh?: () => void;
  selectedVersion: string;
  onVersionFilter: (value: string) => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  onOpenDrawer,
  onGenerateEpisode,
  isGeneratingEpisodes = false,
  selectedCategory,
  onCategoryFilter,
  onEpisodeSearch,
  categories,
  selectedVersion,
  onVersionFilter,
  onRefresh,
}) => {
  const [multipleEpisodeModalVisible, setMultipleEpisodeModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const { token } = theme.useToken();
  return (
    <div>
      {/* Header Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: token.marginLG,
        backgroundColor: token.colorBgContainer, // Màu nền container
        borderRadius: token.borderRadius, // Border radius từ theme
      }}>

        <Space size="middle" wrap>
          {/* Button Quản lý */}
          <Button
            type="default"
            icon={<MenuOutlined />}
            onClick={onOpenDrawer}
            size="middle"
          >
            Manage Episode
          </Button>

          {/* Button Thêm sản phẩm */}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="middle"
            onClick={() => setAddModalVisible(true)}
          >
            Create Episode
          </Button>

          {/* Button Tạo tập phim */}
          <Button
            type="default"
            icon={<FileTextOutlined />}
            onClick={onGenerateEpisode}
            size="middle"
            loading={isGeneratingEpisodes}
            disabled={isGeneratingEpisodes}
          >
            {isGeneratingEpisodes ? 'Generating...' : 'Create Multiple Episode'}
          </Button>

          {/* Button Thêm nhiều tập phim */}
          <Button
            icon={<PlusOutlined />}
            onClick={() => setMultipleEpisodeModalVisible(true)}
          >
            Create Multiple Episode
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
          placeholder="Select category to filter"
          allowClear
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
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
          placeholder="Search episode"
          allowClear
          onSearch={onEpisodeSearch}
          onChange={(e) => {
            if (!e.target.value) {
              onEpisodeSearch("");
            }
          }}
        />
      </div>
      {/* Add Episode Modal */}
      <ProductAddModal
        open={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSuccess={() => {
          onRefresh?.();
        }}
      />

      {/* Multiple Episode Modal */}
      <Modal
        title={
          <Space>
            <PlusOutlined style={{ color: '#1890ff' }} />
            <span>Create Multiple Episode</span>
          </Space>
        }
        open={multipleEpisodeModalVisible}
        onCancel={() => setMultipleEpisodeModalVisible(false)}
        footer={null}
        width={700}
        centered
      >
        <AddMultipleEpisodes />
      </Modal>
    </div >

  );
};

export default ProductHeader; 