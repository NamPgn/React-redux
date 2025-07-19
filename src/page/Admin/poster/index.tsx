import React from "react"
import { useState } from "react"
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
    Typography,
    Divider,
    Tag,
    Upload,
} from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined, UploadOutlined } from "@ant-design/icons"
import { useSlider } from "../../../hook/useSlider"
import { useQueryClient } from "@tanstack/react-query"
import type { UploadFile } from "antd/es/upload/interface"

const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

// Type definitions
interface SliderItem {
    _id: string
    name: string
    anotherName: string
    poster: string
    descriptions: string
    type: string
    quality: string
    lang: string
    isMovie: string
    link: string
    createdAt: string
    updatedAt: string
}

const SliderAdmin: React.FC = () => {
    const {
        sliders,
        isLoading,
        createSlider,
        updateSlider,
        deleteSlider,
        isCreating,
        isUpdating,
        isDeleting
    } = useSlider()
    const [modalVisible, setModalVisible] = useState(false)
    const [editingItem, setEditingItem] = useState<SliderItem | null>(null)
    const [form] = Form.useForm()
    const [searchText, setSearchText] = useState("")
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const queryClient = useQueryClient()

    const handleAdd = () => {
        setEditingItem(null)
        form.resetFields()
        setFileList([])
        setModalVisible(true)
    }

    const handleEdit = (record: SliderItem) => {
        setEditingItem(record)
        form.setFieldsValue(record)
        if (record.poster) {
            setFileList([{
                uid: '-1',
                name: 'poster',
                status: 'done',
                url: record.poster,
            }])
        }
        setModalVisible(true)
    }

    const handleDelete = (id: string) => {
        deleteSlider(id)
    }

    const handleSave = async () => {
        try {
            const values = await form.validateFields()
            const formData = new FormData()
            
            // Append all form values to FormData
            Object.entries(values).forEach(([key, value]) => {
                if (key !== 'poster') { // Skip poster as we'll handle it separately
                    formData.append(key, value as string)
                }
            })

            // Handle file upload
            if (fileList.length > 0) {
                formData.append('poster', fileList[0].originFileObj as File)
            }

            if (editingItem) {
                updateSlider({ id: editingItem._id, data: formData })
            } else {
                createSlider(formData)
            }

            setModalVisible(false)
            setFileList([]) // Reset file list after submission
        } catch (error) {
            console.error("Validation failed:", error)
        }
    }

    const handleSearch = (value: string) => {
        setSearchText(value)
    }

    const filteredData = sliders?.filter(
        (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.anotherName.toLowerCase().includes(searchText.toLowerCase()),
    ) || []

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a: SliderItem, b: SliderItem) => a.name.localeCompare(b.name),
            render: (text: string, record: SliderItem) => (
                <div>
                    <div>{text}</div>
                    <div className="text-gray-500 text-sm">{record.anotherName}</div>
                </div>
            ),
        },
        {
            title: "Poster",
            dataIndex: "poster",
            key: "poster",
            render: (text: string) => (
                <img
                    src={text || "/placeholder.svg"}
                    alt="Poster"
                    style={{ width: "60px", height: "90px", objectFit: "cover" }}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null
                        currentTarget.src = "/placeholder.svg?height=90&width=60"
                    }}
                />
            ),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            filters: [
                { text: "Action", value: "Action" },
                { text: "Drama", value: "Drama" },
                { text: "Sci-Fi", value: "Sci-Fi" },
            ],
            onFilter: (value: string, record: SliderItem) => record.type === value,
            render: (text: string) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: "Quality",
            dataIndex: "quality",
            key: "quality",
            render: (text: string) => <Tag color="green">{text}</Tag>,
        },
        {
            title: "Language",
            dataIndex: "lang",
            key: "lang",
            render: (text: string) => (text === "en" ? "English" : text === "vi" ? "Vietnamese" : text),
        },
        {
            title: "Type",
            dataIndex: "isMovie",
            key: "isMovie",
            render: (text: string) => (text === "true" ? "Movie" : "TV Series"),
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text: string) => new Date(text).toLocaleDateString(),
            sorter: (a: SliderItem, b: SliderItem) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: SliderItem) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this item?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />} size="small">
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <div className="p-6">
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <Title level={3}>Slider Management</Title>
                    <Space>
                        <Input
                            placeholder="Search by name"
                            prefix={<SearchOutlined />}
                            onChange={(e) => handleSearch(e.target.value)}
                            style={{ width: 250 }}
                            allowClear
                        />
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                            Add New
                        </Button>
                        <Button icon={<ReloadOutlined />} onClick={() => queryClient.invalidateQueries({ queryKey: ['sliders'] })}>
                            Refresh
                        </Button>
                    </Space>
                </div>

                <Divider />

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="_id"
                    loading={isLoading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} items`,
                    }}
                />
            </Card>

            <Modal
                title={editingItem ? "Edit Slider Item" : "Add New Slider Item"}
                open={modalVisible}
                onOk={handleSave}
                onCancel={() => {
                    setModalVisible(false)
                    setFileList([])
                }}
                width={800}
                okText={editingItem ? "Update" : "Create"}
            >
                <Form form={form} layout="vertical">
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter the name" }]}>
                            <Input placeholder="Enter name" />
                        </Form.Item>

                        <Form.Item
                            name="anotherName"
                            label="Another Name"
                            rules={[{ required: true, message: "Please enter another name" }]}
                        >
                            <Input placeholder="Enter another name" />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="poster"
                        label="Poster"
                        rules={[{ required: true, message: "Please upload a poster" }]}
                    >
                        <Upload
                            listType="picture-card"
                            maxCount={1}
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList)}
                            beforeUpload={() => false} // Prevent auto upload
                            accept="image/*"
                        >
                            {fileList.length === 0 && (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="descriptions"
                        label="Descriptions"
                        rules={[{ required: true, message: "Please enter descriptions" }]}
                    >
                        <TextArea rows={4} placeholder="Enter descriptions" />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item name="type" label="Type" rules={[{ required: true, message: "Please enter the type" }]}>
                            <Input placeholder="Enter type (e.g. Tiên Hiệp, Tu Tiên, etc.)" />
                        </Form.Item>

                        <Form.Item
                            name="quality"
                            label="Quality"
                            rules={[{ required: true, message: "Please select the quality" }]}
                        >
                            <Select placeholder="Select quality">
                                <Option value="SD">SD</Option>
                                <Option value="HD">HD</Option>
                                <Option value="Full HD">Full HD</Option>
                                <Option value="4K">4K</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item name="lang" label="Language" rules={[{ required: true, message: "Please select the language" }]}>
                            <Select placeholder="Select language">
                                <Option value="en">English</Option>
                                <Option value="vi">Vietnamese</Option>
                                <Option value="ko">Korean</Option>
                                <Option value="ja">Japanese</Option>
                                <Option value="zh">Chinese</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="isMovie"
                            label="Is Movie"
                            rules={[{ required: true, message: "Please select whether this is a movie" }]}
                        >
                            <Select placeholder="Select type">
                                <Option value="drama">Drama</Option>
                                <Option value="movie">Movie</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="link"
                        label="Link"
                        rules={[
                            { required: true, message: "Please enter the link" },
                            { type: 'url', message: "Please enter a valid URL" }
                        ]}
                    >
                        <Input placeholder="Enter link (e.g. https://example.com/movie)" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default SliderAdmin
