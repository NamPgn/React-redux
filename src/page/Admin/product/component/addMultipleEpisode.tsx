import { useEffect, useState } from "react";
import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Card,
  message,
  Space,
  Divider,
  Switch,
  Row,
  Col,
} from "antd";
import {
  SaveOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { getAllcate } from "../../../../redux/slice/category/thunk/category";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import { addMultipleEpisodeMovie } from "../../../../sevices/product";

const { TextArea } = Input;

export default function AddMultipleEpisodes() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categoryPage, setCategoryPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const dispatch = useAppDispatch();
  const categories: any = useAppSelector((state) => state.category.category)?.data || [];


  const onFinish = async (values) => {
    setLoading(true);
    try {
      await addMultipleEpisodeMovie(values);
      message.success(
        `Đã thêm ${
          values.toEpisode - values.fromEpisode + 1
        } tập phim thành công!`
      );
      form.resetFields();
    } catch (error) {
      console.error("Lỗi khi thêm phim:", error);
      message.error("Thêm phim thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '0' }}>
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            view: 0,
            copyright: false,
            year: new Date().getFullYear(),
            country: "Trung Quốc",
            fromEpisode: 1,
            toEpisode: 12,
            options: [],
          }}
        >
          <div style={{ maxHeight: '50vh', overflowY: 'auto', paddingRight: '8px' }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="name"
                  label="Tên Phim"
                  rules={[{ required: true, message: "Vui lòng nhập tên phim!" }]}
                >
                  <Input placeholder="Nhập tên phim" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item name="category" label="Thể Loại">
                  <Select
                    placeholder="Chọn thể loại"
                    allowClear
                    options={categories?.map((item: any) => ({
                      label: item.name,
                      value: item._id,
                    }))}
                  />
                </Form.Item>
              </Col>

              <Col xs={12} md={6}>
                <Form.Item
                  name="fromEpisode"
                  label="Từ Tập"
                  rules={[
                    { required: true, message: "Vui lòng nhập số tập bắt đầu!" },
                  ]}
                >
                  <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col xs={12} md={6}>
                <Form.Item
                  name="toEpisode"
                  label="Đến Tập"
                  rules={[
                    { required: true, message: "Vui lòng nhập số tập kết thúc!" },
                  ]}
                >
                  <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col xs={12} md={6}>
                <Form.Item name="year" label="Năm Phát Hành">
                  <InputNumber min={1900} max={2100} style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col xs={12} md={6}>
                <Form.Item name="view" label="Lượt Xem">
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item name="dailyMotionServer" label="DailyMotion Server">
                  <Input placeholder="Nhập link DailyMotion (nếu có)" />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item name="trailer" label="Trailer">
                  <Input placeholder="Nhập link trailer" />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item name="descriptions" label="Mô Tả">
                  <TextArea rows={3} placeholder="Nhập mô tả phim" />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            paddingTop: '16px',
            borderTop: '1px solid #f0f0f0',
            marginTop: '16px',
            alignItems: 'center',
          }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SaveOutlined />}
              size="middle"
            >
              Thêm{" "}
              {form.getFieldValue("toEpisode") -
                form.getFieldValue("fromEpisode") +
                1 || ""}{" "}
              Tập Phim
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}