import React, { memo, useContext, useEffect, useState } from "react";
import { Spin, Tag } from "antd";
import {
  getProducts,
  deleteProduct,
  filterProductByCategorySlice,
  searchProductsSlice,
} from "../../../redux/slice/product/thunk/product";
import { toast } from "react-toastify";
import {
  approveProduct,
  cancelApproveProduct,
  deleteMultipleProduct,
} from "../../../sevices/product";
import styled from "styled-components";
import { useAppDispatch } from "../../../hook";
import { MyContext } from "../../../context";
import { MyButton } from "../../../components/MV/Button";
import MySelect from "../../../components/MV/Select";
import {
  CheckOutlined,
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

const ProductAdmin = memo(({ product, length, isLoading }: any) => {
  const { category, seri, user }: any = useContext(MyContext);
  const [search, searchState] = useState("");
  const [filterApproved, setFilterApproved] = useState("");
  // const [checkedId, setCheckedId]: any = useState([]);
  // const [checkAllid, setCheckAllid] = useState(false);
  const [init, setInit] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const [page, setPage] = useState(3);
  const dispath = useAppDispatch();
  let dataS = product;
  useEffect(() => {
    dispath(getProducts(page));
  }, [init, page]);
  const handleSelectChange = (value: any) => {
    dispath(filterProductByCategorySlice(value));
  };
  const handleSearch = (value: any) => {
    dispath(searchProductsSlice(value));
  };
  if (search.length) {
    dataS = product.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  // if (filter) {
  //   dataS = product.filter((item: any) => filter == item.category);
  //   filter == "Select" ? product.map((item: any) => dataS.push(item)) : "";
  // }
  if (filterApproved) {
    dataS = product.filter((item: any) => item.isApproved == false);
    filterApproved == "Select" && product.map((item: any) => dataS.push(item));
  }
  // const hanedleCheckboxChange = (id: any) => {
  // 	if (checkedId.includes(id)) {
  // 		setCheckedId(checkedId.filter(itemId => itemId !== id));
  // 	} else {
  // 		setCheckedId([...checkedId, id]);
  // 	}
  // }

  // const handleCheckAll = () => {
  // 	setCheckAllid(!checkAllid); //nếu mà bằng true
  // 	if (!checkAllid) {
  // 		setCheckedId(product.map((item) => item._id))
  // 	} else {
  // 		setCheckedId([]);
  // 	}
  // }
  //bấm để cút
  const handleDeleteSelectedData = async () => {
    // dispath(deleteMultipleData(checkedId)) //xóa theo mảng
    // setCheckAllid([]); //xóa xong thì về 1 mảng rỗng
    // await deleteMultipleProduct(checkedId);
    const response: any = await deleteMultipleProduct(selectedRowKeys);
    if (response.data.success == true) {
      setInit(!init);
      toast.success("Delete products successfully");
    } else {
      toast.error("Error deleting products");
    }
    // if (window.confirm(checkedId) == true) {
    // 	toast.success('Xóa tất cả thành công');
    // 	await deleteMultipleProduct(checkedId);
    // }
  };

  const confirm = async (id) => {
    const response = await dispath(deleteProduct(id));
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
  const columnsProduct = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
    },
    {
      title: "Sidebar",
      key: "sidebar",
      dataIndex: "sidebar",
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
                      className="flex items-center w-full justify-center"
                      type="primary"
                    >
                      Approve
                    </MyButton>
                  </>
                )}
                <MVLink to={"/d/" + record.key + "?c" + record.idCategory}>
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
    dataS &&
    dataS.map((value: any, index: any) => {
      return {
        key: value._id,
        name: value.name,
        trailer: value.trailer ? "true" : "false",
        category:
          category &&
          category.data.map((item: any) => {
            if (item._id === value.category) return item.name;
          }),
        sidebar: seri && seri.map((i, v) => i._id === value.typeId && i.name),
        seri: value.seri,
        copyright: value.copyright,
        isActive:
          value.server2 || value.dailymotion ? (
            <Tag color="success">Video active</Tag>
          ) : (
            <Tag color="error">No video</Tag>
          ),
        options: value.options,
        country: value.country ? value.country : "null",
        year: value.year ? value.year : "null",
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
            title="Delete the products"
            onConfirm={handleDeleteSelectedData}
            okText="Yes"
            cancelText="No"
          >
            <MyButton icon={<DeleteOutlined />} className="flex items-center">
              Delete
            </MyButton>
          </MVConfirm>
        </MVCol>
        <MVCol>
          <MVLink to={"/dashboard/product/add"}>
            <MyButton icon={<PlusOutlined />} className="flex items-center">
              Add Product
            </MyButton>
          </MVLink>
        </MVCol>
        <MVCol>
          <MVLink icon={<PlusOutlined />} to={"/dashboard/product/creacting"}>
            <MyButton>Add Multiple</MyButton>
          </MVLink>
        </MVCol>
        <MVCol>
          <MVLink to={"/dashboard/product/add"}>
            <MyButton>Export PDF</MyButton>
          </MVLink>
        </MVCol>
        <MVCol>
          <MVLink to={"/dashboard/product/add"}>
            <MyButton danger shape="round">
              Export Excel
            </MyButton>
          </MVLink>
        </MVCol>
        <MVCol>
          <MySelect
            placeholder={"Select"}
            onChange={handleSelectChange}
            defaultValue={""}
            style={{ width: 300 }}
            options={
              category &&
              category?.data.map((item, index) => ({
                label: item.name,
                value: item._id,
              }))
            }
          />
        </MVCol>
        <MVCol>
          <MySelect
            placeholder={"Select"}
            onChange={handleChangeSelectApprove}
            defaultValue={"Select"}
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
              className="form-control p-2 rounded bg-[#fff]"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
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
            onChange: (value) => {
              setPage(value);
            },
            total: length,
          }}
        />
      </Spin>
    </>
  );
});

export default ProductAdmin;
