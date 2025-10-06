import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Input,
  Tabs,
  Dropdown,
  Space,
  Switch,
  Card,
  Button,
  Row,
  Col,
  Typography,
} from "antd";
import { debounce } from "lodash";
import {
  changeIsActiveCategorySlice,
  deleteCategorySlice,
  getAllcate,
} from "../../../redux/slice/category/thunk/category";
import { category$ } from "../../../redux/selectors";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { MyButton } from "../../../components/MV/Button";
import { columnsCategory } from "../../../constant";
import MVTable from "../../../components/MV/Table";
import MVLink from "../../../components/Location/Link";
import MVTags from "../../../components/MV/Tag";
import { ApiContext } from "../../../context/api";
import AddCategoryModal from "./component/addCategoryModal";
import EditCategoryModal from "./component/editCategoryModal";
import {
  EditOutlined, 
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {
  CATEGORY_STATUS,
  PAGINATION_DEFAULTS,
  CATEGORY_ERROR_MESSAGES,
  CATEGORY_SUCCESS_MESSAGES,
} from "../../../constants/category";
import RecycleBin from "./component/recycleBin";

const { Text } = Typography;
const { Search } = Input;

const CategoryAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditRecord, setSelectedEditRecord] = useState<any>(null);
  const [page, setPage]: any = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  
  const dispatch = useAppDispatch();
  const category = useAppSelector(category$);
  const { weeks } = useContext(ApiContext);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const showEditModal = (record: any) => {
    setSelectedEditRecord(record);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEditRecord(null);
  };
  useEffect(() => {
    dispatch(getAllcate({ page, search: searchTerm }));
  }, [page, searchTerm]);

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      setSearchTerm(searchValue);
      setPage(1);
    }, 500);

    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchValue]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setSearchTerm("");
    setPage(1);
  };

  const handleModalSuccess = () => {
    dispatch(getAllcate({ page, search: searchTerm }));
  };

  const handleDelete = async (id: string | number) => {
    const res = await dispatch(deleteCategorySlice(id));
    if (res.payload) {
      toast.success(CATEGORY_SUCCESS_MESSAGES.DELETED);
    } else {
      toast.error(CATEGORY_ERROR_MESSAGES.DELETE_FAILED);
    }
  };

  const handleChangeIsActive = async (slug: string, isActive: boolean) => {
    const res = await dispatch(changeIsActiveCategorySlice({ slug, isActive }));
    if (res.payload.success) {
      toast.success(CATEGORY_SUCCESS_MESSAGES.TOGGLE_ACTIVE_SUCCESS);
      dispatch(getAllcate({ page, search: searchTerm }));
    } else {
      toast.error(CATEGORY_ERROR_MESSAGES.TOGGLE_ACTIVE_FAILED);
    }
  };

  // const hanedlePushCategoryToType = async (categoryId) => {
  //   const body = {
  //     categoryId: categoryId,
  //   };
  //   const res = await pushCateTotype(valueId, body);
  //   if (res.data.success) {
  //     MVSuccess("Add category success!");
  //   } else {
  //     MVError("Failure!");
  //   }
  // };

  const handlePageChangePage = (page: number) => {
    setPage(page);
  };

  const data =
    category.data &&
    category.data.map((item: any) => {
      const actionItems = [
        {
          key: "edit",
          label: (
            <Space onClick={() => showEditModal(item)}>
              <EditOutlined />
              Edit
            </Space>
          ),
        },
        {
          key: "delete",
          label: (
            <Space onClick={() => handleDelete(item._id)}>
              <DeleteOutlined />
              Delete
            </Space>
          ),
          danger: true,
        },
        // {
        //   key: "push",
        //   label: (
        //     <Space onClick={() => hanedlePushCategoryToType(item._id)}>
        //       <PushpinOutlined />
        //       Push
        //     </Space>
        //   ),
        // },
        {
          key: "combining-episodes",
          label: (
            <MVLink to={`/dashboard/category/combining-episodes/${item._id}`}>
              <Space>
                <PlusOutlined />
                Combining Episodes
              </Space>
            </MVLink>
          ),
        },
      ];
      return {
        key: item._id,
        name: <MVLink to={"/q/" + item._id}>{item.name}</MVLink>,
        slug: item.slug,
        image: (
          <Image
            width={150}
            height={200}
            style={{ objectFit: "cover" }}
            src={item.linkImg}
          />
        ),
        createAt: item.createdAt,
        duration: item.time,

        status:
          item.status === CATEGORY_STATUS.PENDING ? (
            <MVTags color="warning">Pending</MVTags>
          ) : (
            <MVTags color="success">Completed</MVTags>
          ),
        year: item.year,
        set: item.up,
        isActive: (
          <Switch
            className="ant-switch"
            checked={item.isActive}
            onChange={(checked) => handleChangeIsActive(item.slug, checked)}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        ),
        week: item.week?.length > 0 ? item.week.map(w => w.name).join(" | ") : <Space><CheckOutlined style={{ color: '#52c41a' }} /> <Text style={{ color: '#52c41a' }}>Hoàn Thành</Text></Space>,
        action: (
          <div className="flex items-center gap-2">
            <Dropdown
              menu={{ items: actionItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <MyButton type="text">
                <MoreOutlined size={16} />
              </MyButton>
            </Dropdown>
            <Space 
              className="cursor-pointer" 
              onClick={() => showEditModal(item)}
            >
              <EditOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
            </Space>
          </div>
        ),
      };
    });
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Category List" key="1">
          <Card style={{ marginBottom: '16px' }}>
            <Row gutter={[8, 8]} align="middle">
              <Col xs={24} sm={18} md={4}>
                <Search
                  placeholder="Tìm kiếm danh mục..."
                  value={searchValue}
                  onChange={handleSearch}
                  allowClear
                  onClear={handleClearSearch}
                  style={{ width: '100%' }}
                  size="middle"
                />
              </Col>
              <Col xs={24} sm={6} md={2}>
                <Button
                  type="primary"
                  onClick={showModal}
                  icon={<PlusOutlined />}
                  size="middle"
                  block
                >
                  Create New
                </Button>
              </Col>
            </Row>
          </Card>
            <MVTable
              columns={columnsCategory}
              dataSource={data}
              scroll={{ x: 1000, y: 1000 }}
              pagination={{
                defaultPageSize: PAGINATION_DEFAULTS.PAGE_SIZE,
                showSizeChanger: PAGINATION_DEFAULTS.SHOW_SIZE_CHANGER,
                pageSizeOptions: PAGINATION_DEFAULTS.PAGE_SIZE_OPTIONS,
                showQuickJumper: PAGINATION_DEFAULTS.SHOW_QUICK_JUMPER,
                current: page,
                onChange: handlePageChangePage,
                total: category?.totalCount,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} categories`,
              }}
            />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Recycle Bin" key="2">
          <RecycleBin />
        </Tabs.TabPane>
      </Tabs>

      {/* Add Category Modal */}
      <AddCategoryModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
        weeks={weeks}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSuccess={handleModalSuccess}
        categoryId={selectedEditRecord?.slug}
        weeks={weeks}
      />
    </div>
  );
};

export default CategoryAdmin;
