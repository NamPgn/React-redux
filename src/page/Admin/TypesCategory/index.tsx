import React, { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../../context";
import styled from "styled-components";
import { pushListData } from "../../../sevices/product";
import { deleteTypeByProducts } from "../../../sevices/type";
import { columnsType } from "../../../constant";
import MVTable from "../../../components/MV/Table";
import { MyButton } from "../../../components/MV/Button";
import MVRow from "../../../components/MV/Grid";
import MVCol from "../../../components/MV/Grid/Col";
import { useForm } from "react-hook-form";
import MVInput from "../../../components/MV/Input";
import MVLink from "../../../components/Location/Link";
const Divstyled = styled.div``;
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

  const { seri }: any = useContext(MyContext) || {};
  const data = seri
    ? seri.map((item: any, index: any) => ({
        key: index,
        stt: index + 1,
        name: item.name,
        path: item.path,
        product: item.products.length
          ? item.products.map((product: any, index: any) => (
              <DivstyledContent className="d-flex" key={index}>
                <Divstyled className="mr-2">{product.name}</Divstyled>
                <MVLink to={`/dashboard/product/edit/${product._id}`}>
                  <MyButton>Edit</MyButton>
                </MVLink>
                <MyButton
                  onClick={() => handleDeleTypeProduct(product._id, item._id)}
                  className="ml-2"
                >
                  Cút
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
              <MyButton danger className="ml-2">
                Cút
              </MyButton>
            </MVLink>
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
      <MVTable columns={columnsType} dataSource={data} />
    </React.Fragment>
  );
};

export default TypesCateAdmin;
