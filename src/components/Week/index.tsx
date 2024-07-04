import React, { useContext, useEffect, useState } from "react";
import SliderComponent from "../Slider";
import { settingsSlider } from "../../constant";
import CategoryContents from "../Category/Content/Category";
import { getCategoryByWeek } from "../../sevices/week";
import { Loading } from "../Message/Notification";
import { ApiContext } from "../../context/api";

export default function WeekComponent() {
  const { weeks } = useContext(ApiContext) || {};
  const weekdays = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];
  var today = new Date();
  var day = today.getDay();
  const [isLoading, setIsLoading] = useState(true);
  const [tabs, setTabs] = useState(weekdays[day]);
  const [categorys, setCategory]: any = useState([]);
  const handleTabClick = (tabId) => {
    setTabs(tabId);
  };

  useEffect(() => {
    (async () => {
      const { data } = await getCategoryByWeek(tabs);
      setIsLoading(false);
      setCategory(data);
    })();
    return setIsLoading(true);
  }, [tabs]);
  return (
    // <Tabs
    //   defaultActiveKey="1"
    //   style={style}
    //   centered
    //   items={
    //     weeks &&
    //     weeks.map((item: any, i: string) => ({
    //       label: item.name,
    //       key: (i + 1).toString(),
    //       children: (
    //         <SliderComponent
    //           content={
    //             item.products.length <= 0 && item.category.length <= 0 ? (
    //               <div classNameName="text-center py-4">Chưa có</div>
    //             ) : item.products.length <= 0 && item.category.length > 0 ? (
    //               item.category.map((item: any, index: number) => (
    //                 <div key={index} classNameName="pl-2 pr-2">
    //                   <CategoryContents
    //                     title={item.name}
    //                     link={"/q/" + item._id}
    //                     image={item.linkImg}
    //                     time={item.time}
    //                     sumSeri={item.sumSeri}
    //                     products={item.products}
    //                   />
    //                 </div>
    //               ))
    //             ) : (
    //               item.products.map((item: any, index: number) => (
    //                 <div key={index} classNameName="pl-2 pr-2">
    //                   <CategoryContents
    //                     title={item.name}
    //                     link={"/d/" + item._id + `?c=${item.typeId}`}
    //                     image={item.image}
    //                     time={item.time}
    //                     products={item.products}
    //                   />
    //                 </div>
    //               ))
    //             )
    //           }
    //           settings={settingsSlider}
    //         />
    //       ),
    //     }))
    //   }
    // ></Tabs>

    <div className="my-10">
      <div className="lg:px-[150px] md:px-[100px] justify-items-center grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
        {weeks &&
          weeks.map((items, index) => (
            <div
              key={items._id}
              className={
                tabs === items.name ? "active border-none" : "cursor-pointer"
              }
              onClick={() => handleTabClick(items.name)}
            >
              <div className="text-[11px] md:text-[12px] lg:text-[14px] flex justify-center items-center px-4 py-2 text-white rounded-lg w-full ">
                <p>{items.name}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="my-5 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        {isLoading == true ? (
          <Loading />
        ) : (
          <SliderComponent
            settings={settingsSlider}
            content={categorys?.content?.map(
              (itemsCategory: any, index: number) => {
                return (
                  <div className="px-2" key={itemsCategory._id}>
                    <CategoryContents
                      title={itemsCategory.name}
                      link={"/q/" + itemsCategory._id}
                      image={itemsCategory.linkImg}
                      time={itemsCategory.time}
                      sumSeri={itemsCategory.sumSeri}
                      products={itemsCategory.products}
                    />
                  </div>
                );
              }
            )}
          />
        )}
      </div>
    </div>
  );
}
