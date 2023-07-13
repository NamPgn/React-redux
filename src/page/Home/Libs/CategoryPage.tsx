import React, { Suspense, useContext } from 'react'
import { useParams } from 'react-router-dom'
import GetAllCategoryNotRequest from '../../../components/CategoryComponent/GetAllCategoryOther';
import CategoryProductComponent from '../../../components/CategoryComponent/CategoryProductDesCriptionComponent';
import { ChangeContext } from '../../../context';
import { motion } from "framer-motion";
const CategoryProduct = () => {
  const { id } = useParams();
  const { state } = useContext(ChangeContext);
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: state ? '91%' : '83%', opacity: 1 }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 }, opacity: 0 }}
      className={state ? 'w-11/12' : 'w-10/12'}>
      <div className='d-flex'>
        <CategoryProductComponent />
      </div>
      <GetAllCategoryNotRequest id={id} />
    </motion.div>
  )
}

export default CategoryProduct
