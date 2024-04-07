import React, { useEffect } from "react";
import { Image } from "antd";
import {
  deleteCommentSlice,
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
  useEffect(() => {
    dispatch(getAllCommentSlice());
  }, []);

  const confirm = async (id, productId) => {
    const dataId = {
      commentId: id,
      productId: productId,
    };
    const response = await dispatch(deleteCommentSlice(dataId));
    if (response.payload) {
      toast.success("Delete comment successfully");
    } else {
      toast.error("Error deleting comment");
    }
  };

  const data =
    comment &&
    comment
      .filter((item) => item.user !== null)
      .map((item: any, index: any) => {
        return {
          key: item._id,
          stt: index + 1,
          name: item.commentContent,
          user: item.user.username,
          image: (
            <Image
              width={60}
              height={80}
              style={{ objectFit: "cover" }}
              src={item.user.image}
            />
          ),
          product: (
            <MVLink
              to={"/d/" + item.product._id + `?c=${item.product.category}`}
            >
              {item.product.name + " " + item.product.seri}
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
                onConfirm={() => confirm(item._id, item.product._id)}
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
      <MVTable
        columns={columnsComment}
        dataSource={data}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15"],
        }}
      />
    </>
  );
};

export default CommentAdmin;
