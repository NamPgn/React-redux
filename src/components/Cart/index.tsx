import moment from "moment";
import styled from "styled-components";
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

const CartText = styled.p`
  color: #999;
`;
const Divstyled = styled.div``;

const Psyled = styled.p``;
const CartUser = () => {
  const { Auth, user, isLoading, setReset, setRerender } =
    useContext(MyContext) || {};
  if (isLoading) {
    return (
      <Spiner
        spinning={undefined}
        children={undefined}
        delay={undefined}
        size={"large"}
      />
    );
  }
  if (!Auth) {
    return <Navigate to={"/auth/signin"} />;
  }
  const handleRerender = () => {
    setRerender((rerender) => !rerender);
    MVSuccess("Success render");
  };

  return (
    <Divstyled className="p-3">
      <MVTitle
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
      <Divstyled>
        {user.cart && user.cart?.length ? (
          user.cart
            .filter((item: any) => item.product !== null)
            .map((item: any, index: any) => (
              <Divstyled key={index}>
                <Divstyled className="mb-3">
                  <Divstyled className="searhValue" key={index}>
                    <div className="lg:w-3/12 md:w-3/12 w-3/12 lg:h-52 md:h-48 h-32">
                      <Divstyled className="h-full">
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
                              src={item.product.image}
                              style={{ borderRadius: "5px" }}
                              alt=""
                            />
                          </MVLink>
                        )}
                      </Divstyled>
                    </div>
                    <div className="lg:w-9/12 lg:text-[14px] md:text-[13px] text-[12px]">
                      {item.product && (
                        <MVLink
                          to={
                            "/d/" +
                            item.product._id +
                            `?c=${item.product.category} `
                          }
                        >
                          <Divstyled className="text-white mt-3 lg:text-[15px] md:text-[14px] text-[13px]">
                            {item.product && (
                              <div>
                                {item.product.name + " " + item.product.seri}
                              </div>
                            )}
                            <div className="text-[#999]">
                              <Psyled className="mt-2">
                                Ngày thêm:{" "}
                                {moment(item.date).format("LTS DD-MM-YYYY")}
                              </Psyled>
                              <Psyled>Tập: {item.product.seri}</Psyled>
                              <Psyled className="mt-1">
                                Danh mục: [Đang cập nhật]
                              </Psyled>
                            </div>
                            {/* <p className='des des_cart'>Mô tả: {filterCate(category, item.product.category).des}</p> */}
                          </Divstyled>
                        </MVLink>
                      )}
                      {item.product && (
                        <StyledBtnClickDeleteCartById
                          className="w-2/12"
                          setReset={setReset}
                          id={item.product._id}
                          userId={Auth.user._id}
                        />
                      )}
                    </div>
                  </Divstyled>
                </Divstyled>
              </Divstyled>
            ))
        ) : (
          <NotFoundContent />
        )}
      </Divstyled>
    </Divstyled>
  );
};

export default CartUser;
