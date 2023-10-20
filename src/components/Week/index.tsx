import React, { useContext } from "react";
import { Tabs } from "antd";
import SliderComponent from "../Slider";
import { MyContext } from "../../context";
import { settingsSlider } from "../../constant";
import CategoryContents from "../Category/Content/Category";
const style = {
  color: "#fff",
  margin: "20px 0",
};

export default function WeekComponent() {
  const { weeks } = useContext(MyContext) || {};
 
  return (
    <Tabs
      defaultActiveKey="1"
      style={style}
      centered
      items={
        weeks &&
        weeks.map((item: any, i: string) => ({
          label: item.name,
          key: (i + 1).toString(),
          children: (
            <SliderComponent
              content={
                item.products.length <= 0 && item.category.length <= 0 ? (
                  <div className="text-center py-4">Chưa có</div>
                ) : item.products.length <= 0 && item.category.length > 0 ? (
                  item.category.map((item: any, index: number) => (
                    <div key={index} className="pl-2 pr-2">
                      <CategoryContents
                        title={item.name}
                        link={"/q/" + item._id}
                        image={item.linkImg}
                        time="Thời gian 20/12 phút"
                        sumSeri={item.sumSeri}
                      />
                    </div>
                  ))
                ) : (
                  item.products.map((item: any, index: number) => (
                    <div key={index} className="pl-2 pr-2">
                      <CategoryContents
                        title={item.name}
                        link={"/d/" + item._id + `?c=${item.typeId}`}
                        image={item.image}
                        time="Thời gian 1/2 h"
                      />
                    </div>
                  ))
                )
              }
              settings={settingsSlider}
            />
          ),
        }))
      }
    ></Tabs>
  );
}
