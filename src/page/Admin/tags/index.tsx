import React, { useEffect } from "react"
import { useState, useMemo } from "react"
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Space,
    Popconfirm,
    Card,
    Row,
    Col,
    Tag,
    Typography,
    Divider,
    Alert,
} from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined } from "@ant-design/icons"
import type { TagFormData, TagResponse } from "../../../services/tags.service"
import { useCreateTag, useDeleteTag, useTags, useUpdateTag } from "../../../hook/useTags"
import { getAllcate } from "../../../redux/slice/category/thunk/category"
import { useAppDispatch, useAppSelector } from "../../../hook"
import { category$ } from "../../../redux/selectors"

const { Title } = Typography
const { Option } = Select

export default function TagsAdmin() {
    const [modalVisible, setModalVisible] = useState(false)
    const [editingTag, setEditingTag] = useState<TagResponse | null>(null)
    const [searchText, setSearchText] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [page, setPage] = useState(0);
    const [form] = Form.useForm()
    const dispatch = useAppDispatch();
    const { data: categories } = useAppSelector(category$);
    // React Query hooks
    const { data: tags = [], isLoading: tagsLoading, error: tagsError, refetch: refetchTags }:any = useTags()
    const createTagMutation = useCreateTag()
    const updateTagMutation = useUpdateTag()
    const deleteTagMutation = useDeleteTag()

    // Filter tags
    const filteredTags = useMemo(() => {
        return tags?.data?.filter((tag) => {
            const matchesSearch =
                tag.name.toLowerCase().includes(searchText.toLowerCase()) ||
                tag.slug.toLowerCase().includes(searchText.toLowerCase())

            const matchesCategory =
                selectedCategories.length === 0 || tag.categories.some((cat) => selectedCategories.includes(cat._id))

            return matchesSearch && matchesCategory
        })
    }, [tags, searchText, selectedCategories])

    useEffect(() => {
        dispatch(getAllcate(page));
    }, [page]);

    // Handle create/update
    const handleSubmit = async (values: TagFormData) => {
        try {
            if (editingTag) {
                await updateTagMutation.mutateAsync({ id: editingTag._id, data: values })
            } else {
                await createTagMutation.mutateAsync(values)
            }

            setModalVisible(false)
            setEditingTag(null)
            form.resetFields()
        } catch (error) {
            // Error handling is done in the mutation hooks
        }
    }

    // Handle delete
    const handleDelete = async (id: string) => {
        try {
            await deleteTagMutation.mutateAsync(id)
        } catch (error) {
            // Error handling is done in the mutation hook
        }
    }

    // Open modal for create/edit
    const openModal = (tag?: TagResponse) => {
        if (tag) {
            setEditingTag(tag)
            form.setFieldsValue({
                name: tag.name,
                categories: tag.categories.map((cat) => cat._id),
            })
        } else {
            setEditingTag(null)
            form.resetFields()
        }
        setModalVisible(true)
    }

    // Close modal
    const closeModal = () => {
        setModalVisible(false)
        setEditingTag(null)
        form.resetFields()
    }

    // Table columns
    const columns = [
        {
            title: "Tên Tag",
            dataIndex: "name",
            key: "name",
            render: (text: string, record: TagResponse) => (
                <div>
                    <div className="font-semibold text-gray-900">{text}</div>
                    <div className="text-sm text-gray-500">{record.slug}</div>
                </div>
            ),
        },
        {
            title: "Categories",
            dataIndex: "categories",
            key: "categories",
            render: (categories: TagResponse["categories"]) => (
                <div className="flex flex-wrap gap-1">
                    {categories.map((category) => (
                        <Tag key={category._id} color="blue" className="mb-1">
                            {category.name}
                        </Tag>
                    ))}
                </div>
            ),
        },
        {
            title: "Thao tác",
            key: "actions",
            width: 150,
            render: (_: any, record: TagResponse) => (
                <Space>
                    <Button
                        type="primary"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => openModal(record)}
                        className="bg-blue-500 hover:bg-blue-600"
                        loading={updateTagMutation.isPending}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa tag này?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true, loading: deleteTagMutation.isPending }}
                    >
                        <Button danger size="small" icon={<DeleteOutlined />} loading={deleteTagMutation.isPending}>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    // Show error if any
    if (tagsError) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <Alert
                        message="Lỗi tải dữ liệu"
                        description="Không thể tải danh sách tags. Vui lòng thử lại."
                        type="error"
                        showIcon
                        action={
                            <Button size="small" danger onClick={() => refetchTags()}>
                                Thử lại
                            </Button>
                        }
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <Card className="shadow-sm">
                    <div className="mb-6">
                        <Title level={2} className="!mb-2">
                            Quản lý Tags
                        </Title>
                        <p className="text-gray-600">Quản lý tất cả các tags trong hệ thống</p>
                    </div>

                    <Divider />

                    {/* Filters and Actions */}
                    <Row gutter={[16, 16]} className="mb-6">
                        <Col xs={24} sm={12} md={8}>
                            <Input
                                placeholder="Tìm kiếm tags..."
                                prefix={<SearchOutlined />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-full"
                            />
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Select
                                mode="multiple"
                                placeholder="Lọc theo category"
                                value={selectedCategories}
                                onChange={setSelectedCategories}
                                className="w-full"
                                allowClear
                            >
                                {categories.map((category) => (
                                    <Option key={category._id} value={category._id}>
                                        {category.name}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                        <Col xs={24} sm={24} md={8}>
                            <Space className="w-full justify-end">
                                <Button icon={<ReloadOutlined />} onClick={() => refetchTags()} loading={tagsLoading}>
                                    Làm mới
                                </Button>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => openModal()}
                                    className="bg-green-500 hover:bg-green-600 border-green-500"
                                    loading={createTagMutation.isPending}
                                >
                                    Thêm Tag
                                </Button>
                            </Space>
                        </Col>
                    </Row>

                    {/* Stats */}
                    <Row gutter={16} className="mb-6">
                        <Col span={8}>
                            <Card size="small" className="text-center bg-blue-50 border-blue-200">
                                <div className="text-2xl font-bold text-blue-600">{tags.length}</div>
                                <div className="text-gray-600">Tổng số tags</div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card size="small" className="text-center bg-green-50 border-green-200">
                                <div className="text-2xl font-bold text-green-600">{filteredTags.length}</div>
                                <div className="text-gray-600">Tags hiển thị</div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card size="small" className="text-center bg-purple-50 border-purple-200">
                                <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
                                <div className="text-gray-600">Categories</div>
                            </Card>
                        </Col>
                    </Row>

                    {/* Table */}
                    <Table
                        columns={columns}
                        dataSource={filteredTags}
                        rowKey="_id"
                        loading={tagsLoading}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} tags`,
                        }}
                        className="bg-white"
                        scroll={{ x: 800 }}
                    />
                </Card>

                {/* Create/Edit Modal */}
                <Modal
                    title={editingTag ? "Chỉnh sửa Tag" : "Thêm Tag mới"}
                    open={modalVisible}
                    onCancel={closeModal}
                    footer={null}
                    width={600}
                    destroyOnClose
                >
                    <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-4">
                        <Form.Item
                            label="Tên Tag"
                            name="name"
                            rules={[
                                { required: true, message: "Vui lòng nhập tên tag" },
                                { min: 2, message: "Tên tag phải có ít nhất 2 ký tự" },
                                { max: 50, message: "Tên tag không được quá 50 ký tự" },
                            ]}
                        >
                            <Input placeholder="Nhập tên tag..." />
                        </Form.Item>

                        <Form.Item
                            label="Categories"
                            name="categories"
                            rules={[{ required: true, message: "Vui lòng chọn ít nhất một category" }]}
                        >
                            <Select mode="multiple" placeholder="Chọn categories..." className="w-full" >
                                {categories.map((category) => (
                                    <Option key={category._id} value={category._id}>
                                        {category.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item className="mb-0 text-right">
                            <Space>
                                <Button onClick={closeModal}>Hủy</Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="bg-blue-500 hover:bg-blue-600"
                                    loading={createTagMutation.isPending || updateTagMutation.isPending}
                                >
                                    {editingTag ? "Cập nhật" : "Tạo mới"}
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}
