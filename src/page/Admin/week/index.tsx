import React, { useContext } from 'react'
import { MyButton } from '../../../components/Button';
import { Link } from 'react-router-dom';
import { MyContext } from '../../../context';
import MVTable from '../../../components/Table';
import { columnsWeeks } from '../../../constant';
import { Col, Row } from 'antd';
import renderInput from '../../../hook/form';
import { useForm } from 'react-hook-form';
import { addWeeks, removeWeeks } from '../../../api/week';
const Weeks = () => {
  const { weeks } = useContext(MyContext);
  const { handleSubmit, control } = useForm();
  const onAdd = async (data) => {
    await addWeeks(data);
  }
  const handledelete = async (id) => {
    await removeWeeks(id);
  }
  const data = weeks && (weeks.map((v, i) => (
    {
      key: v._id,
      name: v.name,
      action: (
        <React.Fragment>
          <Link to={`/dashboard/week/edit/${v._id}`}>
            <MyButton type="primary">
              Edit
            </MyButton>
          </Link>
          <MyButton onClick={() => handledelete(v._id)} handleDelete className="ml-1">
            Xóa
          </MyButton>
        </React.Fragment>
      )
    }
  )))
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onAdd)}>
        <Row gutter={4} align={'middle'} justify={'center'}>
          <Col span={22}>
            {renderInput('name', 'Theo tuần', control)}
          </Col>
          <Col span={2}>
            <MyButton htmlType='submit' className="mt-3" type="primary">
              Thêm
            </MyButton>
          </Col>
        </Row>
      </form>
      <MVTable
        columns={columnsWeeks}
        dataSource={data}
      />
    </React.Fragment>
  )
}

export default Weeks