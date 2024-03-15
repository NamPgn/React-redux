import React, { useContext, useEffect, useState } from "react";
import { Image, Radio, Tag } from "antd";
import {
  addCateGorySlice,
  deleteCategorySlice,
  getAllcate,
} from "../../../redux/slice/category/thunk/category";
import { category$ } from "../../../redux/selectors";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { MyContext } from "../../../context";
import { pushCateTotype } from "../../../sevices/type";
import { useForm } from "react-hook-form";
import { MySelectWrapper } from "../../../components/Form/component/select";
import { MyButton } from "../../../components/MV/Button";
import { columnsCategory } from "../../../constant";
import MVTable from "../../../components/MV/Table";
import MVRow from "../../../components/MV/Grid";
import MVCol from "../../../components/MV/Grid/Col";
import MVUpload from "../../../components/MV/Upload";
import MVInput from "../../../components/MV/Input";
import MVLink from "../../../components/Location/Link";

const CategoryAdmin = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(category$);
  const { seri, weeks } = useContext(MyContext);
  const [typeId, setId] = useState(null);
  const { handleSubmit, control, register } = useForm();
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
    const res = await dispatch(addCateGorySlice(formdata));
    if (res.payload.success) {
      toast.success("Thành công");
    } else {
      toast.error("Thất bại");
    }
  };

  const handleDelete = (id: string | number) => {
    if (id) {
      toast.success("Delete Success");
      dispatch(deleteCategorySlice(id));
    } else {
      toast.error("Delete Failure");
    }
  };

  useEffect(() => {
    dispatch(getAllcate());
  }, []);
  const handleGetid = (id) => {
    setId(id);
  };

  const hanedlePushCategoryToType = async (categoryId) => {
    const body = {
      categoryId: categoryId,
    };
    await pushCateTotype(typeId, body);
  };

  const weeekOptions =
    weeks &&
    weeks?.map((item) => ({
      label: item.name,
      value: item._id,
    }));
  const data =
    category.data &&
    category.data.map((item, index) => {
      return {
        key: item._id,
        // stt: index + 1,
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
            <Tag color="warning">isPending</Tag>
          ) : (
            <Tag color="success">Done</Tag>
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
        children: [
          {
            name: "Jim Green jr.",
            age: 25,
            address: "London No. 3 Lake Park",
          },
          {
            name: "Jimmy Green sr.",
            age: 18,
            address: "London No. 4 Lake Park",
          },
        ],
      };
    });
  return (
    <React.Fragment>
      <div
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
      </div>
      <MVRow gutter={10}>
        <MVCol span={18}>
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
        </MVCol>
        <MVCol span={6}>
          <form onSubmit={handleSubmit(onsubmit)}>
            <MVInput
              name={"name"}
              label={"Name"}
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
            <MySelectWrapper
              name={"week"}
              label={"Theo tuần"}
              control={control}
              placeholder={"Week"}
              defaultValue={undefined}
              options={weeekOptions}
            />
            <MVUpload name={"file"} label={"Upload"} control={control} />
            <MyButton htmlType="submit" className="mt-2">
              Create
            </MyButton>
          </form>
        </MVCol>
      </MVRow>
    </React.Fragment>
  );
};

export default CategoryAdmin;
