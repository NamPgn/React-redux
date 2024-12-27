import React, { useEffect, useState } from "react";
import { Image } from "antd";
import {
  deleteCommentSlice,
  deleteMultipleCommentsActions,
  getAllCommentSlice,
} from "../../../redux/slice/comment/thunk/comment";
import { comment$ } from "../../../redux/selectors/comment";
import { useAppDispatch, useAppSelector } from "../../../hook";
import MVTable from "../../../components/MV/Table";
import { columnsComment } from "../../../constant";
import { MyButton } from "../../../components/MV/Button";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MVConfirm from "../../../components/MV/Confirm";
import { toast } from "react-toastify";
import MVLink from "../../../components/Location/Link";

const CommentAdmin = () => {
  const comment = useAppSelector(comment$);
  const dispatch = useAppDispatch();
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  useEffect(() => {
    dispatch(getAllCommentSlice());
  }, []);
  const handleDeleteSelectedData = async () => {
    const response: any = await dispatch(
      deleteMultipleCommentsActions(selectedRowKeys)
    );
    console.log(response);
    if (response.payload) {
      toast.success("Delete products successfully");
    } else {
      toast.error("Error deleting products");
    }
  };
  const confirm = async (id, productId) => {
    const dataId = {
      commentId: id,
      productId: productId,
    };
    const response = await dispatch(deleteCommentSlice(dataId));
    if (response.meta.requestStatus == "fulfilled") {
      toast.success("Delete comment successfully");
    } else {
      toast.error("Error deleting comment");
    }
  };

  const data =
    comment &&
    comment?.map((item: any, index: any) => {
      return {
        key: item._id,
        stt: index + 1,
        name: item.commentContent,
        user: item?.user?.username,
        image: (
          <Image
            width={60}
            height={80}
            style={{ objectFit: "cover" }}
            src={item?.user?.image}
          />
        ),
        category: (
          <MVLink to={"/d/" + item?.category?.slug}>
            {item?.category?.slug}
          </MVLink>
        ),
        permission: item.role == 0 ? "User" : "Admin",
        day: item.createdAt.toString("DD-MM-YYYY"),
        action: (
          <>
            <MVLink to={`/dashboard/comment/${item._id}`}>
              <MyButton danger shape="circle">
                <EditOutlined />
              </MyButton>
            </MVLink>
            <MVConfirm
              title="Delete the product"
              onConfirm={() => confirm(item._id, item?.product?._id)}
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
      <MVConfirm
        title="Delete The Movies"
        onConfirm={handleDeleteSelectedData}
        okText="Yes"
        cancelText="No"
        className="mb-5"
      >
        <MyButton
          icon={<DeleteOutlined />}
          className="flex items-center bg-gradient-to-br from-pink-500 to-orange-400 text-white"
        >
          Delete Multiple Movies
        </MyButton>
      </MVConfirm>
      <MVTable
        rowSelection={rowSelection}
        columns={columnsComment}
        dataSource={data}
        pagination={{
          defaultPageSize: 40,
          showSizeChanger: true,
          pageSizeOptions: ["40", "60", "80"],
        }}
      />
    </>
  );
};

export default CommentAdmin;
