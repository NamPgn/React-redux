import React, { useContext } from 'react'
import { MyButton } from '../../../components/Button';
import { Link } from 'react-router-dom';
import { MyContext } from '../../../context';
import MVTable from '../../../components/Table';
import { columnsBackground } from '../../../constant';

const Background = () => {
  const { background } = useContext(MyContext);
  const data = {
    key: background.data._id,
    url: background ? background.data.url : '',
    action: (
      <span>
        <Link to={`/dashboard/background/edit/${background ? background.data._id : ''}`}>
          <MyButton type="primary" style={{ background: "#1677ff" }}>
            Edit
          </MyButton>
        </Link>
      </span>
    )
  }
  return (
    <>
      <MVTable 
        columns={columnsBackground} 
        dataSource={[data]} 
      />
    </>
  )
}

export default Background