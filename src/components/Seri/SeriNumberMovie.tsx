import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { urlSwr } from '../../function';
import { useSWRWithAxios } from '../../hook/Swr';
import { Loader, MessageErr } from '../Message/Loading';
import { BtnStyledNumber, Divstyled, DivstyledContent, DivstyledItem } from './styles';
import { NotUpdate } from '../Message/Warning';

const SeriNumberMovie = () => {
  //còn đây là khi vào danh mục để list tâp phim
  const { id } = useParams();
  const { data, error, isLoading }: any = useSWRWithAxios(urlSwr + `/category/products/${id}`);
  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return <MessageErr/>
  }

  return (
    <DivstyledContent className="md:p-[16px] lg:p-[20px] p-[13px]">
      <DivstyledItem data={data.length} >
        {
          data.length > 0 && data ? data.map((item, index) => {
            return <Divstyled style={{ textAlign: "center", }} key={index}>
              <Link to={'/d/' + item._id + `?c=${item.category}`}>
                {
                  item.trailer ? <BtnStyledNumber type="button" className="d-flex btn-dark">
                    <span>
                      {item.seri}
                    </span>
                    <span >
                      Raw
                    </span>
                  </BtnStyledNumber> : <BtnStyledNumber type="button" className="" >{item.seri}</BtnStyledNumber>
                }
              </Link>
            </Divstyled>
          }) : <NotUpdate />
        }
      </DivstyledItem>
    </DivstyledContent>
  )
}

export default SeriNumberMovie
