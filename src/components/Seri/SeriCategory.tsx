import React from "react";
import { NotUpdate } from "../Message/Notification";
import { BtnStyledNumber } from "./styles";
import MVLink from "../Location/Link";
import MVRow from "../MV/Grid";
import MVCol from "../MV/Grid/Col";
const SeriNumberMovie = ({ data, isLoading }) => {
  // const { data, error, isLoading }: any = useSWRWithAxios(
  //   urlSwr + `/category/products/${id}`
  // );

  if (isLoading) {
    return <div className="seriLoading">Loading....</div>;
  }
  // if (error) {
  //   return <MessageErr />;
  // }
  return (
    <div className="bg-[#9b9b9b1f] h-[174px] overflow-y-scroll p-3 rounded-sm seriCategory">
      <MVRow gutter={[16, 16]}>
        {data?.products?.length > 0 && data?.products ? (
          data.products.map((item: any, index: number) =>
            item.isApproved == true ? (
              <MVCol
                lg={3}
                md={4}
                sm={5}
                xs={6}
                style={{ textAlign: "center" }}
                key={index}
              >
                <MVLink to={"/d/" + item._id + `?c=${item.category}`}>
                  {!item.dailyMotionServer && item.trailer ? (
                    <BtnStyledNumber>{item.seri}</BtnStyledNumber>
                  ) : (
                    <BtnStyledNumber
                      className="w-full text-white"
                      variant="ghost"
                      size="sm"
                    >
                      {item.seri}
                    </BtnStyledNumber>
                  )}
                </MVLink>
              </MVCol>
            ) : (
              ""
            )
          )
        ) : (
          <NotUpdate />
        )}
      </MVRow>
    </div>
  );
};

export default SeriNumberMovie;
