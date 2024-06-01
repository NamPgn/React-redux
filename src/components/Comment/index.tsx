import React from 'react'
import { List } from 'antd';
import MVAvatar from '../MV/Avatar';
const CommentProductsIndex = ({ getOne }) => {
  return <List
    style={{
      background: "#fff",
      borderRadius: "2px",
      marginBottom: "10px"
    }}
    itemLayout="horizontal"
    dataSource={getOne.comments}
    renderItem={(comment: any, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<MVAvatar src={comment?.user?.image} />}
          title={comment?.user?.username}
          description={comment.commentContent}
        />
      </List.Item>
    )}
  />
}

export default CommentProductsIndex
