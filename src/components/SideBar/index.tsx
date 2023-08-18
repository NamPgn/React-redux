import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AreaChartOutlined, BarChartOutlined, BlockOutlined, DoubleLeftOutlined, DoubleRightOutlined, FundOutlined, HomeOutlined, RiseOutlined, SearchOutlined } from '@ant-design/icons';
import { ChangeContext, MyContext } from '../../context';
import { DivStyled, DivStyledRouter, DivStyledSearchBarStyle, DivStyledTitle, DivstySideBar, DivstyledContent, Icon, RouterIcon, RouterLink, RouterText, SibarImage, SideBarText, Text, Title } from './styles';
import { Spiner } from '../Message/Loading';
const Icons = [
  <HomeOutlined />,
  <BlockOutlined />,
  <AreaChartOutlined />,
  <RiseOutlined />,
  <BarChartOutlined />,
  <FundOutlined />,
]
const SideBar = () => {
  const { seri, loadingSeri }: any = useContext(MyContext) || {};
  const { state, handleClick } = useContext(ChangeContext) || {};
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
          <Icon onClick={handleClick} style={{ cursor: "pointer " }}>
            {state ? <DoubleRightOutlined /> : <DoubleLeftOutlined className='ml-4 text-white' />}
          </Icon>
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
          </RouterLink> : <Spiner delay={0.5} size='large' spinning={undefined} />}
        </DivStyled>

      </DivstyledContent>
    </DivstySideBar >
  )
}

export default SideBar