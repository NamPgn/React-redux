import React, { useMemo, useState } from 'react'
import { Button, Card, Divider, Form, Input, Modal, Popconfirm, Select, Space, Table, Tag, Typography, Upload } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, SearchOutlined, PictureOutlined } from '@ant-design/icons'
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
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [searchText, setSearchText] = useState('')
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const { data: categories } = useAppSelector(category$);
  const { posters, isLoading, createPoster, updatePoster, deletePoster, pagination } = usePosters()

  React.useEffect(() => {
    (async () => {
      setCategoryOptions(categories.map((c: any) => ({ _id: c._id, name: c.name })))
    })()
  }, [])

  const filteredData = useMemo(() => {
    if (!searchText) return posters
    const st = searchText.toLowerCase()
    return posters.filter((p: any) => (p.title || '').toLowerCase().includes(st) || (p.alt || '').toLowerCase().includes(st))
  }, [posters, searchText])

  const handleAdd = () => {
    setEditingId(null)
    form.resetFields()
    form.setFieldsValue({ aspect: '16:9', isActive: true })
    setFileList([])
    setModalVisible(true)
  }

  const handleEdit = (record: any) => {
    setEditingId(record._id)
    form.setFieldsValue({
      title: record.title,
      alt: record.alt,
      category: typeof record.category === 'string' ? record.category : record.category?._id,
      isActive: record.isActive,
      aspect: record.aspect || '16:9',
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

  const columns: any[] = [
    {
      title: 'Poster',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (url: string) => (
        <img src={url} alt="Poster" style={{ width: 60, height: 90, objectFit: 'cover' }} />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Alt',
      dataIndex: 'alt',
      key: 'alt',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (cat: any) => (typeof cat === 'string' ? cat : cat?.name || ''),
    },
    {
      title: 'Aspect',
      dataIndex: 'aspect',
      key: 'aspect',
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (val: boolean) => <Tag color={val ? 'green' : 'red'}>{val ? 'Active' : 'Inactive'}</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button size="small" type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm title="Delete this poster?" onConfirm={() => handleDelete(record._id)}>
            <Button size="small" danger icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Title level={3} className="!m-0">Poster Management</Title>
          <Space>
            <Input placeholder="Search by title/alt" prefix={<SearchOutlined />} onChange={e => setSearchText(e.target.value)} allowClear style={{ width: 260 }} />
            <Button icon={<ReloadOutlined />} onClick={() => window.location.reload()}>Refresh</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Add Poster</Button>
          </Space>
        </div>
        <Divider />
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="_id"
          loading={isLoading}
          pagination={{ pageSize: 10 }}
        />
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
    </div>
  )
}

export default PostersAdmin


