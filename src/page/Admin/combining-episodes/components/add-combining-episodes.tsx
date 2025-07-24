import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createCombiningEpisode } from '../../../../redux/slice/combining-episodes.slice';
import { useNavigate, useParams } from 'react-router-dom';

const AddCombiningEpisodes: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { loading, error } = useSelector((state: any) => state.combiningEpisodes);

  const onFinish = async (values: any) => {
    try {
      const episodeData = {
        ...values,
        category: slug
      };
      
      await dispatch(createCombiningEpisode(episodeData) as any);
      message.success('Combining episodes added successfully');
    } catch (err) {
      message.error(error || 'Failed to add combining episodes');
    }
  };

  return (
    <Card title="Add Combining Episodes" bordered={false}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
         
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Episodes Name"
          name="episodesName"
         
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
            Add Combining Episodes
          </Button>
          <Button 
            style={{ marginLeft: 8 }} 
            onClick={() => navigate(`/admin/category/${slug}`)}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddCombiningEpisodes;
