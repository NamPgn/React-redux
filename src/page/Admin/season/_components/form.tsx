// components/SeasonForm.tsx
import React, { useState, useRef } from "react";
import { Form, Input, InputNumber, Switch, Button, Select, Spin, message } from "antd";
import debounce from "lodash/debounce";

interface SeasonFormProps {
  form: any;
  onFinish: (values: any) => void;
  loading: boolean;
  categories: any[];
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
}

const SeasonForm = ({ form, onFinish, loading, categories, onLoadMore, hasMore }: SeasonFormProps) => {

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="name" label="Tên season" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="categories" label="Thể loại">
        <Select
          mode="multiple"
          placeholder="Chọn thể loại"
          style={{ width: "100%" }}
          filterOption={false}
          options={categories.map((cat: any) => ({
            label: cat.name,
            value: cat._id
          }))}
        />
      </Form.Item>

      <Form.Item name="isActive" label="Hiển thị" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SeasonForm;
