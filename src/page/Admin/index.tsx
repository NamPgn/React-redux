import React from "react";
import { Line } from "@ant-design/plots";
import { useSWRWithAxios } from "../../hook/Swr";
import { urlSwr } from "../../function";
import { Card, Statistic, Row, Col, Typography, List, Avatar, Table } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../hook";
import { user$ } from "../../redux/selectors";

const { Title } = Typography;

const AdminPage = () => {
  const states = useAppSelector(user$);
  const { data: item } = useSWRWithAxios(`${urlSwr}/most-watched-episodes`);
  const { data: rating } = useSWRWithAxios(`${urlSwr}/rating/stats`);
  const { data: latestComments } = useSWRWithAxios(`${urlSwr}/comments/latest`);
  const { data: topUsers } = useSWRWithAxios(`${urlSwr}/users/top`);

  const config = {
    data: item?.data || [],
    xField: "seri",
    yField: "view",
    point: {
      shape: "circle",
      size: 5,
      style: {
        fill: "#5B8FF9",
        stroke: "#ffffff",
        lineWidth: 2,
      },
    },
    lineStyle: {
      stroke: "#5B8FF9",
      lineWidth: 2,
    },
    tooltip: {
      showMarkers: true,
    },
  };

  const columns = [
    {
      title: "User",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <span>
          <Avatar src={record.avatar} size="small" /> {text}
        </span>
      ),
    },
    {
      title: "Total Ratings",
      dataIndex: "ratings",
      key: "ratings",
    },
  ];

  return (
    <div className=" bg-gray-100 min-h-screen">
      <Title level={2} className=" mb-6">
        Admin Dashboard
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md">
            <Statistic
              title="Active Users"
              value={states.length}
              prefix={<UserOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ fontWeight: "bold" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md">
            <Statistic
              title="Comments Growth"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600", fontWeight: "bold" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md">
            <Statistic
              title="View Drop"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322", fontWeight: "bold" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-md">
            <Statistic
              title="Total Ratings"
              value={rating?.totalRatings || 0}
              prefix={<StarOutlined style={{ color: "#faad14" }} />}
              valueStyle={{ fontWeight: "bold" }}
            />
          </Card>
        </Col>
      </Row>

      <div className="mt-8 p-4 bg-white shadow-md rounded-md">
        <Title level={4} className="text-center mb-4">
          Most Watched Episodes
        </Title>
        <Line {...config} />
      </div>

      <div className="mt-8 p-4 bg-white shadow-md rounded-md">
        <Title level={4} className="text-center mb-4">
          Latest Comments
        </Title>
        <List
          itemLayout="horizontal"
          dataSource={latestComments?.data || []}
          renderItem={(item:any) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.userAvatar} />}
                title={<a href={`/user/${item.userId}`}>{item.username}</a>}
                description={item.comment}
              />
            </List.Item>
          )}
        />
      </div>

      <div className="mt-8 p-4 bg-white shadow-md rounded-md">
        <Title level={4} className="text-center mb-4">
          Top Users by Ratings
        </Title>
        <Table
          dataSource={topUsers?.data || []}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </div>
    </div>
  );
};

export default AdminPage;
