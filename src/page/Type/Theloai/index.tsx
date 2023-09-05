import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSWRWithAxios } from '../../../hook/Swr';
import { urlSwr } from '../../../function';
import { Loader, MessageErr } from '../../../components/Message/Loading';
import { Div, DivStyledGrid, DivStyledContent, DivStyledImage, DivStyledItem, DivStyledText, DivStyledTitleItem } from '../style';
import { NotUpdate } from '../../../components/Message/Warning';
import MVTypeDisplay from '../conponent';

const ListType = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useSWRWithAxios(urlSwr + `/categorymain/${id}`);

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <MessageErr />
  }

  return (
    <MVTypeDisplay
      data={data}
      children={
        <DivStyledGrid className='mt-4'>
          {data.products && data.products.length ? data.products.map((item: any, index: number) => (
            <DivStyledContent key={index}>
              <DivStyledItem>
                <Link to={'/d/' + item._id + `?c=${item.categorymain}`}>
                  <Div>
                    <DivStyledImage src={item.image}></DivStyledImage>
                  </Div>
                </Link>
                <DivStyledTitleItem>{item.name}</DivStyledTitleItem>
                <DivStyledText>{data.name}</DivStyledText>
              </DivStyledItem>
            </DivStyledContent>
          )) : <NotUpdate />}
        </DivStyledGrid>
      }
    />
  )
}

export default ListType