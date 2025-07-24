import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Modal, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getListCombiningEpisodes, 
  createCombiningEpisode,
  updateCombiningEpisode,
  deleteCombiningEpisode
} from '../../../redux/slice/combining-episodes.slice';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import MVLink from '../../../components/Location/Link';
import { useParams } from 'react-router-dom';

const CombiningEpisodesList: React.FC = () => {
  const dispatch = useDispatch();
  const { combiningEpisodes, loading } = useSelector((state: any) => state.combiningEpisodes);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getListCombiningEpisodes() as any);
  }, [dispatch]);


  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCombiningEpisode(id) as any);
      message.success('Episode deleted successfully');
      dispatch(getListCombiningEpisodes() as any);
    } catch (err) {
      message.error('Delete failed');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Episodes Name',
      dataIndex: 'episodesName',
      key: 'episodesName',
    },
    {
      title: 'Link 1',
      dataIndex: 'link1',
      key: 'link1',
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text?.substring(0, 30)}...
        </a>
      ),
    },
    {
      title: 'Link 2',
      dataIndex: 'link2',
      key: 'link2',
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text?.substring(0, 30)}...
        </a>
      ),
    },
    {
      title: 'Link 3',
      dataIndex: 'link3',
      key: 'link3',
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text?.substring(0, 30)}...
        </a>
      ),
    },
    {
      title: 'Category',
      dataIndex: ['category', 'name'],
      key: 'category',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <MVLink to={`/dashboard/category/edit-combining-episodes/${record._id}`}>
            <Button 
              type="primary" 
              icon={<EditOutlined />}
            >   
              Edit
            </Button>
          </MVLink>
          <Button 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <MVLink to={`/dashboard/category/add-combining-episodes/${id}`}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginBottom: 16 }}
        >
          Add New Episode
        </Button>
      </MVLink>

      <Table
        columns={columns}
        dataSource={combiningEpisodes}
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
};

export default CombiningEpisodesList;
