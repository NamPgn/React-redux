import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <div className='page404' style={{ height: "100vh" }}>
      <div className='text-light text-center ' >
        404 not found page!
      </div>
      <div className='text-primary'><Link to={'/'}>Go Home</Link></div>
    </div>
  )
}

export default Page404
