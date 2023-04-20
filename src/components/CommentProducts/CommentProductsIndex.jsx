import React from 'react'
import moment from 'moment';
import styled from 'styled-components';
const Divstyled = styled.div``;
const SpanStyled = styled.span``;
const Psyled = styled.p``;
const BtnStyled = styled.button``;
const CommentProductsIndex = ({ getOne }) => {
  return <Divstyled className='commentContent overflow-hidden mt-3 mb-3'>
    <Divstyled className='comment bg-white overflow-y-scroll'>
      {
        getOne.comments && getOne.comments.length ? getOne.comments.map((comment, index) => (
          <Divstyled className=' commentProducts mt-2 mb-2' key={index}>
            <Divstyled className="p-3 text-base rounded-lg dark:bg-gray-900 ">
              <Divstyled>
                <Divstyled className="flex justify-between items-center mb-2">
                  <Divstyled className="flex items-center">
                    <Divstyled className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                      className="mr-2 w-6 h-6 rounded-full"
                      src={comment.user.image}
                      alt="Michael Gough" />{comment.user.username}</Divstyled>
                    <Divstyled className='text-gray-500 dark:text-gray-400 text-sm'>{moment(comment.date).format('LTS DD-MM-YYYY')}</Divstyled>
                    <Divstyled className="text-sm text-gray-600 dark:text-gray-400"><time dateTime="2022-02-08"
                      title="February 8th, 2022">{comment.updatedAt}</time></Divstyled>
                  </Divstyled>
                  <BtnStyled id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button">
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                      </path>
                    </svg>
                    <span className="sr-only">Comment settings</span>
                  </BtnStyled>
                  <Divstyled id="dropdownComment1"
                    className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownMenuIconHorizontalButton">
                      <li>
                        <a href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                      </li>
                      <li>
                        <a href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                      </li>
                      <li>
                        <a href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                      </li>
                    </ul>
                  </Divstyled>
                </Divstyled>
                <Psyled className="text-gray-500 dark:text-gray-400">{
                  comment.commentContent
                }
                </Psyled>
              </Divstyled>
            </Divstyled>
          </Divstyled>
        )) : <Divstyled className='mt-5 mb-5 text-muted text-center '>Hãy là người comment đầu tiên...</Divstyled>
      }
    </Divstyled>
  </Divstyled>
}

export default CommentProductsIndex
