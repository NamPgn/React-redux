import React from "react";
import { Pie } from "@ant-design/plots";
import { useSWRWithAxios } from "../../../hook/Swr";
import { urlSwr } from "../../../function";

const PieComponent = () => {
  const { data: {data} } = useSWRWithAxios(urlSwr + "/category/filters");
  const config = {
    data: data,
    angleField: 'up',
    colorField: 'name',
    paddingRight: 80,
    label: {
      text: 'up',
      position: 'outside',
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };
  return <Pie className="w-7/12" {...config} />;
};

export default PieComponent;
