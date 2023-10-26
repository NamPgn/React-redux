import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getAllProductDataByCategorySlice,
  getProduct,
} from "../../redux/slice/product/thunk/product";
import {
  getAllProductsByCategory$,
  getOneProduct$,
} from "../../redux/selectors";
import queryString from "query-string";
import CommentProductsIndex from "../Comment";
import ComentProductsLayout from "../Comment/Layout";
import SeriDetailProducts from "../Seri/SeriDetail";
import CartAddContent from "../Cart/component/add";
import { useAppDispatch, useAppSelector } from "../../hook";
import Content from "./component";
import {
  DivContainer,
  DivStyledContent,
  DivStyledContentText,
  DivStyledItem,
  Movie,
  Server,
} from "./styles";
import Dividers from "../MV/Divider";
import { MyButton } from "../MV/Button";
import { Spiner } from "../Message/Notification";
import { ProductsPending$ } from "../../redux/selectors/product";
import { Accordion, AccordionItem, Image} from "@nextui-org/react";
const DetailComponent = () => {
  const productByCategory = useAppSelector(getAllProductsByCategory$);
  const getOneProductDetail = useAppSelector(getOneProduct$);
  const isLoadingDetail = useAppSelector(ProductsPending$);
  const [commentAdded, setCommentAdded] = useState(false); // tạo state
  const [link, setLink] = useState(
    getOneProductDetail
      ? getOneProductDetail.dailyMotionServer
      : getOneProductDetail.server2
  );
  const { id } = useParams();
  const { c } = queryString.parse(window.location.href.split("?")[1]); //lấy data url
  const [activeLink, setActiveLink] = useState("dailyMotion");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getAllProductDataByCategorySlice(c));
    setLink(getOneProductDetail.dailyMotionServer);
    window.scrollTo({
      top: 0,
    });
  }, [id, c, commentAdded, getOneProductDetail.dailyMotionServer]); //nếu mà 2 thằng này có thay đổi thì rereder
  return (
    <div className="flex justify-center mt-4" style={{ gap: "10px" }}>
      <DivContainer className="col-md-12">
        {getOneProductDetail &&
          (!isLoadingDetail ? (
            <React.Fragment>
              <Movie className="d-flex justify-content-center relative">
                {getOneProductDetail.dailyMotionServer ? (
                  <iframe
                    title="vimeo-player"
                    className="absolute"
                    src={link}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <iframe
                    title="vimeo-player"
                    className="absolute"
                    style={{ width: "100%", height: "100%" }}
                    src={getOneProductDetail.trailer + "?autoplay=1&mute=1"}
                  />
                )}
              </Movie>
              <Server className="mt-4 rounded">
                <Dividers
                  textColor={"#fff"}
                  orientation={"center"}
                  className="text-white md:text-sm lg:text-base text-sm underline"
                >
                  Chọn server:
                </Dividers>
                <div className="md:text-sm lg:text-base text-sm flex items-center justify-center gap-4 px-4 py-3">
                  <MyButton
                    onClick={() => {
                      setActiveLink("link1");
                      setLink(getOneProductDetail.link);
                    }}
                    className={`text-white cursor-pointer ${
                      activeLink === "link1" ? "activeServer" : ""
                    }`}
                  >
                    #S1
                  </MyButton>

                  <MyButton
                    onClick={() => {
                      setActiveLink("server2");
                      setLink(getOneProductDetail.server2);
                    }}
                    disabled={getOneProductDetail.server2 ? false : true}
                    className={`${
                      getOneProductDetail.server2
                        ? " text-white cursor-pointer"
                        : ""
                    } ${activeLink === "server2" ? "activeServer" : ""}`}
                  >
                    #S2
                  </MyButton>

                  <MyButton
                    onClick={() => {
                      setActiveLink("dailyMotion");
                      setLink(getOneProductDetail.dailyMotionServer);
                    }}
                    disabled={
                      getOneProductDetail.dailyMotionServer ? false : true
                    }
                    className={`${
                      getOneProductDetail.dailyMotionServer
                        ? "text-white cursor-pointer"
                        : ""
                    } ${activeLink === "dailyMotion" ? "activeServer" : ""}`}
                  >
                    #FullHđ
                  </MyButton>
                </div>
              </Server>
              {/* chi tiết */}
              <DivStyledContent className="mt-2">
                <DivStyledItem className="w-3/12">
                  <Image
                    className="w-full h-full md:block hidden"
                    isBlurred
                    alt={"Ảnh" + getOneProductDetail.category?.name}
                    src={
                      getOneProductDetail &&
                      (getOneProductDetail.category?.linkImg ||
                        getOneProductDetail.image)
                    }
                  />
                </DivStyledItem>
                <DivStyledContentText className="lg:w-9/12 md:w-full text-center lg:text-start">
                  {/* content */}
                  <CartAddContent
                    item={getOneProductDetail}
                    id={id}
                    categoryId={c}
                  />
                  <Content getOneProductDetail={getOneProductDetail} />
                  <SeriDetailProducts seriProduct={productByCategory} />
                  <div className="text-[#999] lg:text-md sm:text-sm mt-2 mb-2">
                    <Accordion defaultExpandedKeys={["1"]} className="px-0">
                      <AccordionItem
                        key="1"
                        aria-label="Description"
                        title={
                          <Dividers textColor={"#fff"} orientation="left">
                            Mô tả:
                          </Dividers>
                        }
                      >
                        {getOneProductDetail.descriptions}
                      </AccordionItem>
                    </Accordion>
                  </div>
                </DivStyledContentText>
              </DivStyledContent>
              {/* comment */}
              <Dividers
                textColor={"#fff"}
                orientation="left"
                className="h6 text-white mt-4 text:sm lg:text-lg md:text-md"
              >
                Bình luận:
              </Dividers>
              <CommentProductsIndex getOne={getOneProductDetail} />
              <ComentProductsLayout setCommentAdded={setCommentAdded} />
            </React.Fragment>
          ) : (
            <Spiner
              size={"large"}
              children={undefined}
            />
          ))}
      </DivContainer>
    </div>
  );
};

export default DetailComponent;
