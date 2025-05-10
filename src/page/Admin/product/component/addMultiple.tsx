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
  Upload,
  Switch,
} from "antd";
import {
  UploadOutlined,
  SaveOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { getAllcate } from "../../../../redux/slice/category/thunk/category";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import { addMultipleEpisodeMovie } from "../../../../sevices/product";

const { Option } = Select;
const { TextArea } = Input;

export default function AddMultipleEpisodesForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categorymains, setCategorymains] = useState([]);
  const [types, setTypes] = useState([]);
  const dispatch = useAppDispatch();
  const { data }: any = useAppSelector((state) => state.category.category);
  const [countries, setCountries] = useState([
    "Trung Quốc",
    "Nhật Bản",
    "Hàn Quốc",
    "Mỹ",
    "Khác",
  ]);

  // Giả sử chúng ta đã gọi API để lấy danh sách categories, categorymains và types
  useEffect(() => {
    // Fetch categories, categorymains, types
    // Đoạn code này sẽ được thay thế bằng API calls thực tế
    dispatch(getAllcate(0));
    setCategories([
      { _id: "1", name: "Hành Động" },
      { _id: "2", name: "Phiêu Lưu" },
      { _id: "3", name: "Tiên Hiệp" },
      { _id: "4", name: "Xuyên Không" },
    ]);

    setCategorymains([
      { _id: "1", name: "Phim Hoạt Hình" },
      { _id: "2", name: "Phim Lẻ" },
      { _id: "3", name: "Phim Bộ" },
    ]);

    setTypes([
      { _id: "1", name: "Hoàn Thành" },
      { _id: "2", name: "Đang Cập Nhật" },
      { _id: "3", name: "Sắp Chiếu" },
    ]);
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Giả lập API call
      // await addMultipleEpisodeMovie(values);
      console.log(values);
      // Trong ứng dụng thực tế, sẽ gọi API để thêm phim
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
                options={data?.map((item: any) => ({
                  label: item.name,
                  value: item._id,
                }))}
              ></Select>
            </Form.Item>

            {/* <Form.Item name="categorymain" label="Thể Loại Chính">
              <Select placeholder="Chọn thể loại chính" allowClear>
                {categorymains.map((categorymain) => (
                  <Option key={categorymain._id} value={categorymain._id}>
                    {categorymain.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="typeId" label="Trạng Thái">
              <Select placeholder="Chọn trạng thái" allowClear>
                {types.map((type) => (
                  <Option key={type._id} value={type._id}>
                    {type.name}
                  </Option>
                ))}
              </Select>
            </Form.Item> */}

            <Form.Item name="country" label="Quốc Gia">
              <Select placeholder="Chọn quốc gia">
                {countries.map((country) => (
                  <Option key={country} value={country}>
                    {country}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="year" label="Năm Phát Hành">
              <InputNumber min={1900} max={2100} className="w-full" />
            </Form.Item>

            <Form.Item name="view" label="Lượt Xem">
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </div>

          <Form.Item
            name="video2"
            label="Link Video"
          >
            <Input placeholder="Nhập link video" />
          </Form.Item>

          <Form.Item name="dailyMotionServer" label="DailyMotion Server">
            <Input placeholder="Nhập link DailyMotion (nếu có)" />
          </Form.Item>

          <Form.Item name="trailer" label="Trailer">
            <Input placeholder="Nhập link trailer" />
          </Form.Item>

          <Form.Item name="descriptions" label="Mô Tả">
            <TextArea rows={4} placeholder="Nhập mô tả phim" />
          </Form.Item>

          <Divider orientation="left">Bản Quyền</Divider>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="copyright"
              label="Bản Quyền"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item name="LinkCopyright" label="Link Bản Quyền">
              <Input placeholder="Nhập link bản quyền (nếu có)" />
            </Form.Item>
          </div>

          <Divider orientation="left">Tùy Chọn Bổ Sung</Divider>

          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    className="w-full"
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "key"]}
                      rules={[{ required: true, message: "Thiếu từ khóa" }]}
                      className="w-full"
                    >
                      <Input placeholder="Từ khóa" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={[{ required: true, message: "Thiếu giá trị" }]}
                      className="w-full"
                    >
                      <Input placeholder="Giá trị" />
                    </Form.Item>
                    <div
                      onClick={() => remove(name)}
                      className="text-red-500 cursor-pointer"
                    >
                      <MinusCircleOutlined />
                    </div>
                  </Space>
                ))}
                <div>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm Tùy Chọn
                  </Button>
                </div>
              </>
            )}
          </Form.List>

          <div className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SaveOutlined />}
              className="bg-blue-500 hover:bg-blue-600"
              size="large"
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
