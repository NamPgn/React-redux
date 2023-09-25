import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import MVLink from '../Location/Link';
const Page404 = () => {
  return (
    <Result
      style={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: "#fff",
        zIndex:9,
        height: "100vh",
      }}
      icon={<SmileOutlined />}
      title="Page Not found"
      extra={
        <MVLink to={'/'}>
          <Button>Back to home</Button>
        </MVLink>
      }
    />
  )
}

export default Page404
