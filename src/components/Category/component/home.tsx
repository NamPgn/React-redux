import React, { useEffect } from "react";
import { Spiner } from "../../Message/Notification";
import { useSWRWithAxios } from "../../../hook/Swr";
import { urlSwr } from "../../../function";
import MVGridCategory from "../../Grid/component";
import MVLink from "../../Location/Link";
import MVTitle from "../../MV/Title";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { getAllcate } from "../../../redux/slice/category/thunk/category";

type CategoryProp = {
  category: any;
  isLoading: boolean;
  isError: any;
  phim?: any;
  loading?: boolean;
};

const CategoryHomePage = () => {
  const { data } = useAppSelector((state) => state.category.category);
  const isLoading = useAppSelector((state) => state.category.isLoading);
  const isError = useAppSelector((state) => state.category.isError);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllcate(1));
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center">
        <MVTitle
          level={2}
          underline
          style={{ color: "#fff" }}
          strong
          className="uppercase"
        >
          Xem Nhiều
        </MVTitle>
        <MVLink to={"/loadmore"}>
          <div className="text-[16px] text-[#fff] flex lg:text-[20px] md:text[18px] gap-3">
            <span className="underline">See More</span>
            <span>
              <ArrowRightOutlined />
            </span>
          </div>
        </MVLink>
      </div>
      <MVGridCategory type="category" gutter={[16, 16]} child={data} />
      {/* <div>
        <MVTitle level={2} underline style={{ color: "#fff" }} strong>
          {phim?.name}
        </MVTitle>
        <MVGridCategory
          type="types"
          gutter={phim && phim.products.length ? [16, 16] : 0}
          child={phim.products?.length == 0 ? phim.category : ""}
        />
      </div> */}
    </div>
  );
};

export default CategoryHomePage;
