import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUser_id } from "../../../../redux/slice/userSlice";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAppDispatch } from "../../../../hook";
import { MyButton } from "../../../../components/MV/Button";
import MVInput from "../../../../components/MV/Input";
import { MVError } from "../../../../components/Message";
const ImageStyledEditAuth = styled.img`
  width: 200px;
  height: 200px;
  objectfit: cover;
`;
const EditUser = () => {
  const { handleSubmit, reset, control } = useForm();
  const [user, setUser]: any = useState({});
  const [role, setRole]: any = useState(0);
  const dispath = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const { payload } = await dispath(getUser_id(id));
      setUser(payload);
      reset(payload);
    })();
  }, []);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    const respone = await dispath(editUser(data));
    // navigate("/admin/users");
    if (respone.payload.success) {
      toast.success(
        `Sửa ${formData.append("username", data.username)} thành công`,
        {
          progress: undefined,
          theme: "light",
        }
      );
    } else {
      MVError("Lỗi!");
    }
  };
  const handleChange = (value: any) => {
    setRole(value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MVInput
          name={"username"}
          label={"User name"}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={"role"}
          label={"Role"}
          control={control}
          rules={undefined}
        />
        {/* <Space wrap>
          <Select
            defaultValue="user"
            style={{ width: 120 }}
            className='mb-3'
            onChange={handleChange}
            options={[
              { value: 0, label: 'User', },
              { value: 1, label: 'Admin' }
            ]}
          />
        </Space> */}
        <div className="w-2/12">
          <ImageStyledEditAuth
            src={user ? user.image : ""}
            className="img-radius rounded"
            alt="User-Profile-Image"
          />
        </div>
        <MyButton htmlType="submit" className="btn btn-primary mt-2">
          Submit
        </MyButton>
      </form>
    </div>
  );
};

export default EditUser;
