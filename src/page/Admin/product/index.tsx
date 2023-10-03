import React, { useContext, useEffect, useState } from "react";
import { Spin, Tag } from "antd";
import {
  getProducts,
  deleteProduct,
} from "../../../redux/slice/product/thunkProduct/product";
import { toast } from "react-toastify";
import { deleteMultipleProduct } from "../../../sevices/product";
import styled from "styled-components";
import { useAppDispatch } from "../../../hook";
import { MyContext } from "../../../context";
import { MyButton } from "../../../components/MV/Button";
import MySelect from "../../../components/MV/Select";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { columnsProduct } from "../../../constant";
import MVTable from "../../../components/MV/Table";
import MVConfirm from "../../../components/MV/Confirm";
import MVRow from "../../../components/MV/Grid";
import MVCol from "../../../components/MV/Grid/Col";
import MVLink from "../../../components/Location/Link";
const Divstyled = styled.div``;
const InputStyled = styled.input``;

const ProductAdmin = ({ product, length, isLoading }) => {
  const { category, seri }: any = useContext(MyContext);
  const [search, searchState] = useState("");
  const [filter, setFilter] = useState("");
  // const [checkedId, setCheckedId]: any = useState([]);
  // const [checkAllid, setCheckAllid] = useState(false);
  const [init, setInit] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const [page, setPage] = useState(3);
  const dispath = useAppDispatch();

  useEffect(() => {
    dispath(getProducts(page));
    document.title = "Admin Page";
  }, [init, page]);
  let dataS = product;
  if (search.length) {
    dataS = product.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (filter) {
    dataS = product.filter((item: any) => filter == item.category);
    filter == "Select" ? product.map((item: any) => dataS.push(item)) : "";
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
    if (response.success) {
      setInit(true);
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

  const handleChangeSelect = (value: any) => {
    setFilter(value); //lọc
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
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
        Seri: value.seri,
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
        action: (
          <>
            <MVLink to={`/dashboard/product/edit/${value._id}`}>
              <MyButton danger shape="circle">
                <EditOutlined />
              </MyButton>
            </MVLink>
            <MVConfirm
              title="Delete the product"
              onConfirm={() => confirm(value._id)}
              okText="Yes"
              cancelText="No"
            >
              <MyButton shape="circle" className="ml-2">
                <DeleteOutlined />
              </MyButton>
            </MVConfirm>
          </>
        ),
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
            <MyButton>Xóa</MyButton>
          </MVConfirm>
        </MVCol>
        <MVCol>
          <MVLink to={"/dashboard/product/add"}>
            <MyButton>Add Product</MyButton>
          </MVLink>
        </MVCol>
        <MVCol>
          <MVLink to={"/dashboard/product/creacting"}>
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
            onChange={handleChangeSelect}
            defaultValue={"Select"}
            style={{ width: 300 }}
            options={
              category &&
              category?.data.map((item, index) => ({
                label: item.name,
                value: item._id,
              }))
            }
            children={undefined}
          />
        </MVCol>
        <MVCol>
          <Divstyled className="form-outline">
            <InputStyled
              type="search"
              placeholder="search..."
              className="form-control p-2 rounded"
              onChange={(e) => {
                searchState(e.target.value);
              }}
            />
          </Divstyled>
        </MVCol>
      </MVRow>
      <Spin spinning={isLoading} delay={undefined}>
        <MVTable
          rowSelection={rowSelection}
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
};

export default ProductAdmin;
