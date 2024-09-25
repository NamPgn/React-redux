import React, { memo, useContext, useEffect, useState } from "react";
import { Spin } from "antd";
import {
  getProducts,
  deleteProduct,
  filterProductByCategorySlice,
  searchProductsSlice,
} from "../../../redux/slice/product/thunk/product";
import { toast } from "react-toastify";
import {
  approvedMultipleMovies,
  approveProduct,
  cancelApproveProduct,
  clearCacheProducts,
  deleteMultipleProduct,
  endcodeMutipleDailymotionServer,
} from "../../../sevices/product";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { MyButton } from "../../../components/MV/Button";
import MySelect from "../../../components/MV/Select";
import {
  ArrowUpOutlined,
  CheckOutlined,
  ClearOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SendOutlined,
} from "@ant-design/icons";
import MVTable from "../../../components/MV/Table";
import MVConfirm from "../../../components/MV/Confirm";
import MVRow from "../../../components/MV/Grid";
import MVCol from "../../../components/MV/Grid/Col";
import MVLink from "../../../components/Location/Link";
import { MVError, MVSuccess } from "../../../components/Message";
import MVTags from "../../../components/MV/Tag";
import { ApiContext } from "../../../context/api";
import { MyContext } from "../../../context";

const ProductAdmin = memo(({ products, isLoading }: any) => {
  const [page, setPage] = useState(1); // Đặt trang mặc định là trang cuối cùng
  const cate: any = useAppSelector((state) => state.category.category);
  const { seri }: any = useContext(ApiContext) || [];
  const { user }: any = useContext(MyContext);
  // const [search, searchState] = useState("");
  const [filterApproved, setFilterApproved] = useState("");
  // const [checkedId, setCheckedId]: any = useState([]);
  // const [checkAllid, setCheckAllid] = useState(false);
  const [init, setInit] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // const itemsPerPage = 40;
    // const totalPages = Math.ceil(length / itemsPerPage);
    // const defaultPage: any = totalPages;
    // setDataLength(defaultPage);
    // setPage(defaultPage);
    dispatch(getProducts(page));
  }, [init]);

  const handleSelectChange = (value: any) => {
    dispatch(filterProductByCategorySlice(value));
  };
  const handleSearch = (value: any) => {
    dispatch(searchProductsSlice(value));
  };
  const handlePageChangePage = (value) => {
    setPage(value);
    dispatch(getProducts(value));
  };

  if (filterApproved) {
    products = products.data.filter((item: any) => item.isApproved == false);
    filterApproved == "Select" &&
      products.data.map((item: any) => products?.data.push(item));
  }
  const handleDeleteSelectedData = async () => {
    const response: any = await deleteMultipleProduct(selectedRowKeys);
    if (response.data.success == true) {
      setInit(!init);
      toast.success("Delete products successfully");
    } else {
      toast.error("Error deleting products");
    }
  };

  const handleApprovedMultipleMovies = async () => {
    const response: any = await approvedMultipleMovies(selectedRowKeys);
    if (response.data.success == true) {
      setInit(!init);
      toast.success("Approved Products Successfully");
    } else {
      toast.error("Error deleting products");
    }
  };

  const handleEditEncodeMutipleDailymotionServer = async () => {
    const response: any = await endcodeMutipleDailymotionServer(
      selectedRowKeys
    );
    if (response.data.success == true) {
      setInit(!init);
      toast.success("Edit Products Successfully");
    } else {
      toast.error("Error deleting products");
    }
  };
  const confirm = async (id) => {
    const response = await dispatch(deleteProduct(id));
    if (response.payload.success) {
      toast.success("Delete product successfully");
    } else {
      toast.error("Error deleting product");
    }
  };

  const handleChangeSelectApprove = (value: any) => {
    setFilterApproved(value);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleApproved = async (id: any) => {
    const response = await approveProduct(id);
    if (response.data.success == true) {
      MVSuccess(response.data.message);
      setInit(!init);
    } else {
      MVError("Lỗi rồi!");
    }
  };

  const cancelHandleApproved = async (id: any) => {
    const response = await cancelApproveProduct(id);
    if (response.data.success == true) {
      MVSuccess(response.data.message);
      setInit(!init);
    } else {
      MVError("Lỗi rồi!");
    }
  };
  const handleClearCache = async () => {
    const res = await clearCacheProducts();
    if (res.data.suscess == true) {
      MVSuccess(res.data.message);
    } else {
      MVError(res.data.message);
    }
  };

  const columnsProduct = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 120,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      width: 200,
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      width: 150,
    },
    {
      title: "View",
      key: "view",
      dataIndex: "view",
      width: 100,
    },
    {
      title: "Seri",
      key: "seri",
      dataIndex: "seri",
      width: 100,
    },
    {
      title: "Copyright",
      key: "copyright",
      dataIndex: "copyright",
      width: 100,
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      width: 90,
    },
    {
      title: "Trailer",
      dataIndex: "trailer",
      key: "trailer",
      width: 100,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      width: 100,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: 100,
    },
    {
      title: "Options",
      dataIndex: "options",
      key: "options",
      width: 100,
    },
    {
      title: "Sidebar",
      key: "sidebar",
      dataIndex: "sidebar",
      width: 100,
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: 140,
      fixed: "right",
      render: (_: any, record: any) => {
        switch (user?.role) {
          case 0:
            return (
              <>
                <MVLink to={"/"}>
                  <MyButton type="text" shape="circle">
                    <EyeOutlined />
                  </MyButton>
                </MVLink>
              </>
            );
          case 1:
            return (
              <>
                <MVLink to={"/"}>
                  <MyButton type="text" shape="circle">
                    <EyeOutlined />
                  </MyButton>
                </MVLink>
                <MVLink to={`/dashboard/product/edit/${record.key}`}>
                  <MyButton type="text" danger shape="circle">
                    <EditOutlined />
                  </MyButton>
                </MVLink>
              </>
            );
          case 2:
            return (
              <>
                {record?.isApproved == true ? (
                  <>
                    <MyButton
                      className="flex items-center mb-2"
                      icon={<CheckOutlined />}
                      ghost
                      type="text"
                      style={{
                        color: "#000",
                      }}
                      disabled={record.isApproved == true ? true : false}
                    >
                      Approved
                    </MyButton>
                    <MyButton
                      onClick={() => cancelHandleApproved(record.key)}
                      icon={<CloseCircleOutlined />}
                      className="flex items-center w-full justify-center mb-2"
                      danger
                    >
                      Approval
                    </MyButton>
                  </>
                ) : (
                  <>
                    <MyButton
                      onClick={() => handleApproved(record.key)}
                      icon={<SendOutlined />}
                      className="flex items-center w-full justify-center text-white bg-blue-500"
                    >
                      Approve
                    </MyButton>
                  </>
                )}
                <div className="flex">
                  <MVLink to={"/d/" + record.key}>
                    <MyButton type="text" shape="circle">
                      <EyeOutlined />
                    </MyButton>
                  </MVLink>
                  <MVLink to={`/dashboard/product/edit/${record.key}`}>
                    <MyButton type="text" danger shape="circle">
                      <EditOutlined />
                    </MyButton>
                  </MVLink>
                  <MVConfirm
                    title="Delete the product"
                    onConfirm={() => confirm(record.key)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <MyButton type="text" shape="circle" className="ml-2">
                      <DeleteOutlined />
                    </MyButton>
                  </MVConfirm>
                  <MyButton type="text" shape="circle" className="ml-2">
                    <ArrowUpOutlined type="success" />
                  </MyButton>
                </div>
              </>
            );
            break;
          default:
            break;
        }
      },
    },
  ];
  const data =
    products?.data &&
    products?.data.map((value: any) => {
      return {
        key: value.slug,
        name: value.name,
        slug: value.slug,
        trailer: value.trailer ? "true" : "false",
        category:
          cate &&
          cate.data.map((item: any) => {
            if (item._id === value.category) return item.name;
          }),
        view: <MVTags color="#2db7f5">{value.view}</MVTags>,
        sidebar: seri && seri.map((i, v) => i._id === value.typeId && i.name),
        seri: value.seri,
        copyright: value.copyright,
        isActive:
          value.server2 || value.dailyMotionServer ? (
            <MVTags color="success">Video active</MVTags>
          ) : (
            <MVTags color="error">No video</MVTags>
          ),
        options: value.options,
        country: value.category.country ? value.category.country : "null",
        year: value.category.year ? value.category.year : "null",
        isApproved: value.isApproved,
        idCategory: value.category,
        option: [<MyButton>Add Option</MyButton>],
      };
    });
  return (
    <>
      {/* <InputStyled
				type="checkbox"
				className="mr-2"
				checked={checkAllid}
				onChange={() => handleCheckAll()}
			/> */}
      <MVRow
        gutter={[10, 10]}
        align={"middle"}
        style={{
          marginBottom: "10px",
        }}
      >
        <MVCol>
          <MVConfirm
            title="Delete The Movies"
            onConfirm={handleDeleteSelectedData}
            okText="Yes"
            cancelText="No"
          >
            <MyButton icon={<DeleteOutlined />} className="flex items-center bg-gradient-to-br from-pink-500 to-orange-400 text-white">
              Delete Multiple Movies
            </MyButton>
          </MVConfirm>
        </MVCol>
        <MVConfirm
          title="Approved Multiple Movies"
          onConfirm={handleApprovedMultipleMovies}
          okText="Yes"
          cancelText="No"
        >
          <MyButton
            icon={<CheckOutlined />}
            className="flex items-center bg-amber-500 text-white"
          >
            Approved Multiple
          </MyButton>
        </MVConfirm>


        <MVConfirm
          title="Edit Multiple Movies"
          onConfirm={handleEditEncodeMutipleDailymotionServer}
          okText="Yes"
          cancelText="No"
        >
          <MyButton
            icon={<EditOutlined />}
            className="flex items-center mx-2 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
          >
            Edit Multiple
          </MyButton>
        </MVConfirm>
        <MVCol>
          <MVLink to={"/dashboard/product/add"}>
            <MyButton
              icon={<PlusOutlined />}
              
              className="flex items-center text-white bg-blue-500"
            >
              Add Movie
            </MyButton>
          </MVLink>
        </MVCol>
        <MVCol>
          <MVLink icon={<PlusOutlined />} to={"/dashboard/product/creacting"}>
            <MyButton className="bg-green-400 ">Add Multiple Movies</MyButton>
          </MVLink>
        </MVCol>
        <MVCol>
          <MVLink to={"/dashboard/product/add"}>
            <MyButton className="bg-yellow-400">Export PDF</MyButton>
          </MVLink>
        </MVCol>
        <MVCol>
          <MVLink to={"/dashboard/product/add"}>
            <MyButton className="bg-purple-500" shape="round">
              Export Excel
            </MyButton>
          </MVLink>
        </MVCol>
        <MVCol>
          <MySelect
            placeholder={"Category"}
            onChange={handleSelectChange}
            style={{ width: 300 }}
            options={
              cate &&
              cate?.data.map((item, index) => ({
                label: item.name,
                value: item._id,
              }))
            }
          />
        </MVCol>
        <MVCol>
          <MySelect
            placeholder={"Approval"}
            onChange={handleChangeSelectApprove}
            style={{ width: 300 }}
            options={[
              { value: true, label: "Approve" },
              { value: false, label: "Approved" },
            ]}
            children={undefined}
          />
        </MVCol>
        <MVCol>
          <div className="form-outline">
            <input
              type="search"
              placeholder="search..."
              className="form-control p-2 rounded bg-[#fff] shadow-sm"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </MVCol>
        <MVCol>
          <MyButton
            onClick={() => handleClearCache()}
            icon={<PlusOutlined />}
            danger
            className="flex items-center"
          >
            <ClearOutlined />
            Clear Products Redis
          </MyButton>
        </MVCol>
      </MVRow>
      <Spin spinning={isLoading} delay={undefined}>
        <MVTable
          rowSelection={rowSelection}
          expandable={{
            expandedRowRender: (record: any) => <>{record.option}</>,
          }}
          columns={columnsProduct}
          dataSource={data}
          scroll={{ x: 1500, y: 1000 }}
          pagination={{
            defaultPageSize: 40,
            showSizeChanger: true,
            pageSizeOptions: ["40", "80", "120"],
            current: page,
            onChange: handlePageChangePage,
            total: products?.totalCount,
          }}
        />
      </Spin>
    </>
  );
});

export default ProductAdmin;
