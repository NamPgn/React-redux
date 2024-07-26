import React, { useContext, useEffect, useState } from "react";
import { Image, Modal } from "antd";
import {
  addCateGorySlice,
  deleteCategorySlice,
  getAllcate,
} from "../../../redux/slice/category/thunk/category";
import { category$ } from "../../../redux/selectors";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { pushCateTotype } from "../../../sevices/type";
import { useForm } from "react-hook-form";
import { MySelectWrapper } from "../../../components/Form/component/select";
import { MyButton } from "../../../components/MV/Button";
import { columnsCategory } from "../../../constant";
import MVTable from "../../../components/MV/Table";
import MVUpload from "../../../components/MV/Upload";
import MVInput from "../../../components/MV/Input";
import MVLink from "../../../components/Location/Link";
import { TreeSelect } from "antd";
import { MVError, MVSuccess } from "../../../components/Message";
import MVTags from "../../../components/MV/Tag";
import { ApiContext } from "../../../context/api";

const CategoryAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dispatch = useAppDispatch();
  const category = useAppSelector(category$);
  const { seri, weeks } = useContext(ApiContext);
  const { handleSubmit, control } = useForm();
  const [valueId, setValue] = useState();
  useEffect(() => {
    dispatch(getAllcate(1));
  }, [1]);
  const valueOptions =
    seri &&
    seri?.map((items: any, index: number) => ({
      label: index + 1 + " - " + items.name,
      value: items._id,
      children: items.categorymain.map((val: any, i: number) => ({
        label: i + 1 + " - " + val.cates.name,
        value: val.cates._id,
      })),
    }));
  const onChange = (newValue: any) => {
    setValue(newValue);
  };
  const onsubmit = async (data: any) => {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("des", data.des);
    formdata.append("sumSeri", data.sumSeri);
    formdata.append("week", data.week);
    formdata.append("type", data.type);
    formdata.append("file", data.file);
    formdata.append("up", data.up);
    formdata.append("time", data.time);
    formdata.append("isActive", data.isActive);
    formdata.append("year", data.year);
    formdata.append("anotherName", data.anotherName);
    formdata.append("hour", data.hour);
    const res = await dispatch(addCateGorySlice(formdata));
    if (res.payload.success == true) {
      toast.success("Thành công");
    } else {
      toast.error("Thất bại");
    }
  };

  const handleDelete = async (id: string | number) => {
    const res = await dispatch(deleteCategorySlice(id));
    if (res.payload) {
      toast.success("Delete Success");
    } else {
      toast.error("Delete Failure");
    }
  };

  const hanedlePushCategoryToType = async (categoryId) => {
    const body = {
      categoryId: categoryId,
    };
    const res = await pushCateTotype(valueId, body);
    if (res.data.success) {
      MVSuccess("Add category success!");
    } else {
      MVError("Failure!");
    }
  };

  const weeekOptions =
    weeks &&
    weeks?.map((item: any, index: number) => ({
      label: item.name,
      value: item._id,
    }));
  const data =
    category.data &&
    category.data.map((item: any, index: number) => {
      return {
        key: item._id,
        stt: index + 1,
        name: <MVLink to={"/q/" + item._id}>{item.name}</MVLink>,
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
        isActive:
          item.isActive == 0 ? (
            <MVTags color="warning">isPending</MVTags>
          ) : (
            <MVTags color="success">Done</MVTags>
          ),
        year: item.year,
        set: item.up,
        week: weeks && weeks.map((i: any) => i._id == item.week && i.name),
        action: (
          <div className="flex gap-1">
            <MVLink to={`/dashboard/category/edit/${item._id}`}>
              <MyButton style={{ background: "#1677ff" }} type="primary">
                Edit
              </MyButton>
            </MVLink>
            <MyButton
              danger
              className="ml-2"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </MyButton>
            <MyButton
              className="ml-2"
              onClick={() => hanedlePushCategoryToType(item._id)}
            >
              Push
            </MyButton>
          </div>
        ),
      };
    });
  return (
    <React.Fragment>
      <div className="flex gap-1">
        <MyButton type="primary" onClick={showModal}>
          New
        </MyButton>
        <TreeSelect
          style={{ width: "100%" }}
          value={valueId}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          treeData={valueOptions}
          placeholder="Please select"
          treeDefaultExpandAll
          onChange={onChange}
          className="mb-2"
        />
      </div>
      {/* <div
        className="p-2"
        style={{ display: "flex", gap: "0 10px", justifyContent: "center" }}
      >
        {seri &&
          seri.map((item: any, index: any) => (
            <div key={index}>
              {item.path == "/" ? (
                ""
              ) : (
                <Radio.Group value={typeId}>
                  <Radio onChange={() => handleGetid(item._id)}>
                    {item.name}
                  </Radio>
                </Radio.Group>
              )}
            </div>
          ))}
      </div> */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit(onsubmit)}>
          <MVInput
            name={"name"}
            label={"Name"}
            control={control}
            rules={undefined}
          />
          <MVInput
            name={"anotherName"}
            label={"Another Name"}
            control={control}
            rules={undefined}
          />
          <MVInput
            name={"des"}
            label={"Description"}
            control={control}
            rules={undefined}
          />
          <MVInput
            name={"sumSeri"}
            label={"Sum seri"}
            control={control}
            rules={undefined}
          />
          <MVInput
            name={"type"}
            label={"Type"}
            control={control}
            rules={undefined}
          />
          <MVInput
            name={"week"}
            label={"Week"}
            control={control}
            rules={undefined}
          />
          <MVInput
            name={"time"}
            label={"Duration"}
            control={control}
            rules={undefined}
          />
          <MVInput
            name={"isActive"}
            label={"isActive"}
            control={control}
            rules={undefined}
          />
          <MVInput
            name={"year"}
            label={"Year"}
            control={control}
            rules={undefined}
          />
          <MVInput
            name={"up"}
            label={"Set"}
            control={control}
            rules={undefined}
          />
          <MVInput
            name={"hour"}
            label={"Hour"}
            control={control}
            rules={undefined}
          />
          <MySelectWrapper
            name={"week"}
            label={"Theo tuần"}
            control={control}
            placeholder={"Week"}
            defaultValue={"Week"}
            options={weeekOptions}
          />
          <MVUpload name={"file"} label={"Upload"} control={control} />
          <MyButton htmlType="submit" className="mt-2">
            Create
          </MyButton>
        </form>
      </Modal>
      <MVTable
        columns={columnsCategory}
        dataSource={data}
        scroll={{ x: 1000, y: 1000 }}
        pagination={{
          defaultPageSize: 20,
          showSizeChanger: true,
          pageSizeOptions: ["20", "40", "60"],
        }}
      ></MVTable>
    </React.Fragment>
  );
};

export default CategoryAdmin;
