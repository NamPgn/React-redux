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
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = debounce((value: string) => {
    setSearchValue(value);
    // Gọi API search categories với value
    // dispatch(searchCategories(value));
  }, 500);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="name" label="Tên season" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Mô tả">
        <Input.TextArea />
      </Form.Item>

      <Form.Item name="partNumber" label="Phần số">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="releaseYear" label="Năm phát hành">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="totalEpisodes" label="Số tập">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="categories" label="Thể loại">
        <Select
          mode="multiple"
          placeholder="Chọn thể loại"
          style={{ width: "100%" }}
          loading={categoryLoading}
          onSearch={handleSearch}
          filterOption={false}
          notFoundContent={categoryLoading ? <Spin size="small" /> : "Không tìm thấy thể loại"}
          options={categories.map((cat: any) => ({
            label: cat.name,
            value: cat._id
          }))}
          dropdownRender={(menu) => (
            <>
              {menu}
              {hasMore && (
                <div style={{ textAlign: 'center', padding: '8px' }}>
                  {categoryLoading ? <Spin size="small" /> : 'Cuộn xuống để tải thêm'}
                </div>
              )}
            </>
          )}
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
