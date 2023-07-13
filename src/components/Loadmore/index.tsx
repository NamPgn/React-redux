import React, { useContext, useState } from 'react'
import { ChangeContext } from '../../context';
import { Loader } from '../Message/Loading';
import { useSWRWithAxios } from '../../hook/Swr';
import { urlSwr } from '../../function';
import PaginationCustoms from '../Pagination/'
import CategoryContents from '../Content/Category';
export default function Index() {
  const [page, setPage] = useState(1);
  const { data: category, isLoading } = useSWRWithAxios(urlSwr + `/categorys?page=${page}`);
  const { state } = useContext(ChangeContext);
  if (isLoading) return <Loader />
  return (
    <>
      <div className={state ? 'pb-16 w-11/12' : 'pb-16 w-10/12'}>
        <div className="flex justify-center items-center">
          <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0">
            <div className="flex flex-col jusitfy-center items-center">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800 mb-[200px]">Danh mục</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-4 md:gap-8">
                {
                  category ? category.map((item: any, index: number) => (
                    <CategoryContents
                      title={item.name}
                      link={'/q/' + item._id + `?n=${item.name}`}
                      image={item.linkImg}
                      time='Thời gian 20/12 phút'
                      sumSeri={item.sumSeri}
                    />
                  )) : ''
                }
              </div>
            </div>
          </div>
        </div>
        <PaginationCustoms
          className='text-center'
          currentPage={page}
          defaultCurrent={1}
          totalItems={20}
          pageSize={10}
          onChange={(value) => setPage(value)}
        />
      </div>
    </>
  );
}
