import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecycleBin, restoreCategory, permanentlyDeleteCategory } from '../../../../sevices/category';
import { Button, Table, Space, Modal, message, Popconfirm } from 'antd';
import { DeleteOutlined, RollbackOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { confirm } = Modal;

interface RecycleBinItem {
  _id: string;
  category: {
    name: string;
    linkImg: string;
    slug: string;
    sumSeri: number;
    isMovie: boolean;
    hour: string;
    quality: string;
    time: string;
    type: string;
    anotherName: string;
  };
  deletedAt: string;
  deletedBy: {
    name: string;
    email: string;
  };
  willBeDeletedAt: string;
}

const RecycleBin: React.FC = () => {
  const [items, setItems] = useState<RecycleBinItem[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchRecycleBin = async () => {
    try {
      setLoading(true);
      const response = await getRecycleBin();
      setItems(response.data.data);
    } catch (error) {
      message.error('Failed to fetch recycle bin items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecycleBin();
  }, []);

  const handleRestore = async (id: string) => {
    try {
      await restoreCategory(id);
      message.success('Category restored successfully');
      fetchRecycleBin();
    } catch (error) {
      message.error('Failed to restore category');
    }
  };

  const handlePermanentDelete = async (id: string) => {
    confirm({
      title: 'Are you sure you want to permanently delete this category?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await permanentlyDeleteCategory(id);
          message.success('Category permanently deleted');
          fetchRecycleBin();
        } catch (error) {
          message.error('Failed to delete category');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Category Name',
      dataIndex: ['category', 'name'],
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: ['category', 'type'],
      key: 'type',
    },
    {
      title: 'Deleted By',
      dataIndex: ['deletedBy', 'name'],
      key: 'deletedBy',
    },
    {
      title: 'Deleted At',
      dataIndex: 'deletedAt',
      key: 'deletedAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Will Be Deleted At',
      dataIndex: 'willBeDeletedAt',
      key: 'willBeDeletedAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: RecycleBinItem) => (
        <Space>
          <Button
            type="primary"
            icon={<RollbackOutlined />}
            onClick={() => handleRestore(record._id)}
          >
            Restore
          </Button>
          <Popconfirm
            title="Are you sure you want to permanently delete this category?"
            onConfirm={() => handlePermanentDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
            >
              Delete Permanently
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Recycle Bin</h1>
      <Table
        columns={columns}
        dataSource={items}
        loading={loading}
        rowKey="_id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
      />
    </div>
  );
};

export default RecycleBin; 