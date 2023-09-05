import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { ChangeContext, MyContext } from '../../context';
import { DivStyled, DivStyledRouter, DivStyledSearchBarStyle, DivStyledTitle, DivstySideBar, DivstyledContent, RouterIcon, RouterLink, RouterText, SibarImage, SideBarText, Text, Title } from './styles';
import { Spiner } from '../Message/Loading';
import { Icons } from '../../constant';

const SideBar = () => {
  const { seri, loadingSeri }: any = useContext(MyContext) || {};
  const { state } = useContext(ChangeContext) || {};
  return (
    <DivstySideBar className={state ? 'w-1/12' : 'w-2/12'} >
      <DivstyledContent className={state ? 'w-1/12' : 'w-2/12'} >
        <DivStyledTitle>
          <Link to={'/'} style={{ display: 'contents' }}>
            <SibarImage src='/img/zyro-image.png' />
          </Link>
          <SideBarText className={state ? 'hiddenn' : 'block text-white'}>
            <Link to={'/'}>
              <Title>
                Hhtrungquoc.tv
              </Title>
            </Link>
            <Link to={'/'}>
              <Text>
                tromphim.netify.app
              </Text>
            </Link>
          </SideBarText>
        </DivStyledTitle>
        <DivStyled>
          {state ? <SearchOutlined className='w-full' style={{
            textAlign: "center",
            padding: "10px 15px",
            margin: "25px 0 0 0"
          }} /> : <DivStyledSearchBarStyle placeholder='Search...' />}

          {!loadingSeri ? <RouterLink className='sideBarActive'>
            {seri && (seri.map((item: any, index: any) => (
              <NavLink
                to={item.path == '/' ? item.path : item.path + '/' + `${item._id}`}
                key={index}
              >
                <DivStyledRouter state={state}>
                  <RouterIcon>{Icons[index]}</RouterIcon>
                  <RouterText className={state ? 'hiddenn' : 'block'}>{item.name}</RouterText>
                </DivStyledRouter>
              </NavLink>
            )))}
          </RouterLink> : <Spiner delay={0.5} size='large' children={undefined} spinning={undefined} />}
        </DivStyled>

      </DivstyledContent>
    </DivstySideBar >
  )
}

export default SideBar