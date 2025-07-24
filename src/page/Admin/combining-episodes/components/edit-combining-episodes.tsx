import React, { useEffect } from 'react';
import { Form, Input, Button, Card, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCombiningEpisodeById, updateCombiningEpisode } from '../../../../redux/slice/combining-episodes.slice';
import { useNavigate, useParams } from 'react-router-dom';

const EditCombiningEpisodes: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { currentEpisode, loading, error } = useSelector((state: any) => state.combiningEpisodes);

  useEffect(() => {
    if (slug) {
      dispatch(getCombiningEpisodeById(slug) as any);
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (currentEpisode) {
      form.setFieldsValue({
        name: currentEpisode.name,
        episodesName: currentEpisode.episodesName,
        link1: currentEpisode.link1,
        link2: currentEpisode.link2,
        link3: currentEpisode.link3,
      });
    }
  }, [currentEpisode, form]);

  const onFinish = async (values: any) => {
    try {
      await dispatch(updateCombiningEpisode({
        id: slug!,
        data: {
          ...values,
          category: currentEpisode.category._id
        },
      }) as any).unwrap();
      message.success('Combining episodes updated successfully');
    } catch (err) {
      message.error(error || 'Failed to update combining episodes');
    }
  };

  if (loading && !currentEpisode) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      </Card>
    );
  }

  return (
    <Card title="Edit Combining Episodes" bordered={false}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please input name!' },
          ]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Episodes Name"
          name="episodesName"
          rules={[
            { required: true, message: 'Please input episodes name!' },
          ]}
        >
          <Input placeholder="Enter episodes name" />
        </Form.Item>

        <Form.Item
          label="Link 1"
          name="link1"
        
        >
          <Input placeholder="Enter link 1" />
        </Form.Item>

        <Form.Item
          label="Link 2"
          name="link2"
       
        >
          <Input placeholder="Enter link 2" />
        </Form.Item>

        <Form.Item
          label="Link 3"
          name="link3"
       
        >
          <Input placeholder="Enter link 3" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Combining Episodes
          </Button>
          <Button 
            style={{ marginLeft: 8 }} 
            onClick={() => navigate(`/admin/category/${currentEpisode?.category}`)}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditCombiningEpisodes;
