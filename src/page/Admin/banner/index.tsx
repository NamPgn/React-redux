import { useState, useEffect } from "react";
import {
  Upload,
  Button,
  Input,
  Select,
  Table,
  message,
  Modal,
  Drawer,
} from "antd";
import React from "react";
import {
  deleteBanners,
  getBanners,
  updateBanners,
  uploadBanner,
} from "../../../sevices/banners";
import MVLink from "../../../components/Location/Link";
import { MyButton } from "../../../components/MV/Button";
import { columnsBanner } from "../../../constant";

const { Option } = Select;

const UploadBanner = () => {
  const [file, setFile]: any = useState(null);
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("top-center");
  const [banners, setBanners] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(350);
  const [height, setHeight] = useState(200);
  const [link, setLink] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBanner, setEditBanner] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const fetchBanners = async () => {
    try {
      const res = await getBanners();
      setBanners(res?.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách banner", error);
    }
  };
  useEffect(() => {
    fetchBanners();
  }, []);

  const handleUpload = async () => {
    if (!file) return message.warning("Vui lòng chọn ảnh!");

    const formData: any = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("position", position);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("link", link);
    try {
      setLoading(true);
      await uploadBanner(formData);
      message.success("Tải lên banner thành công!");
      setFile(null);
      setTitle("");
      setLink("");
      setPosition("top-center");
      setWidth(350);
      setHeight(200);
      fetchBanners();
    } catch (error) {
      console.error("Lỗi khi upload banner", error);
      message.error("Tải lên thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa banner này?",
      onOk: async () => {
        try {
          await deleteBanners(id);
          message.success("Đã xóa banner!");
          fetchBanners();
        } catch (error) {
          console.error("Lỗi khi xóa banner", error);
          message.error("Xóa thất bại!");
        }
      },
    });
  };
  const openEditModal = (banner) => {
    setEditBanner(banner);
    setIsEditModalOpen(true);
  };

  const handleEdit = async () => {
    if (!editBanner) return;
    try {
      await updateBanners(editBanner._id, {
        title: editBanner.title,
        position: editBanner.position,
        width: editBanner.width,
        height: editBanner.height,
      });
      message.success("Cập nhật banner thành công!");
      setIsEditModalOpen(false);
      fetchBanners();
    } catch (error) {
      console.error("Lỗi khi cập nhật banner", error);
      message.error("Cập nhật thất bại!");
    }
  };
  const data =
    banners.data &&
    banners.data.map((item: any, index: number) => {
      return {
        key: item._id,
        imageUrl: (
          <>
            <img
              src={item?.imageUrl}
              alt="Banner"
              style={{
                width: 120,
                height: 60,
                objectFit: "cover",
                borderRadius: 5,
              }}
            />
          </>
        ),
        position: item.position,
        action: (
          <div className="flex gap-1">
            <Button
              color="purple"
              type="dashed"
              variant="filled"
              onClick={() => openEditModal(item)}
            >
              Edit
            </Button>
            <MyButton
              color="danger"
              type="dashed"
              variant="filled"
              className="ml-2"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </MyButton>
          </div>
        ),
      };
    });
  return (
    <>
      <Button
        className="mb-3"
        color="green"
        variant="solid"
        onClick={() => setIsDrawerOpen(true)}
      >
        Thêm Banner
      </Button>
      <Drawer
        title="Upload Banner"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="h-10">
          <Upload.Dragger
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
            showUploadList={!!file}
          />
        </div>

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginTop: 10 }}
        />

        <Input
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{ marginTop: 10 }}
        />

        <Select
          value={position}
          onChange={setPosition}
          style={{ width: "100%", marginTop: 10 }}
        >
          <Option value="top-center">Top Center</Option>
          <Option value="bottom-center">Bottom Center</Option>
          <Option value="left-center">Left Center</Option>
          <Option value="right-center">Right Center</Option>
        </Select>

        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <Input
            placeholder="Chiều rộng"
            type="number"
            value={width}
            onChange={(e: any) => setWidth(e.target.value)}
            style={{ width: "50%" }}
          />
          <Input
            placeholder="Chiều cao"
            type="number"
            value={height}
            onChange={(e: any) => setHeight(e.target.value)}
            style={{ width: "50%" }}
          />
        </div>

        <Button
          className="mb-3"
          color="gold"
          variant="dashed"
          style={{ marginTop: 10 }}
          loading={loading}
          onClick={handleUpload}
        >
          Upload
        </Button>
      </Drawer>
      <Table dataSource={data} columns={columnsBanner} rowKey="_id" />

      <Modal
        title="Edit Banner"
        open={isEditModalOpen}
        onOk={handleEdit}
        onCancel={() => setIsEditModalOpen(false)}
      >
        <Input
          placeholder="Title"
          value={editBanner?.title || ""}
          onChange={(e) =>
            setEditBanner({ ...editBanner, title: e.target.value })
          }
          style={{ marginBottom: 10 }}
        />

        <Input
          placeholder="Link"
          value={editBanner?.link || ""}
          onChange={(e) =>
            setEditBanner({ ...editBanner, link: e.target.value })
          }
          style={{ marginBottom: 10 }}
        />

        <Select
          value={editBanner?.position || ""}
          onChange={(value) =>
            setEditBanner({ ...editBanner, position: value })
          }
          style={{ width: "100%", marginBottom: 10 }}
        >
          <Option value="top-center">Top Center</Option>
          <Option value="bottom-center">Bottom Center</Option>
          <Option value="left-center">Left Center</Option>
          <Option value="right-center">Right Center</Option>
        </Select>

        <Input
          placeholder="Width"
          type="number"
          value={editBanner?.width || ""}
          onChange={(e) =>
            setEditBanner({ ...editBanner, width: e.target.value })
          }
          style={{ marginBottom: 10 }}
        />

        <Input
          placeholder="Height"
          type="number"
          value={editBanner?.height || ""}
          onChange={(e) =>
            setEditBanner({ ...editBanner, height: e.target.value })
          }
        />
      </Modal>
    </>
  );
};

export default UploadBanner;
