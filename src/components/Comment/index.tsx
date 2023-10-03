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
  // return <Divstyled className='commentContent overflow-hidden mt-3 mb-3'>
  //   <Divstyled className='comment bg-white overflow-y-scroll'>
  //     {
  //       getOne.comments && getOne.comments.length ? getOne.comments.map((comment, index) => (
  //         <Divstyled className=' commentProducts mt-2 mb-2' key={index}>
  //           <Divstyled className="p-3 text-base rounded-lg dark:bg-gray-900 ">
  //             <Divstyled>
  //               <Divstyled className="flex justify-between items-center mb-2">
  //                 <Divstyled className="flex items-center">
  //                   <Divstyled className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
  //                     className="mr-2 w-6 h-6 rounded-full"
  //                     src={comment.user.image}
  //                     />{comment.user.username}</Divstyled>
  //                   <Divstyled className='text-gray-500 dark:text-gray-400 text-sm'>{moment(comment.date).format('LTS DD-MM-YYYY')}</Divstyled>
  //                   <Divstyled className="text-sm text-gray-600 dark:text-gray-400"><time dateTime="2022-02-08"
  //                     title="February 8th, 2022">{comment.updatedAt}</time></Divstyled>
  //                 </Divstyled>
  //               </Divstyled>
  //               <Psyled className="text-gray-500 dark:text-gray-400">{
  //                 comment.commentContent
  //               }
  //               </Psyled>
  //             </Divstyled>
  //           </Divstyled>
  //         </Divstyled>
  //       )) : <Divstyled className='mt-5 mb-5 text-muted text-center text-[#999]'>Hãy là người comment đầu tiên...</Divstyled>
  //     }
  //   </Divstyled>
  // </Divstyled>
}

export default CommentProductsIndex
