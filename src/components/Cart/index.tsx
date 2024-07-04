import moment from "moment";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StyledBtnClickDeleteCartById } from "./component/delete";
import { NotFoundContent, Spiner } from "../Message/Notification";
import { MyContext } from "../../context";
import { ReloadOutlined } from "@ant-design/icons";
import { MyButton } from "../MV/Button";
import MVLink from "../Location/Link";
import { MVSuccess } from "../Message";
import MVImage from "../MV/Image";
import MVTitle from "../MV/Title";
const CartUser = () => {
  const { Auth, user, isLoading, setRerender } =
    useContext(MyContext) || {};
  if (isLoading) {
    return <Spiner children={undefined} size={"large"} />;
  }
  if (!Auth) {
    return <Navigate to={"/signin"} />;
  }
  const handleRerender = () => {
    setRerender((rerender) => !rerender);
    MVSuccess("Success render");
  };

  return (
    <div className="p-3">
      <MVTitle
        className="text-2xl md:text-3xl pl-2 my-2 border-l-4 font-sans font-bold border-teal-400 dark:text-gray-200"
        style={{
          color: "#fff",
        }}
        strong
        level={1}
      >
        List Movie Favorite
      </MVTitle>
      <MyButton
        onClick={handleRerender}
        className="flex items-center justify-center text-white mb-5"
        title="rerender"
        icon={<ReloadOutlined />}
      >
        Làm mới
      </MyButton>
      <div>
        {user.cart && user.cart?.length ? (
          user.cart
            .filter((item: any) => item.product !== null)
            .map((item: any, index: any) => (
              <div key={index}>
                <div className="mb-3">
                  <div className="searhValue" key={index}>
                    <div className="lg:w-3/12 md:w-3/12 w-3/12 lg:h-52 md:h-48 h-32">
                      <div className="h-full">
                        {item.product && (
                          <MVLink
                            to={
                              "/d/" +
                              item.product._id +
                              `?c=${item.product.category} `
                            }
                          >
                            <MVImage
                              className="h-full"
                              src={item.product?.category?.linkImg}
                              style={{ borderRadius: "5px" }}
                              alt=""
                            />
                          </MVLink>
                        )}
                      </div>
                    </div>
                    <div className="lg:w-9/12 lg:text-[14px] md:text-[13px] text-[12px]">
                      {item.product && (
                        <>
                          <MVLink
                            to={
                              "/d/" +
                              item.product._id +
                              `?c=${item.product.category} `
                            }
                          >
                            <div className="text-white mt-3 lg:text-[15px] md:text-[14px] text-[13px]">
                              {item.product && (
                                <div>
                                  {item.product.name + " " + item.product.seri}
                                </div>
                              )}
                              {/* <p className='des des_cart'>Mô tả: {filterCate(category, item.product.category).des}</p> */}
                            </div>
                          </MVLink>
                          <div className="text-[#999]">
                            <div className="my-2">
                              Ngày thêm:{" "}
                              {moment(item.date).format("LTS DD-MM-YYYY")}
                            </div>
                            <div className="py-2">Tập: {item.product.seri}</div>
                          </div>
                        </>
                      )}
                      {item.product && (
                        <StyledBtnClickDeleteCartById
                          className="w-2/12"
                          setReset={setRerender}
                          id={item.product._id}
                          userId={Auth.user._id}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <NotFoundContent />
        )}
      </div>
    </div>
  );
};

export default CartUser;
