import React from 'react'
import { DivStyledText, DivStyledTitle } from '../style'
import { Link } from 'react-router-dom'

const MVTypeDisplay = ({ data, children, ...rest }) => {
  return (
    <React.Fragment>
      <div>
        <DivStyledText><Link to={'/'}>Trang chủ</Link> - {data && (data.name)}</DivStyledText>
        <DivStyledTitle className="text-white">{data && (data.name)}</DivStyledTitle>
        <DivStyledText className='mt-3 mb-5'>Tuyển chọn Phim hay nhất chất lượng cao, Phim Chiếu Rạp 2022 chọn lọc có thuyết minh và việt sub.</DivStyledText>
      </div>
      {children}
    </React.Fragment>
  )
}

export default MVTypeDisplay