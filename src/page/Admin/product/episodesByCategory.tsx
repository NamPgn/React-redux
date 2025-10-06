import React, { memo, useEffect, useState } from "react";
import { Card, Table, Tag, Button, Space, Select, Typography, message } from "antd";
import { PlayCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { getAllEpisodesByCategoryAndVersionThunk } from "../../../redux/slice/product/thunk/product";

const { Title, Text } = Typography;
const { Option } = Select;

interface EpisodesByCategoryProps {
  version?: '2d' | '3d';
}

const EpisodesByCategory = memo<EpisodesByCategoryProps>(({ version = '3d' }) => {
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  
  const categories = useAppSelector((state) => state.category.category?.data || []);

  const handleGetEpisodes = async () => {
    if (!selectedCategory) {
      message.warning("Vui lòng chọn category");
      return;
    }

    try {
      setLoading(true);
      const response = await dispatch(getAllEpisodesByCategoryAndVersionThunk({
        categoryId: selectedCategory,
        version
      }));
      
      if (response.meta.requestStatus === 'fulfilled') {
        setEpisodes(response.payload.data || []);
        setTotalCount(response.payload.totalCount || 0);
        message.success(`Đã tải ${response.payload.totalCount || 0} episodes`);
      } else {
        message.error("Có lỗi xảy ra khi tải episodes");
      }
    } catch (error) {
      console.error('Error fetching episodes:', error);
      message.error("Có lỗi xảy ra khi tải episodes");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Tên Episode",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Text strong style={{ color: version === '2d' ? '#1890ff' : '#52c41a' }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      render: (text: string) => (
        <Text code>{text}</Text>
      ),
    },
    {
      title: "Số tập",
      dataIndex: "seri",
      key: "seri",
      render: (text: string) => (
        <Tag color={version === '2d' ? 'blue' : 'green'}>
          Tập {text}
        </Tag>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: any) => (
        <div>
          <Text strong>{category?.name}</Text>
          <br />
          <Space size="small">
            <Tag color="purple">{category?.lang}</Tag>
            <Tag color="orange">{category?.quality}</Tag>
          </Space>
        </div>
      ),
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
      render: (text: string) => (
        <Tag color={text === '2d' ? 'blue' : 'green'}>
          {text?.toUpperCase() || 'N/A'}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (record: any) => (
        <Space>
          {record.dailyMotionServer && (
            <Tag color="green">Có Server</Tag>
          )}
          {record.voiceOverLink && (
            <Tag color="blue">Có Voice Over</Tag>
          )}
          {record.thumnail && (
            <Tag color="purple">Có Thumbnail</Tag>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <Title level={3}>
            {version === '2d' ? <PlayCircleOutlined /> : <PlayCircleOutlined />}
            {" "}Episodes theo Category - {version.toUpperCase()}
          </Title>
          
          <Space size="middle" style={{ marginBottom: '16px' }}>
            <Select
              style={{ width: 300 }}
              placeholder="Chọn category"
              value={selectedCategory || undefined}
              onChange={setSelectedCategory}
              showSearch
              optionFilterProp="children"
            >
              {categories.map((category: any) => (
                <Option key={category._id} value={category._id}>
                  {category.name} ({category.lang} - {category.quality})
                </Option>
              ))}
            </Select>
            
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={handleGetEpisodes}
              loading={loading}
              disabled={!selectedCategory}
            >
              Tải Episodes
            </Button>
          </Space>

          {totalCount > 0 && (
            <Text type="secondary">
              Tìm thấy {totalCount} episodes cho category đã chọn
            </Text>
          )}
        </div>

        <Table
          columns={columns}
          dataSource={episodes}
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} episodes`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
});

EpisodesByCategory.displayName = 'EpisodesByCategory';

export default EpisodesByCategory;
