import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../Message/Notification";
import { MyContext } from "../../context";
import SeriNumberMovie from "../Seri/SeriCategory";
import MVTitle from "../MV/Title";
import MVLink from "../Location/Link";
import MVImage from "../MV/Image";
import MVText from "../MV/Text";
import Dividers from "../MV/Divider";
import { Tag } from "antd";

const CategoryPage = () => {
  const { id } = useParams();
  const { category, isLoading }: any = useContext(MyContext);
  if (isLoading) {
    return <Loading />;
  }
  const c = category && category.data.find((c) => c._id === id);
  useEffect(() => {
    document.title = c?.name;
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
                    Đạo diễn : ?
                  </MVText>
                  <br />
                  <MVText
                    style={{
                      color: "#999",
                    }}
                  >
                    Diễn viên : ?
                  </MVText>
                  <br />
                  <MVText
                    style={{
                      color: "#999",
                    }}
                  >
                    Quốc gia : ?
                  </MVText>
                  <div>
                    <MVText
                     
                      style={{
                        color: "#999",
                      }}
                    >
                      Thể loại : <span className="p-1 bg-gray-500 rounded-sm">
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
                  <div>
                    <MVText
                      style={{
                        color: "#999",
                      }}
                    >
                      Kiểu: 
                    </MVText>
                  </div>
                  <Tag color="#2db7f5" className="mt-5">
                    {c.isActive == 0 ? "Is Comming" : "Commpelete"}
                  </Tag>
                </div>
                <br />
                <SeriNumberMovie />
              </div>
            </div>
            <div className="text-[#999] lg:text-[15px] md:text[14px] text-[13px]">
              <Dividers textColor={"#fff"} orientation="left">
                NỘI DUNG PHIM
              </Dividers>
              {c.des}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
