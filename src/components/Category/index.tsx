import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Loading } from "../Message/Notification";
import { MyContext } from "../../context";
import SeriNumberMovie from "../Seri/SeriCategory";
import MVTitle from "../MV/Title";
import MVLink from "../Location/Link";
import MVImage from "../MV/Image";
import MVText from "../MV/Text";
import { Chip } from "@nextui-org/react";
import {
  CheckCircleOutlined,
  Loading3QuartersOutlined,
} from "@ant-design/icons";

const Divstyled = styled.div``;
const CategoryProductComponent = () => {
  const { id } = useParams();
  const { category, isLoading }: any = useContext(MyContext);
  if (isLoading) {
    return <Loading />;
  }
  const c = category && category.data.find((c) => c._id === id);
  useEffect(() => {
    document.title = c.name;
  }, [c]);
  return (
    <Divstyled>
      {c && (
        <Divstyled key={c._id}>
          <Divstyled style={{ color: "#fff" }}>
            <Divstyled className="md:flex lg:flex block gap-2 ">
              <Divstyled className="mb-5 lg:w-3/12 md:w-3/12 md:h-full h-52 ">
                <div className="h-full w-full flex justify-center">
                  <MVImage
                    className="object-contain w-full h-full flex-grow"
                    src={c.linkImg}
                    alt={c.name}
                  />
                </div>
              </Divstyled>
              <Divstyled className="lg:w-9/12 md:w-9/12">
                <Divstyled className="category">
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
                </Divstyled>
                <Divstyled className="loai des text-[12px] md:text-[13px] lg:text-[14px]">
                  <div>
                    <MVText
                      style={{
                        color: "#999",
                      }}
                    >
                      Thể loại : {c.type}
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
                      Kiểu: Thuyết minh
                    </MVText>
                  </div>
                  <Chip
                    startContent={
                      c.isActive == 0 ? (
                        <Loading3QuartersOutlined className="m-1" />
                      ) : (
                        <CheckCircleOutlined />
                      )
                    }
                    className="mt-2 gap-1"
                    color={c.isActive == 0 ? "warning" : "success"}
                    variant="bordered"
                  >
                    {c.isActive == 0 ? "Is Comming" : "Commpelete"}
                  </Chip>
                </Divstyled>
                <br />
                <SeriNumberMovie />
              </Divstyled>
            </Divstyled>
            <Divstyled className="des mt-4">
              <Divstyled className="lg:text-[15px] md:text-[14px] text-[13px]">
                Nội dung phim:{" "}
              </Divstyled>
              <p className="lg:text-[14px] md:text-[13px] text-[12px] text-[#999] mt-4 p-2 rounded bg-[#99999924]">
                {c.des ? c.des : "Trống!"}
              </p>
            </Divstyled>
          </Divstyled>
        </Divstyled>
      )}
    </Divstyled>
  );
};

export default CategoryProductComponent;
