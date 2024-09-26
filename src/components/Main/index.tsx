import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  getProduct,
} from "../../redux/slice/product/thunk/product";
import {
  getOneProduct$,
} from "../../redux/selectors";
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
import CryptoJS from "crypto-js";
import { Result } from "antd";
import MVImage from "../MV/Image";
import { handleImage } from "../../lib/handleImage";
import PageMeta from "../../lib/pageMeta";
const DetailComponent = () => {
  const getOneProductDetail = useAppSelector(getOneProduct$);
  const isLoadingDetail = useAppSelector(ProductsPending$);
  const [link, setLink] = useState("");
  const { id } = useParams();
  // const { c } = queryString.parse(window.location.href.split("?")[1]); //lấy data url
  const [activeLink, setActiveLink] = useState("dailyMotion");
  const dispatch = useAppDispatch();
  const [decodedLink, setDecodedLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    dispatch(getProduct(id));
    // dispatch(getAllProductDataByCategorySlice(c));
    const decryptedText = CryptoJS.AES.decrypt(
      getOneProductDetail.dailyMotionServer
        ? getOneProductDetail.dailyMotionServer
        : "",
      import.meta.env.VITE_SECERT_CRYPTO_KEY_PRODUCTS_DAILYMOTION_SERVER
    ).toString(CryptoJS.enc.Utf8);
    setDecodedLink(decryptedText);
    setLink(decryptedText);

  }, [id, getOneProductDetail.dailyMotionServer]); //nếu mà 2 thằng này có thay đổi thì rereder
  console.log(getOneProductDetail.server2 )
  return (
    <>
      <PageMeta
        ogTitle={getOneProductDetail?.name}
        description={getOneProductDetail.category?.des}
        imageUrl={getOneProductDetail.category?.linkImg}
      />
      <div className="flex justify-center mt-4" style={{ gap: "10px" }}>
        <DivContainer className="col-md-12">
          {getOneProductDetail &&
            (!isLoadingDetail ? (
              <>
                <Movie className="d-flex justify-content-center relative">
                  {getOneProductDetail.dailyMotionServer !== "" ? (
                    <iframe
                      allowFullScreen
                      title="vimeo-player"
                      className="absolute"
                      src={link}
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : getOneProductDetail.trailer !== "" ? (
                    <iframe
                      title="vimeo-player"
                      className="absolute"
                      style={{ width: "100%", height: "100%" }}
                      src={getOneProductDetail.trailer + "?autoplay=1&mute=1"}
                    />
                  ) : (
                    <Result
                      icon={"Hiiiii!!"}
                      className="absolute inset-0 text-white mt-5"
                      subTitle="Phim này đang trong quá trình cập nhật video. Vui lòng quay lại sau."
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
                      disabled={getOneProductDetail.link !== "" ? false : true}
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
                        setLink(decodedLink);
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
                      #S3
                    </MyButton>
                  </div>
                </Server>
                {/* chi tiết */}
                <DivStyledContent className="mt-2">
                  <DivStyledItem className="w-3/12">
                    <MVImage
                      className="md:block hidden"
                      alt={"Ảnh" + getOneProductDetail.category?.name}
                      src={handleImage(
                        200,
                        getOneProductDetail &&
                          (getOneProductDetail.category?.linkImg ||
                            getOneProductDetail.image)
                      )}
                    />
                  </DivStyledItem>
                  <DivStyledContentText className="lg:w-9/12 md:w-full text-center lg:text-start">
                    {/* content */}
                    <CartAddContent item={getOneProductDetail} id={id} />
                    <Content getOneProductDetail={getOneProductDetail} />
                    <SeriDetailProducts seriProduct={getOneProductDetail} />
                    <div className="text-[#999] lg:text-md sm:text-sm mt-2 mb-2">
                      <Dividers textColor={"#fff"} orientation="left">
                        Mô tả:
                      </Dividers>
                      {getOneProductDetail && getOneProductDetail.category?.des}
                    </div>
                  </DivStyledContentText>
                </DivStyledContent>
              </>
            ) : (
              <Spiner size={"large"} children={undefined} />
            ))}
        </DivContainer>
      </div>
    </>
  );
};

export default DetailComponent;
