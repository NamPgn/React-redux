import React from "react";
import { useParams } from "react-router-dom";
import { urlSwr } from "../../function";
import { useSWRWithAxios } from "../../hook/Swr";
import { MessageErr, NotUpdate, Spiner } from "../Message/Notification";
import { BtnStyledNumber } from "./styles";
import MVLink from "../Location/Link";
import { Card } from "@nextui-org/react";
import MVRow from "../MV/Grid";
import MVCol from "../MV/Grid/Col";
const SeriNumberMovie = () => {
  const { id } = useParams();
  const { data, error, isLoading }: any = useSWRWithAxios(
    urlSwr + `/category/products/${id}`
  );

  if (isLoading) {
    return <Spiner size={undefined} children={undefined} />;
  }
  if (error) {
    return <MessageErr />;
  }

  return (
    <Card radius="sm" isBlurred className="md:p-[16px] lg:p-[20px] p-[13px] bg-[#00000033]">
      <MVRow gutter={[16, 16]}>
        {data.length > 0 && data ? (
          data.map((item, index) => (
            <MVCol
              lg={3}
              md={4}
              sm={5}
              xs={6}
              style={{ textAlign: "center" }}
              key={index}
            >
              <MVLink to={"/d/" + item._id + `?c=${item.category}`}>
                {item.trailer ? (
                  <BtnStyledNumber>{item.seri + "Raw"}</BtnStyledNumber>
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
          ))
        ) : (
          <NotUpdate />
        )}
      </MVRow>
    </Card>
  );
};

export default SeriNumberMovie;
