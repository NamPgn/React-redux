import React from "react";
import { Loader } from "../../Message/Notification";
import stylded from "styled-components";
import MVLink from "../../Location/Link";
import MVTitle from "../../MV/Title";

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
const CategoryProductSidebar = ({ category, isLoading }) => {
  const catedata = category ? category.slice(0, 9) : "";
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="nav navCate col-sm-3 des w-3/12 relative overflow-hidden lg:block md:hidden hidden">
      <MVTitle level={5} style={{ color: "#fff", marginLeft: "10px" }}>
        See more
      </MVTitle>
      <Container className="absolute h-full w-full px-2 overflow-scroll">
        {catedata &&
          catedata.map((item: any, index: any) => (
            <CategorySideBarStyles
              className="d-flex col-md-12  my-2"
              key={index}
            >
              <div
                style={{ maxWidth: "50px", height: "55px" }}
                className="w-3/12"
              >
                <MVLink key={index} to={"/q/" + item._id}>
                  <img
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      height: "100%",
                      borderRadius: "8px",
                      boxShadow: "0 0 3px #000",
                    }}
                    src={item.linkImg}
                    alt=""
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
                <div className="text-[12px] text-[#999] mt-2">
                  {item.sumSeri + " Tập"}
                </div>
              </div>
            </CategorySideBarStyles>
          ))}
      </Container>
    </div>
  );
};

export default CategoryProductSidebar;
