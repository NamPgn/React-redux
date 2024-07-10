import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SeriNumberMovie from "../Seri/SeriCategory";
import MVTitle from "../MV/Title";
import MVLink from "../Location/Link";
import MVImage from "../MV/Image";
import MVText from "../MV/Text";
import Dividers from "../MV/Divider";
import MVTags from "../MV/Tag";
import Rating from "./component/rating";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hook";
import { getCateSlice } from "../../redux/slice/category/thunk/category";
import React from "react";
const CategoryPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const c: any = useAppSelector((state) => state.category.details);
  const isLoading = useAppSelector((state) => state.category.isLoading);
  useEffect(() => {
    dispatch(getCateSlice(id));
  }, [id]);
  useEffect(() => {
    if (c?.name) {
      document.title = c.name;
    }
  }, [c]);
  return (
    <div>
      {c && (
        <div key={c._id}>
          <div style={{ color: "#fff" }}>
            <div className="md:flex lg:flex block gap-2 ">
              <div className="mb-5 lg:w-3/12 md:w-3/12 md:h-full h-52 ">
                <div className="h-full w-full flex justify-center ">
                  <MVImage
                    className="object-contain w-full h-full flex-grow"
                    src={c.linkImg}
                    alt={c.name}
                  />
                </div>
              </div>
              <div className="lg:w-9/12 md:w-9/12">
                <div className="category text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  dark:text-gray-200">
                  <MVLink to={`/q/` + c._id}>
                    <MVTitle
                      type={"secondary"}
                      level={3}
                      className="md:text-[18px] lg:text-[20px] sm:text-[15px]"
                      style={{ textTransform: "capitalize", color: "#fff" }}
                    >
                      {c.name}
                    </MVTitle>
                  </MVLink>
                </div>
                <div className="loai des text-[12px] md:text-[13px] lg:text-[14px]">
                  <b>{c.anotherName}</b>
                  <br />
                  <MVText
                    style={{
                      color: "#999",
                    }}
                  >
                    Tác giả :...
                  </MVText>
                  <br />
                  <MVText
                    style={{
                      color: "#999",
                    }}
                  >
                    Quốc gia : Chinese
                  </MVText>
                  <div>
                    <MVText
                      style={{
                        color: "#999",
                      }}
                    >
                      Thể loại :{" "}
                      <span className="p-1 bg-gray-500 rounded-sm">
                        {c.type}
                      </span>
                    </MVText>
                  </div>
                  <div>
                    <MVText
                      style={{
                        color: "#999",
                      }}
                    >
                      Tổng Số tập: {c._id == id ? c.sumSeri : ""}
                    </MVText>
                  </div>
                  <div>
                    <MVText
                      style={{
                        color: "#999",
                      }}
                    >
                      {c.time + " "}
                    </MVText>
                  </div>
                  <div>
                    <MVText
                      style={{
                        color: "#999",
                      }}
                    >
                      Năm phát hành : {c.year}
                    </MVText>
                  </div>
                  <div></div>
                  <MVTags color="#2db7f5" className="my-2">
                    {c.isActive == 0 ? "Đang chiếu" : "Hoàn thành"}
                  </MVTags>
                  <div
                    id="toast-simple"
                    className="flex mb-2 items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
                    role="alert"
                  >
                    <ClockCircleOutlined />
                    <div className="ps-4 text-sm font-normal">
                      Vietsub lúc 10h00 Thứ 4 hàng tuần
                    </div>
                  </div>
                </div>
                <SeriNumberMovie isLoading={isLoading} data={c} />
                <Rating
                  id={id}
                  averageRating={c.averageRating}
                  totalRatings={c.totalRatings}
                />
              </div>
            </div>
            <div className="text-[#999] lg:text-[15px] md:text[14px] text-[13px]">
              <Dividers textColor={"#fff"} orientation="left">
                NỘI DUNG PHIM
              </Dividers>
              {c.des}
            </div>

            {/* <Dividers
              textColor={"#fff"}
              orientation="left"
              className="h6 text-white mt-4 text:sm lg:text-lg md:text-md"
            >
              Bình luận:
            </Dividers>
            <CommentProductsIndex getOne={c} />
            <ComentProductsLayout /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
