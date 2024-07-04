import React, { useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { pushListData } from "../../../sevices/product";
import {
  addBigCategory,
  delBigCategory,
  deleteTypeByProducts,
} from "../../../sevices/type";
import { columnsType } from "../../../constant";
import MVTable from "../../../components/MV/Table";
import { MyButton } from "../../../components/MV/Button";
import MVRow from "../../../components/MV/Grid";
import MVCol from "../../../components/MV/Grid/Col";
import { useForm } from "react-hook-form";
import MVInput from "../../../components/MV/Input";
import MVLink from "../../../components/Location/Link";
import { MVError, MVSuccess } from "../../../components/Message";
import { ApiContext } from "../../../context/api";
const DivstyledContent = styled.div`
  align-items: center;
`;
const TypesCateAdmin = () => {
  const [state, setState] = useState("");
  const { handleSubmit, control } = useForm();
  const handleDeleTypeProduct = async (id: any, typeId: any) => {
    const body = {
      typeId: typeId,
    };
    await deleteTypeByProducts(id, body);
  };
  const handleAddid = (id: string | any) => {
    setState(id);
  };
  const handlePushItem = async (id: string | any) => {
    const push = {
      TypeId: state,
    };
    await pushListData(id, push);
  };

  const onSubmit = async (data: any) => {
    const res: any = await addBigCategory(data);
    if (res.data.data.success == true) {
      MVSuccess("Add Successfully");
    } else {
      MVError("Add Failure");
    }
  };
  const handleDeleteBigCategory = async (id: any) => {
    const res: any = await delBigCategory(id);
    if (res.data.success == true) {
      MVSuccess("Delete Successfully");
    } else {
      MVError("Delete Failure");
    }
  };
  const { seri }: any = useContext(ApiContext) || {};
  const data = seri
    ? seri.map((item: any, index: any) => ({
        key: index,
        stt: index + 1,
        name: item.name,
        path: item.path,
        product: item.products.length
          ? item.products.map((product: any, index: any) => (
              <DivstyledContent className="d-flex" key={index}>
                <div className="mr-2">{product.name}</div>
                <MVLink to={`/dashboard/product/edit/${product._id}`}>
                  <MyButton>Edit</MyButton>
                </MVLink>
                <MyButton
                  onClick={() => handleDeleTypeProduct(product._id, item._id)}
                  className="ml-2"
                >
                  Del
                </MyButton>
                <MyButton
                  onClick={() => handlePushItem(product._id)}
                  className="ml-2"
                >
                  Push
                </MyButton>
              </DivstyledContent>
            ))
          : "Trống!",
        categorymain: item.categorymain
          ? item.categorymain.map((item, index) => (
              <MVLink
                key={index}
                to={"/dashboard/types/CatemainProduct/" + item.cates._id}
              >
                <div>{item.cates.name}</div>
              </MVLink>
            ))
          : "Trống!",
        createdAt: item.createdAt,
        action: (
          <span>
            <MVLink to={`/dashboard/type/${item._id}`}>
              <MyButton>Edit</MyButton>
            </MVLink>
            <MyButton
              danger
              className="ml-2"
              onClick={() => handleDeleteBigCategory(item._id)}
            >
              Del
            </MyButton>
          </span>
        ),
        checked: (
          <input
            className="form-check-input"
            type="radio"
            name="123"
            id="defaultCheck1"
            onChange={() => handleAddid(item._id)}
          />
        ),
      }))
    : "";
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MVRow gutter={4} align={"middle"} justify={"center"}>
          <MVCol span={22}>
            <MVInput
              name={"name"}
              label={"Thêm"}
              control={control}
              rules={undefined}
            />
          </MVCol>
          <MVCol span={2}>
            <MyButton htmlType="submit" className="mt-3" type="primary">
              Thêm
            </MyButton>
          </MVCol>
        </MVRow>
      </form>
      <MVTable columns={columnsType} dataSource={data} />
    </React.Fragment>
  );
};

export default TypesCateAdmin;
