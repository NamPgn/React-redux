import React, { useContext } from "react";
import { Tabs } from 'antd';
import CategoryContents from "../Content/Category";
import SliderComponent from "../Slider";
import { MyContext } from "../../context";
const style = {
  color: "#fff",
  margin: "20px 0"
}

export default function WeekComponent() {
  const { weeks } = useContext(MyContext) || {};
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    pauseOnHover: true,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Tabs
      defaultActiveKey="1"
      style={style}
      centered
      items={
        weeks && (
          weeks.map((item: any, i: string) => (
            {
              label: item.name,
              key: (i + 1).toString(),
              children: <SliderComponent content={item.products.length <= 0 && item.category.length <= 0 ? <div className="text-center py-4">Chưa có</div>
                  : item.products.length <= 0 && item.category.length > 0 ? item.category.map((item: any, index: number) => (
                    <div key={index} className="pl-2 pr-2">
                      <CategoryContents
                        title={item.name}
                        link={'/q/' + item._id}
                        image={item.linkImg}
                        time='Thời gian 20/12 phút'
                        sumSeri={item.sumSeri}
                      />
                    </div>
                  )) : item.products.map((item: any, index: number) => (
                    <div key={index} className="pl-2 pr-2">
                      <CategoryContents
                        title={item.name}
                        link={'/d/' + item._id + `?c=${item.typeId}`}
                        image={item.image}
                        time='Thời gian 1/2 h'
                      />
                    </div>
                  ))
                } settings={settings}
              />
            }
          ))
        )
      }
    >
    </Tabs>
  )
}