import React, { useContext, useEffect, useState } from "react";
import { Image, Radio } from "antd";
import {
  addCateGorySlice,
  deleteCategorySlice,
  getAllcate,
} from "../../../redux/slice/category/thunkCategory/category";
import { category$ } from "../../../redux/selectors";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { MyContext } from "../../../context";
import { pushCateTotype } from "../../../sevices/type";
import { useForm } from "react-hook-form";
import { MySelectWrapper } from "../../../components/Form/component";
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
      toast.error("Delete Fail");
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
    weeks?.map((item, index) => ({
      label: item.name,
      value: item._id,
    }));
  const data =
    category.data &&
    category.data.map((item, index) => {
      return {
        key: item._id,
        stt: index + 1,
        name: item.name,
        image: (
          <Image
            width={150}
            height={200}
            style={{ objectFit: "cover" }}
            src={item.linkImg}
          />
        ),
        createAt: item.createdAt,
        action: (
          <div className="flex gap-1">
            <MVLink to={`/dashboard/category/edit/${item._id}`}>
              <MyButton style={{ background: "#1677ff" }} type="primary">
                Edit
              </MyButton>
            </MVLink>
            <MyButton
              danger
              className="text-light ml-2"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </MyButton>
            <MyButton
              className="text-light ml-2"
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
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "20", "30"],
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
              style={{ width: 200 }}
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
