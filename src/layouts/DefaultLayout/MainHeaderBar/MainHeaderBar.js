import React, { useState } from 'react'
import {
    AvatarWrapper,
    HeaderWrapper,
    NotificationMenu,
    UserMenu,
    LogoWrapper,
    ToggleWrapper
} from './MainHeaderBarStyled'
import { Badge, Dropdown, Menu, Tooltip } from 'antd'
import { useHistory, } from 'react-router-dom'
import { LogoutOutlined, UserOutlined, MenuOutlined, BellOutlined,CloseOutlined } from '@ant-design/icons'
import { inject, observer } from 'mobx-react'


const MainHeaderBar = props => {

    const { authenticationStore, commonStore } = props
    const { appTheme, compactSidebar } = commonStore;
    const { currentUser } = authenticationStore
    const history = useHistory()


    const handleLogout = () => {
        authenticationStore.userLogout()
            .then(() => history.push('/auth/login'))
    }
    const handleToggleSide = () => {
        commonStore.toggleSidebar(true)
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
        <HeaderWrapper>
            <ToggleWrapper>
              {compactSidebar?<CloseOutlined onClick={()=> commonStore.toggleSidebar(false)} />: <MenuOutlined onClick={handleToggleSide} /> }
            </ToggleWrapper>
            <LogoWrapper>
                <img className={"logo"} src={`${window.location.origin}/assets/imgs/logo-inverse.png`} />
                <img className={"logo-text"} src={`${window.location.origin}/assets/imgs/logo-text.png`} />
            </LogoWrapper>
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
        </HeaderWrapper>
    )
}

MainHeaderBar.propTypes = {}

export default inject(
    'authenticationStore',
    'commonStore'
)(observer(MainHeaderBar))
