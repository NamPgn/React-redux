import React, { useState, useEffect } from 'react';
import { Card, Statistic, Progress, Avatar, Badge, List, Table, Row, Col, Typography, Space, Button } from 'antd';
import {
  FireOutlined,
  ThunderboltOutlined,
  StarOutlined,
  TrophyOutlined,
  BookOutlined,
  SafetyCertificateOutlined,
  GiftOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const CultivationDashboard = () => {
  const [cultivationLevel, setCultivationLevel] = useState(67);
  const [spiritualPower, setSpiritualPower] = useState(8420);
  const [maxSpiritualPower] = useState(10000);

  // Dữ liệu mẫu cho bảng xếp hạng
  const rankingData = [
    { key: '1', rank: 1, name: 'Thiên Đế Vô Song', level: 'Hợp Thể Kỳ', power: '999,999' },
    { key: '2', rank: 2, name: 'Huyền Thiên Chân Nhân', level: 'Hóa Thần Kỳ', power: '856,420' },
    { key: '3', rank: 3, name: 'Băng Phong Kiếm Tôn', level: 'Nguyên Anh Kỳ', power: '742,180' },
    { key: '4', rank: 4, name: 'Lôi Hỏa Đạo Quân', level: 'Kim Đan Kỳ', power: '634,290' },
    { key: '5', rank: 5, name: 'Thanh Lâm Tiên Tử', level: 'Trúc Cơ Kỳ', power: '521,350' },
  ];

  const rankingColumns = [
    {
      title: 'Hạng',
      dataIndex: 'rank',
      key: 'rank',
      width: 60,
      render: (rank) => (
        <Badge
          count={rank}
          style={{
            backgroundColor: rank <= 3 ? '#d4af37' : '#52c41a',
            color: '#fff'
          }}
        />
      )
    },
    {
      title: 'Đạo Hào',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Cảnh Giới',
      dataIndex: 'level',
      key: 'level',
      render: (level) => <Text style={{ color: '#1890ff' }}>{level}</Text>
    },
    {
      title: 'Tu Vi',
      dataIndex: 'power',
      key: 'power',
      render: (power) => <Text strong style={{ color: '#52c41a' }}>{power}</Text>
    }
  ];

  // Dữ liệu hoạt động gần đây
  const recentActivities = [
    { title: 'Đột phá Kim Đan Kỳ', description: 'Thành công ngưng tụ kim đan, tu vi đại tăng', time: '2 giờ trước', icon: <FireOutlined style={{ color: '#ff4d4f' }} /> },
    { title: 'Nhận được pháp bảo', description: 'Trong bí cảnh phát hiện "Lôi Thần Chùy"', time: '5 giờ trước', icon: <GiftOutlined style={{ color: '#722ed1' }} /> },
    { title: 'Đánh bại cường địch', description: 'Chiến thắng yêu thú Hóa Thần Kỳ', time: '1 ngày trước', icon: <SafetyCertificateOutlined style={{ color: '#fa541c' }} /> },
    { title: 'Học công pháp mới', description: 'Chưởng ác "Cửu Thiên Huyền Lôi"', time: '2 ngày trước', icon: <BookOutlined style={{ color: '#13c2c2' }} /> },
  ];

  useEffect(() => {
    // Tạo hiệu ứng tăng năng lượng tự động
    const interval = setInterval(() => {
      setSpiritualPower(prev => prev < maxSpiritualPower ? prev + 1 : prev);
    }, 2000);

    return () => clearInterval(interval);
  }, [maxSpiritualPower]);

  return (
    <>
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              background: 'linear-gradient(135deg, #ff9a56 0%, #ff6b95 100%)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(255, 154, 86, 0.3)'
            }}
          >
            <Statistic
              title={<span style={{ color: '#fff', fontSize: '14px' }}>Cấp Độ Tu Vi</span>}
              value={cultivationLevel}
              prefix={<FireOutlined />}
              suffix="cấp"
              valueStyle={{ color: '#fff', fontSize: '28px', fontWeight: 'bold' }}
            />
            <Progress
              percent={85}
              showInfo={false}
              strokeColor="#fff"
              trailColor="rgba(255,255,255,0.3)"
              style={{ marginTop: '8px' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
            }}
          >
            <Statistic
              title={<span style={{ color: '#fff', fontSize: '14px' }}>Năng Lượng Linh Lực</span>}
              value={spiritualPower}
              prefix={<ThunderboltOutlined />}
              suffix={`/ ${maxSpiritualPower.toLocaleString()}`}
              valueStyle={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}
            />
            <Progress
              percent={(spiritualPower / maxSpiritualPower) * 100}
              showInfo={false}
              strokeColor="#52c41a"
              trailColor="rgba(255,255,255,0.3)"
              style={{ marginTop: '8px' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(252, 182, 159, 0.3)'
            }}
          >
            <Statistic
              title={<span style={{ color: '#8b4513', fontSize: '14px' }}>Số Lượng Pháp Bảo</span>}
              value={23}
              prefix={<StarOutlined />}
              suffix="cái"
              valueStyle={{ color: '#8b4513', fontSize: '28px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(168, 237, 234, 0.3)'
            }}
          >
            <Statistic
              title={<span style={{ color: '#722ed1', fontSize: '14px' }}>Đóng Góp Tông Môn</span>}
              value={15420}
              prefix={<TrophyOutlined />}
              suffix="điểm"
              valueStyle={{ color: '#722ed1', fontSize: '28px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Nội dung chính */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TrophyOutlined style={{ marginRight: '8px', color: '#faad14' }} />
                <span style={{ color: '#1890ff', fontSize: '18px', fontWeight: 'bold' }}>
                  Bảng Xếp Hạng Tu Tiên Giới
                </span>
              </div>
            }
            style={{
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              background: 'rgba(255,255,255,0.95)'
            }}
          >
            <Table
              dataSource={rankingData}
              columns={rankingColumns}
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BookOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
                <span style={{ color: '#1890ff', fontSize: '18px', fontWeight: 'bold' }}>
                  Hoạt Động Gần Đây
                </span>
              </div>
            }
            style={{
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              background: 'rgba(255,255,255,0.95)'
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={item.icon} style={{ backgroundColor: 'transparent' }} />}
                    title={<Text strong style={{ color: '#1890ff' }}>{item.title}</Text>}
                    description={
                      <div>
                        <div style={{ color: '#666', marginBottom: '4px' }}>{item.description}</div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{item.time}</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Các nút hành động */}
      <Row style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card
            style={{
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              background: 'rgba(255,255,255,0.95)'
            }}
          >
            <Title level={4} style={{ color: '#1890ff', marginBottom: '16px' }}>
              Chức Năng Tu Luyện
            </Title>
            <Space wrap size="middle">
              <Button
                type="primary"
                size="large"
                icon={<FireOutlined />}
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                  border: 'none',
                  borderRadius: '8px'
                }}
              >
                Bế Quan Tu Luyện
              </Button>
              <Button
                type="primary"
                size="large"
                icon={<SafetyCertificateOutlined />}
                style={{
                  background: 'linear-gradient(135deg, #74b9ff, #0984e3)',
                  border: 'none',
                  borderRadius: '8px'
                }}
              >
                Lịch Luyện Chiến Đấu
              </Button>
              <Button
                type="primary"
                size="large"
                icon={<BookOutlined />}
                style={{
                  background: 'linear-gradient(135deg, #00b894, #00a085)',
                  border: 'none',
                  borderRadius: '8px'
                }}
              >
                Học Tập Công Pháp
              </Button>
              <Button
                type="primary"
                size="large"
                icon={<GiftOutlined />}
                style={{
                  background: 'linear-gradient(135deg, #fd79a8, #e84393)',
                  border: 'none',
                  borderRadius: '8px'
                }}
              >
                Luyện Chế Pháp Bảo
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CultivationDashboard;