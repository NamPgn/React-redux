import React from "react";
import { useSWRWithAxios } from "../../../hook/Swr";
import { urlSwr } from "../../../function";
import MVImage from "../../MV/Image";
import MVLink from "../../Location/Link";
import { PlayCircleOutlined } from "@ant-design/icons";
import { settingsSliderLatest } from "../../../constant";
import SliderComponent from "../../Slider";
import { NotFoundContent } from "../../Message/Notification";

const LatesCategory = () => {
  const {
    data: { data },
  } = useSWRWithAxios(urlSwr + "/category/latest");
  return (
    <div>
      <h2 className="text-white category text-md md:text-md pl-2 mb-2 mx-2 my-3 border-l-4  font-sans font-bold border-teal-400 dark:text-gray-200">
        Mới Cập Nhật
      </h2>
      <SliderComponent
        settings={settingsSliderLatest}
        content={
          data &&
          data.map((item: any, index: number) => {
            const lastItem = item.products[item.products.length - 1];
            return (
              <div key={item._id}>
                <div className="w-full px-1">
                  <div className="relative group">
                    <MVLink to={"/q/" + item._id} className="block">
                      <MVImage
                        src={item.linkImg}
                        alt={item.name}
                        className="h-[150px] md:h-[180px] lg:h-[220px] object-cover transition-opacity duration-300 group-hover:opacity-40 rounded-lg"
                      />
                      <div
                        style={{
                          background:
                            "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
                        }}
                        className="absolute top-2 left-2 text-white text-xs rounded-[4px] px-1 md:px-2 py-1 font-medium"
                      >
                        {lastItem ? (
                          `Tập ${lastItem.seri}`
                        ) : (
                          <NotFoundContent />
                        )}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <PlayCircleOutlined className="text-white text-5xl" />
                      </div>
                    </MVLink>
                  </div>
                  <div className="mt-4">
                    <MVLink to={"/q/" + item._id}>
                      <div
                        style={{ color: "#999" }}
                        className="text-sm md:text-md lg:text-md"
                      >
                        {item.name}
                      </div>
                    </MVLink>
                  </div>
                </div>
              </div>
            );
          })
        }
      />
    </div>
  );
};

export default LatesCategory;
