// import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import {
  DrawerWrapper,
  MobileMenuWrapper,
  MainMenu,
  LogoWrapper,
  DrawerContent,
  UserInfoWrapper,
  AvatarWrapper,
  NotificationMenu,
  UserMenu,
} from './MobileMenuDrawerStyled'
import {
  BellOutlined,
  CaretDownOutlined,
  EllipsisOutlined, FileDoneOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  HomeOutlined, LogoutOutlined,
  MenuOutlined, UserOutlined,

} from '@ant-design/icons'
import { inject, observer } from 'mobx-react'

import {  useHistory, useLocation } from 'react-router-dom'

import { Badge, Dropdown, Menu, Tooltip } from 'antd'


const MobileMenuDrawer = props => {

  const { commonStore,authenticationStore } = props
  const { appTheme } = commonStore
  const { currentUser } = authenticationStore
  const history = useHistory()
  const location = useLocation()
  const [menuKey, setMenuKey] = useState('my-files')



  const handleNavigate = menu => {
    if (menu.key === '/') {
      history.push(`/`)
      setMenuKey(menu.key)
    } else {
      history.push(`/${menu.key}`)
      setMenuKey(menu.key)
    }

  }

  useEffect(() => {
    const segment = location.pathname.split('/').filter(item => item !== '')
    setMenuKey(segment[0] || '/')
  }, [location.pathname])

    const onCloseDrawer=()=>{
      commonStore.toggleSidebar(false)
    }
  const handleLogout = () => {
    authenticationStore.userLogout()
      .then(() => history.push('/'))
  }


  const menu = (
    <Menu>
      <Menu.Item>
        <UserOutlined />Profile
      </Menu.Item>
      <Menu.Item danger onClick={handleLogout}>
        <LogoutOutlined />Logout
      </Menu.Item>
    </Menu>
  )
  return (
    <MobileMenuWrapper id={'mobile-drawer'}>
      <MenuOutlined
        className={'menu-toggle'}
       onClick={() =>  commonStore.toggleSidebar(true)}
      />
      <UserInfoWrapper>
        <NotificationMenu>
          <Tooltip title={'Thông báo'}>
            <Badge count={0} showZero>
              <BellOutlined />
            </Badge>
          </Tooltip>
        </NotificationMenu>
        <Dropdown overlay={menu} trigger={['click']}>
          <UserMenu theme={appTheme}>
            <AvatarWrapper>
              <img src={`${window.location.origin}/assets/imgs/default-avatar.jpg` || currentUser?.Avatar}
                   alt='' />
            </AvatarWrapper>
            <p>{currentUser?.FullName}</p>
          </UserMenu>
        </Dropdown>
      </UserInfoWrapper>
      <DrawerWrapper
        getContainer={() => document.getElementById('mobile-drawer')}
        placement={'left'}
        closable={false}
        onClose={onCloseDrawer}
        visible={commonStore.compactSidebar}>

          <LogoWrapper>
            <img className={"logo"} src={`${window.location.origin}/assets/imgs/logo-inverse.png`} />
            <img className={"logo-text"} src={`${window.location.origin}/assets/imgs/logo-text.png`} />
          </LogoWrapper>

          <MainMenu theme={appTheme}>
            <Menu mode='inline' className='side-bar-left' onClick={handleNavigate} selectedKeys={menuKey}>
              <Menu.Item key={'home'}>
                <HomeOutlined />
                <span>Trang chủ</span>
              </Menu.Item>
              <Menu.Item key={'lookup-files'}>
                <FolderOpenOutlined />
                <span>Tra cứu hồ sơ</span>
              </Menu.Item>
              <Menu.Item key={'lookup-documents'}>
                <FileTextOutlined />
                <span>Tra cứu tài liệu</span>
              </Menu.Item>
              <Menu.Item key={'borrow-return-documents'}>
                <FileDoneOutlined />
                <span>Mượn trả tài liệu</span>
              </Menu.Item>
            </Menu>
          </MainMenu>

      </DrawerWrapper>

    </MobileMenuWrapper>
  )
}

MobileMenuDrawer.propTypes = {}

export default inject(
  'commonStore','authenticationStore'
)(observer(MobileMenuDrawer))