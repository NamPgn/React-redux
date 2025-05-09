import React from "react"
import { useContext, useState } from "react"
import {
  Card,
  Typography,
  Table,
  Form,
  Input,
  Button,
  Space,
  Divider,
  Popconfirm,
  Row,
  Col,
  Badge,
  Empty,
  Tooltip,
} from "antd"
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
  ExclamationCircleOutlined,
  ExpandAltOutlined,
} from "@ant-design/icons"
import { useForm, Controller } from "react-hook-form"
import { addWeeks, deleteCategoryByWeek, removeWeeks } from "../../../sevices/week"
import MVLink from "../../../components/Location/Link"
import { MVError, MVSuccess } from "../../../components/Message"
import { ApiContext } from "../../../context/api"
import { mutate } from "swr"
import { urlSwr } from "../../../function"

const { Title, Text } = Typography

const Weeks = () => {
  const { weeks } = useContext(ApiContext)
  const { handleSubmit, control, reset } = useForm()
  const [loading, setLoading] = useState(false)
  const [expandedRowKeys, setExpandedRowKeys] = useState([])
  const [deletingWeek, setDeletingWeek] = useState(null)
  const [deletingCategory, setDeletingCategory] = useState(null)

  // Handle deleting a category from a week
  const handleDeleteCategoryByWeek = async (weekId, categoryId) => {
    setDeletingCategory(categoryId)
    try {
      const response = await deleteCategoryByWeek(weekId, { categoryId })
      if (response.data) {
        mutate(urlSwr + "/weeks")
        MVSuccess("Category removed successfully")
      }
    } catch (error) {
      MVError("Failed to remove category")
      console.error("Error removing category:", error)
    } finally {
      setDeletingCategory(null)
    }
  }

  // Handle adding a new week
  const onAdd = async (data) => {
    setLoading(true)
    try {
      await addWeeks(data)
      MVSuccess("Week added successfully")
      reset({ name: "" })
      mutate(urlSwr + "/weeks")
    } catch (error) {
      MVError("Failed to add week")
      console.error("Error adding week:", error)
    } finally {
      setLoading(false)
    }
  }

  // Handle deleting a week
  const handleDelete = async (id) => {
    setDeletingWeek(id)
    try {
      await removeWeeks(id)
      MVSuccess("Week deleted successfully")
      mutate(urlSwr + "/weeks")
    } catch (error) {
      MVError("Failed to delete week")
      console.error("Error deleting week:", error)
    } finally {
      setDeletingWeek(null)
    }
  }

  // Columns for the nested categories table
  const categoryColumns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      ellipsis: true,
      width: "30%",
      render: (id) => (
        <Tooltip title={id}>
          <Text type="secondary" style={{ fontSize: "0.85rem" }}>
            {id}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <Text strong>{name}</Text>,
    },
    {
      title: "Action",
      key: "operation",
      width: 100,
      render: (_, category, index) => (
        <Popconfirm
          title="Remove this category"
          description="Are you sure you want to remove this category from this week?"
          onConfirm={() => handleDeleteCategoryByWeek(category.weekId, category._id)}
          okText="Yes"
          cancelText="No"
          icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
        >
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            size="small"
            loading={deletingCategory === category._id}
          />
        </Popconfirm>
      ),
    },
  ]

  // Expanded row render function for showing categories
  const expandedRowRender = (record) => {
    // Get categories for this week
    const weekData = weeks.find((week) => week._id === record.key)
    const dataCategorys = weekData?.category || []

    // Add weekId to each category for reference when deleting
    const categoriesWithWeekId = dataCategorys.map((category) => ({
      ...category,
      weekId: record.key,
    }))

    return (
      <div className="nested-table-container">
        {categoriesWithWeekId.length > 0 ? (
          <Table
            columns={categoryColumns}
            dataSource={categoriesWithWeekId}
            pagination={categoriesWithWeekId.length > 10 ? { pageSize: 10 } : false}
            size="small"
            rowKey="_id"
            className="nested-table"
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No categories in this week" className="py-6" />
        )}
      </div>
    )
  }

  // Main table columns
  const columns = [
    {
      title: "Week Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <Space>
          <CalendarOutlined style={{ color: "#1677ff" }} />
          <Text strong>{name}</Text>
          <Badge
            count={record.categoryCount}
            style={{ backgroundColor: record.categoryCount ? "#52c41a" : "#d9d9d9" }}
            overflowCount={99}
            showZero
          />
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "action",
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <MVLink to={`/dashboard/week/edit/${record.name}`}>
            <Button type="primary" icon={<EditOutlined />} size="middle">
              Edit
            </Button>
          </MVLink>

          <Popconfirm
            title="Delete this week"
            description="Are you sure? This will remove all associated categories."
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
            icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
          >
            <Button danger icon={<DeleteOutlined />} loading={deletingWeek === record.key}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  // Prepare data for the main table
  const data =
    weeks?.map((week) => ({
      key: week._id,
      name: week.name,
      categoryCount: week.category?.length || 0,
    })) || []

  return (
    <div className="weeks-management-container">
      <Card className="mb-6">
        <Title level={4} className="mb-4">
          <CalendarOutlined className="mr-2" /> Weeks Management
        </Title>

        <Text type="secondary" className="mb-4 block">
          Manage weekly categories and organize your content by week.
        </Text>

        <Divider />

        <form onSubmit={handleSubmit(onAdd)}>
          <Row gutter={16} align="middle">
            <Col xs={24} sm={18}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Week name is required" }}
                render={({ field, fieldState: { error } }) => (
                  <Form.Item
                    label={<Text strong>Week Name</Text>}
                    validateStatus={error ? "error" : ""}
                    help={error?.message}
                    className="mb-0"
                  >
                    <Input
                      {...field}
                      placeholder="Enter week name"
                      prefix={<CalendarOutlined className="text-gray-400" />}
                      disabled={loading}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col xs={24} sm={6} className="text-right">
              <Button
                type="primary"
                htmlType="submit"
                icon={<PlusOutlined />}
                loading={loading}
                className="w-full sm:w-auto"
              >
                Add Week
              </Button>
            </Col>
          </Row>
        </form>
      </Card>

      <Card bodyStyle={{ padding: 0 }}>
        <Table
          columns={columns}
          dataSource={data}
          rowClassName="cursor-pointer hover:bg-gray-50"
          expandable={{
            expandedRowRender,
            expandRowByClick: true,
            expandIcon: ({ expanded, onExpand, record }) => (
              <Button
                type="text"
                icon={expanded ? <ExpandAltOutlined rotate={180} /> : <ExpandAltOutlined />}
                onClick={(e) => {
                  e.stopPropagation()
                  onExpand(record, e)
                }}
                size="small"
                className="mr-2"
              />
            ),
            expandedRowKeys,
            onExpandedRowsChange: setExpandedRowKeys,
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} weeks`,
          }}
          locale={{
            emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No weeks found" />,
          }}
        />
      </Card>

      <style jsx global>{`
        .weeks-management-container .ant-table-thead > tr > th {
          background-color: #fafafa;
        }
        
        .nested-table-container {
          padding: 0 16px 16px;
          background-color: #f9f9f9;
          border-radius: 0 0 8px 8px;
        }
        
        .nested-table .ant-table-thead > tr > th {
          background-color: #f0f0f0;
          font-size: 0.9rem;
        }
        
        .nested-table .ant-table-tbody > tr > td {
          padding: 8px 16px;
        }
        
        .nested-table .ant-empty {
          margin: 16px 0;
        }
      `}</style>
    </div>
  )
}

export default Weeks
