import React from "react";
import { Line } from "@ant-design/plots";
import { useSWRWithAxios } from "../../hook/Swr";
import { urlSwr } from "../../function";
import { Card, Statistic } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../hook";
import { user$ } from "../../redux/selectors";

const AdminPage = () => {
  const states = useAppSelector(user$);
  const { data: item } = useSWRWithAxios(urlSwr + "/most-watched-episodes");
  const { data: rating } = useSWRWithAxios(urlSwr + "/rating/stats");
  const config = {
    data: item.data,
    xField: "seri",
    yField: "view",
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };

  return (
    <>
      <div className="flex justify-around gap-2">
        <Card className="w-full">
          <Statistic
            title="Active Users"
            prefix={<UserOutlined />}
            value={states.length}
          />
        </Card>
        <Card bordered={true} className="w-full">
          <Statistic
            title="Comment"
            value={11.28}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
        <Card bordered={false} className="w-full">
          <Statistic
            title="View"
            value={9.3}
            precision={2}
            valueStyle={{ color: "#cf1322" }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
        <Card className="w-full">
          <Statistic
            title="Rating Video"
            prefix={<StarOutlined />}
            value={rating.totalRatings}
          />
        </Card>
      </div>
      <div className="flex justify-between gap-2">
        <Line {...config} />
      </div>
    </>
  );
};

export default AdminPage;
