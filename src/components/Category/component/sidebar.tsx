import React from "react";
import stylded from "styled-components";
import MVLink from "../../Location/Link";
import { useSWRWithAxios } from "../../../hook/Swr";
import Dividers from "../../MV/Divider";
import MVImage from "../../MV/Image";
import MVText from "../../MV/Text";
import MVTags from "../../MV/Tag";
const Container = stylded.div`
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius:10px;
}
::-webkit-scrollbar {
  width: 2px;
}
`;

const CategorySideBarStyles = stylded.div`
gap: 0px 18px;
padding: 10px;
background: rgb(28, 28, 30);
border-radius: 10px;
margin: 5px 0px;
`;
const CategoryProductSidebar = () => {
  const {
    data: { data },
  } = useSWRWithAxios("/category/filters");
  return (
    <div className="rounded des w-3/12 relative overflow-hidden lg:block md:hidden hidden bg-[#0000005e]">
      <Dividers className="m-0" textColor={"#fff"} orientation="left">
        Xem thêm
      </Dividers>
      <Container className="absolute h-full w-full px-2 overflow-scroll">
        {data &&
          data?.map((item: any, index: any) => (
            <CategorySideBarStyles
              className="d-flex col-md-12  my-2"
              key={index}
            >
              <div className="w-3/12">
                <MVLink key={index} to={"/q/" + item._id}>
                  <MVImage
                    className="m-0 h-full"
                    src={item.linkImg}
                    alt={item.name}
                  />
                </MVLink>
              </div>
              <div className="w-9/12">
                <MVLink
                  key={index}
                  style={{
                    textDecoration: "none",
                    color: "#999",
                    fontSize: "13px",
                  }}
                  to={"/q/" + item._id}
                >
                  {item.name}
                </MVLink>
                <MVTags
                  color="#108ee9"
                  className="text-[12px] text-[#999] my-2 block w-6/12 "
                >
                  {" "}
                  {item.sumSeri + " Tập VietSub"}
                </MVTags>
                <MVTags color="#2db7f5">
                  {item.type ? item.type : "null"}
                </MVTags>
                <div className="text-sm text-gray-400 mt-2">
                  <div className="flex items-center mt-1 justify-between">
                    <MVText className="mr-2 text-gray-300">
                      Full HD/Vietsub
                    </MVText>
                    <MVText className="mr-2 text-gray-300">
                      {item.typecm}
                    </MVText>
                    <MVText className="text-gray-400 text-sm">
                      ({item.time})
                    </MVText>
                  </div>
                </div>
              </div>
            </CategorySideBarStyles>
          ))}
      </Container>
    </div>
  );
};

export default CategoryProductSidebar;
