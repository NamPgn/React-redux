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
} from "antd";
import {
  SaveOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { getAllcate } from "../../../../redux/slice/category/thunk/category";
import { useAppDispatch } from "../../../../hook";
import { addMultipleEpisodeMovie } from "../../../../sevices/product";

const { TextArea } = Input;

export default function AddMultipleEpisodes() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categoryPage, setCategoryPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllcate({page: categoryPage})).then((result: any) => {
      if (result.payload) {
        const { data, totalPages: total } = result.payload;
        setTotalPages(total);
        
        if (categoryPage === 1) {
          setCategoryOptions(data || []);
        } else {
          setCategoryOptions(prev => [...prev, ...(data || [])]);
        }
      }
    });
  }, [categoryPage]);


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
    <div className="p-6">
      <Card
        title="Thêm Nhiều Tập Phim Cùng Lúc"
        className="shadow-lg rounded-lg"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="Tên Phim"
              rules={[{ required: true, message: "Vui lòng nhập tên phim!" }]}
            >
              <Input placeholder="Nhập tên phim" />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="fromEpisode"
                label="Từ Tập"
                rules={[
                  { required: true, message: "Vui lòng nhập số tập bắt đầu!" },
                ]}
              >
                <InputNumber min={1} className="w-full" />
              </Form.Item>

              <Form.Item
                name="toEpisode"
                label="Đến Tập"
                rules={[
                  { required: true, message: "Vui lòng nhập số tập kết thúc!" },
                ]}
              >
                <InputNumber min={1} className="w-full" />
              </Form.Item>
            </div>

            <Form.Item name="category" label="Thể Loại">
              <Select
                placeholder="Chọn thể loại"
                allowClear
                options={categoryOptions?.map((item: any) => ({
                  label: item.name,
                  value: item._id,
                }))}
              />
            </Form.Item>

            <Form.Item name="year" label="Năm Phát Hành">
              <InputNumber min={1900} max={2100} className="w-full" />
            </Form.Item>

            <Form.Item name="view" label="Lượt Xem">
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </div>


          <Form.Item name="dailyMotionServer" label="DailyMotion Server">
            <Input placeholder="Nhập link DailyMotion (nếu có)" />
          </Form.Item>

          <Form.Item name="trailer" label="Trailer">
            <Input placeholder="Nhập link trailer" />
          </Form.Item>

          <Form.Item name="descriptions" label="Mô Tả">
            <TextArea rows={4} placeholder="Nhập mô tả phim" />
          </Form.Item>
          <div >
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SaveOutlined />}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Thêm{" "}
              {form.getFieldValue("toEpisode") -
                form.getFieldValue("fromEpisode") +
                1 || ""}{" "}
              Tập Phim
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}