import React, { useContext, useEffect, useState } from "react";
import SliderComponent from "../Slider";
import { settingsSlider } from "../../constant";
import { getCategoryByWeek } from "../../sevices/week";
import { Loading } from "../Message/Notification";
import { ApiContext } from "../../context/api";
import CategoryContents from "../Category/content";

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
  const today = new Date();
  const day = today.getDay();
  const [isLoading, setIsLoading] = useState(true);
  const [tabs, setTabs] = useState(weekdays[day]);
  const [categorys, setCategory]: any = useState([]);

  const handleTabClick = (tabId) => {
    setTabs(tabId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCategoryByWeek(tabs);
      setCategory(data);
      setIsLoading(false);
    };

    setIsLoading(true);
    fetchData();
  }, [tabs]);

  return (
    <div className="container mx-auto my-10">
      <div className="px-4 lg:px-[150px] md:px-[100px] grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
        {weeks &&
          weeks.map((items) => (
            <div
              key={items._id}
              className={"cursor-pointer"}
              onClick={() => handleTabClick(items.name)}
            >
              <div className="text-[11px] md:text-[12px] lg:text-[14px] flex justify-center items-center px-4 py-2 text-white rounded-lg w-full">
                <p>{items.name}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="my-5 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        {isLoading ? (
          <Loading />
        ) : (
          <SliderComponent
            settings={settingsSlider}
            content={categorys?.content?.map((itemsCategory) => (
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
            ))}
          />
        )}
      </div>
    </div>
  );
}
