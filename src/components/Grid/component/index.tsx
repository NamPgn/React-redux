import React, { memo } from 'react'
import { Col, Row } from 'antd';
import CategoryContents from '../../Content/Category';
import { NotUpdate } from '../../Message/Warning';
const MVGrid = memo(({ type, gutter, child, ...rest }: any) => {
  return (
    <Row gutter={gutter}>
      {type === 'category' ? child && child.length && (child.map((item, index) => (
        <Col key={item._id} xs={12} sm={10} md={8} lg={6} xl={4}>
          <CategoryContents
            title={item.name}
            link={item.image ? '/d/' + item._id : '/q/' + item._id}
            image={item.linkImg || item.image}
            time='Thời gian 20/12 phút'
            sumSeri={item.sumSeri}
          />
        </Col>
      ))) : child && child.length ? (child.map((item, index) => (
        <Col key={item._id} xs={12} sm={10} md={8} lg={6} xl={4}>
          <CategoryContents
            title={item.name}
            link={item.image ? '/d/' + item._id : '/q/' + item._id}
            image={item.image}
            time='Thời gian 20/12 phút'
            sumSeri={item.sumSeri}
          />
        </Col>
      ))) : <NotUpdate />}
    </Row>
  )
})

export default MVGrid