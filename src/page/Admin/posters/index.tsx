import React, { useMemo, useState } from 'react'
import { Button, Card, Divider, Form, Input, Modal, Popconfirm, Select, Space, Table, Tag, Typography, Upload, Progress, Alert } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, SearchOutlined, PictureOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd/es/upload/interface'
import { usePosters } from '../../../hook/usePoster'
import { getAllcategory } from '../../../sevices/category'
import { useAppDispatch, useAppSelector } from '../../../hook'
import { category$ } from "../../../redux/selectors"
const { Title } = Typography
const { Option } = Select

interface CategoryOption { _id: string; name: string }

const PostersAdmin: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [bulkModalVisible, setBulkModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [bulkForm] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [bulkFileList, setBulkFileList] = useState<UploadFile[]>([])
  const [searchText, setSearchText] = useState('')
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<boolean | undefined>(undefined)
  
  const { data: categories } = useAppSelector(category$);
  
  // Use pagination parameters in the hook
  const { 
    posters, 
    isLoading, 
    createPoster, 
    updatePoster, 
    deletePoster, 
    bulkCreatePosters, 
    pagination, 
    isBulkCreating 
  } = usePosters({
    page: currentPage,
    limit: pageSize,
    category: selectedCategory || undefined,
    isActive: selectedStatus
  })

  React.useEffect(() => {
    (async () => {
      setCategoryOptions(categories.map((c: any) => ({ _id: c._id, name: c.name })))
    })()
  }, [])
  // Handle search with debouncing
  const [searchDebounced, setSearchDebounced] = useState('')
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounced(searchText)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchText])

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedStatus, searchDebounced])

  const filteredData = useMemo(() => {
    if (!searchDebounced) return posters
    const st = searchDebounced.toLowerCase()
    return posters.filter((p: any) => (p.title || '').toLowerCase().includes(st) || (p.alt || '').toLowerCase().includes(st))
  }, [posters, searchDebounced])

  const handleAdd = () => {
    setEditingId(null)
    form.resetFields()
    form.setFieldsValue({ aspect: '16:9', isActive: true, coverPoster: 'poster' })
    setFileList([])
    setModalVisible(true)
  }

  const handleBulkAdd = () => {
    bulkForm.resetFields()
    bulkForm.setFieldsValue({ aspect: '16:9', coverPoster: 'poster' })
    setBulkFileList([])
    setBulkModalVisible(true)
  }

  const handleEdit = (record: any) => {
    setEditingId(record._id)
    form.setFieldsValue({
      title: record.title,
      alt: record.alt,
      category: typeof record.category === 'string' ? record.category : record.category?._id,
      isActive: record.isActive,
      aspect: record.aspect || '16:9',
      coverPoster: record.coverPoster || 'poster',
    })
    if (record.imageUrl) {
      setFileList([{
        uid: '-1',
        name: 'poster',
        status: 'done',
        url: record.imageUrl,
      }])
    }
    setModalVisible(true)
  }

  const handleDelete = (id: string) => deletePoster(id)

  const handleSave = async () => {
    const values = await form.validateFields()
    const formData = new FormData()
    Object.entries(values).forEach(([k, v]) => formData.append(k, String(v)))
    if (fileList[0]?.originFileObj) {
      formData.append('file', fileList[0].originFileObj as File)
    }
    if (editingId) updatePoster({ id: editingId, data: formData })
    else createPoster(formData)
    setModalVisible(false)
    setFileList([])
  }

  const handleBulkSave = async () => {
    const values = await bulkForm.validateFields()
    const formData = new FormData()
    Object.entries(values).forEach(([k, v]) => formData.append(k, String(v)))
    
    bulkFileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append('files', file.originFileObj as File)
      }
    })
    
    bulkCreatePosters(formData)
    setBulkModalVisible(false)
    setBulkFileList([])
  }

  const columns: any[] = [
    {
      title: 'Poster',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: 100,
      render: (url: string) => (
        <div className="flex justify-center">
          <img 
            src={url} 
            alt="Poster" 
            className="w-16 h-24 object-cover rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200" 
          />
        </div>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (text: string) => (
        <span className="font-medium text-gray-900">{text || 'No title'}</span>
      ),
      width: 150,
    },
    {
      title: 'Alt Text',
      dataIndex: 'alt',
      key: 'alt',
      ellipsis: true,
      render: (text: string) => (
        <span className="text-gray-600">{text || 'No alt text'}</span>
      ),
      width: 150,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      render: (cat: any) => {
        const categoryName = typeof cat === 'string' ? cat : cat?.name || 'Unknown';
        return (
          <Tag color="blue" className="text-xs">
            {categoryName}
          </Tag>
        );
      },
    },
    {
      title: 'Aspect Ratio',
      dataIndex: 'aspect',
      key: 'aspect',
      width: 100,
      render: (aspect: string) => (
        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
          {aspect || '16:9'}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 100,
      render: (val: boolean) => (
        <Tag color={val ? 'green' : 'red'} className="text-xs">
          {val ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'coverPoster',
      key: 'coverPoster',
      width: 100,
      render: (val: string) => (
        val === 'cover' ? (
          <Tag color="purple" className="text-xs">Cover</Tag>
        ) : (
          <Tag color="default" className="text-xs">Poster</Tag>
        )
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button 
            size="small" 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Edit
          </Button>
          <Popconfirm 
            title="Delete this poster?" 
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record._id)}
            okText="Yes, Delete"
            cancelText="Cancel"
          >
            <Button 
              size="small" 
              danger 
              icon={<DeleteOutlined />}
            >
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
          <div>
            <Title level={3} className="!m-0">Poster Management</Title>
            {pagination && (
              <p className="text-gray-600 text-sm mt-1">
                Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, pagination.total)} of {pagination.total} posters
              </p>
            )}
          </div>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={() => window.location.reload()}>Refresh</Button>
            <Button icon={<UploadOutlined />} onClick={handleBulkAdd}>Bulk Upload</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Add Poster</Button>
          </Space>
        </div>
        
        {/* Filters */}
        <div className="mb-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-semibold text-gray-800">Filters & Search</h4>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              {isLoading && (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span>Loading...</span>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <Input 
                placeholder="Search by title/alt" 
                prefix={<SearchOutlined />} 
                onChange={e => setSearchText(e.target.value)} 
                allowClear 
                value={searchText}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Select 
                placeholder="All Categories" 
                allowClear
                value={selectedCategory}
                onChange={setSelectedCategory}
                style={{ width: '100%' }}
                loading={categoryOptions.length === 0}
              >
                {categoryOptions.map(c => (
                  <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <Select 
                placeholder="All Status" 
                allowClear
                value={selectedStatus}
                onChange={setSelectedStatus}
                style={{ width: '100%' }}
              >
                <Option value={true}>Active</Option>
                <Option value={false}>Inactive</Option>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={() => {
                  setSearchText('')
                  setSelectedCategory('')
                  setSelectedStatus(undefined)
                  setCurrentPage(1)
                }}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white"
                icon={<ReloadOutlined />}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
        <Divider />
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="_id"
            loading={isLoading}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: pagination?.total || 0,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} posters`,
              pageSizeOptions: ['10', '20', '50', '100'],
              onChange: (page, size) => {
                setCurrentPage(page)
                setPageSize(size || 10)
              },
              onShowSizeChange: (current, size) => {
                setCurrentPage(1)
                setPageSize(size)
              },
              className: "px-6 py-4"
            }}
            className="min-w-full"
            size="middle"
          />
        </div>
      </Card>

      <Modal
        title={editingId ? 'Edit Poster' : 'Add Poster'}
        open={modalVisible}
        onOk={handleSave}
        onCancel={() => { setModalVisible(false); setFileList([]) }}
        okText={editingId ? 'Update' : 'Create'}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select category' }]}>
            <Select placeholder="Select category" showSearch optionFilterProp="children">
              {categoryOptions.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item name="title" label="Title">
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item name="alt" label="Alt text">
            <Input placeholder="Alt text" />
          </Form.Item>

          <Form.Item name="isActive" label="Status" initialValue={true}>
            <Select>
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item name="coverPoster" label="Use as cover" initialValue={'poster'}>
            <Select>
              <Option value="cover">Cover</Option>
              <Option value="poster">Poster</Option>
            </Select>
          </Form.Item>

          <Form.Item name="aspect" label="Aspect Ratio" initialValue={'16:9'}>
            <Select>
              <Option value="1:1">1:1</Option>
              <Option value="16:9">16:9</Option>
              <Option value="4:3">4:3</Option>
              <Option value="3:2">3:2</Option>
              <Option value="21:9">21:9</Option>
              <Option value="9:16">9:16</Option>
              <Option value="2:3">2:3</Option>
            </Select>
          </Form.Item>

          <Form.Item name="file" label="Poster image" rules={[{ required: !editingId, message: 'Please upload poster image' }]}>
            <Upload
              listType="picture-card"
              maxCount={1}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              accept="image/*"
            >
              {fileList.length === 0 && (
                <div>
                  <PictureOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Bulk Upload Modal */}
      <Modal
        title="Bulk Upload Posters"
        open={bulkModalVisible}
        onOk={handleBulkSave}
        onCancel={() => { setBulkModalVisible(false); setBulkFileList([]) }}
        okText="Upload All"
        width={600}
        confirmLoading={isBulkCreating}
      >
        <Form form={bulkForm} layout="vertical">
          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select category' }]}>
            <Select placeholder="Select category" showSearch optionFilterProp="children">
              {categoryOptions.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item name="coverPoster" label="Use first image as cover" initialValue={'poster'}>
            <Select>
              <Option value="cover">Yes, make first image cover</Option>
              <Option value="poster">No, all as posters</Option>
            </Select>
          </Form.Item>

          <Form.Item name="aspect" label="Aspect Ratio" initialValue={'16:9'}>
            <Select>
              <Option value="1:1">1:1</Option>
              <Option value="16:9">16:9</Option>
              <Option value="4:3">4:3</Option>
              <Option value="3:2">3:2</Option>
              <Option value="21:9">21:9</Option>
              <Option value="9:16">9:16</Option>
              <Option value="2:3">2:3</Option>
            </Select>
          </Form.Item>

          <Form.Item 
            name="files" 
            label="Upload Multiple Images" 
            rules={[{ required: true, message: 'Please upload at least one image' }]}
          >
            <Upload.Dragger
              multiple
              maxCount={10}
              fileList={bulkFileList}
              onChange={({ fileList }) => setBulkFileList(fileList)}
              beforeUpload={() => false}
              accept="image/*"
              listType="picture-card"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag files to this area to upload</p>
              <p className="ant-upload-hint">
                Support for multiple images (max 10 files). All images will be uploaded to the selected category.
              </p>
            </Upload.Dragger>
          </Form.Item>

          {bulkFileList.length > 0 && (
            <Alert
              message={`Selected ${bulkFileList.length} files`}
              description="Files will be named as 'Poster 1', 'Poster 2', etc. automatically."
              type="info"
              showIcon
              style={{ marginTop: 16 }}
            />
          )}
        </Form>
      </Modal>
    </div>
  )
}

export default PostersAdmin


