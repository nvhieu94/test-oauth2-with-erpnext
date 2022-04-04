import styled from 'styled-components'
import { Drawer } from 'antd'
import { Link } from 'react-router-dom'

export const MobileMenuWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background-color: #fff;
  border-bottom: 1px solid #E2E2E2;
  background-color: #1f588c;
  z-index: 1000;
  padding: 0 15px;
  
  .menu-toggle {
    cursor: pointer;
    font-size: 24px;
    color:#fff;
  }

  .page-name {
    margin-right: auto;
    font-size: 20px;
    font-weight: 500;
    color: #313131;
    margin-bottom: 0;
    margin-left: 15px;
    line-height: 1;
  }

  .ant-drawer-body {
    padding: 0;
  }
`
export const UserInfoWrapper =styled.div`
  display: flex;
  position: fixed;
  right: 5px;
`
export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
   color:  ${props => props.theme.solidColor} !important;
  p {
    margin-bottom: 0;
    margin-right: 8px;
    color:  ${props => props.theme.solidColor} !important;
  }
  .svg {
    color:  ${props => props.theme.solidColor} !important;
  }
`

export const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 8px;
`
export const NotificationMenu = styled.div`
  // margin-left: 20px;
  cursor: pointer;
  .anticon{
    font-size: 2rem;
    color: #fff;
  }
  .ant-badge{
    margin: 10px;
  }
  .ant-badge-count {
    padding: 0;
    font-size: 10px;
    
  }
`

export const DrawerWrapper = styled(Drawer)`
  z-index: 9999;
`
export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .copyright {
    margin-top: 20px;
    padding: 0 20px;
    margin-bottom: 0;
  }
`
export const LogoWrapper = styled(Link)`
  text-align: center;
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #1f588c;
  .logo{
    width: 40px;
  }
  .logo-text{
    width: 180px;
  }
`
export const MainMenu = styled.div`
  //padding: 0 0px 0 8px;
  margin-bottom: 15px;
  .ant-menu {
    border-right: none;
    .ant-menu-item {
      //border-radius: px;
      overflow: visible;
      //margin: 0;
      height: 35px;
      line-height: 38px;
      padding-left: 42px !important;
      margin-bottom: 5px;
      &:after {
        width: 3px;
        height: 35px;
        right: auto;
        left: 0px;
        top: 50%;
        transform: translateY(-50%);
        //border-radius: 0 100px 100px 0;
      }
     .anticon {
        position: absolute;
        left: 11px;
        top: 50%;
        transform: translateY(-50%);
      }
      &.ant-menu-item-selected, &.ant-menu-item-active {
      .anticon {
          filter: invert(60%) sepia(57%) saturate(6224%) hue-rotate(191deg) brightness(86%) contrast(91%);
        }
      }
    }
    &:not(.ant-menu-horizontal) {
      .ant-menu-item-selected {
        background-color: #f5f5f5 !important;
        color: #237BD3;
      }
    }
  }
`