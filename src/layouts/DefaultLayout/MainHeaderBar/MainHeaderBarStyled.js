import styled from 'styled-components'
import { Divider } from 'antd'

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  height: 64px;
  width: 100%;
  background-color: #1f588c;
  box-shadow: inset 0px -1px 0px #E2E2EA;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 5px 0 0;
  z-index: 10;
`
export const SearchBarWrapper = styled.div`
  background-color: #F9FAFC;
  border: 1px solid #F1F1F5;
  height: 50px;
  width: 550px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-radius: 8px;
  margin-right: auto;

  .ant-input-affix-wrapper {
    border: none;
    background-color: transparent;
    padding: 0 20px;

    &.ant-input-affix-wrapper-focused {
      box-shadow: none;
      outline: none;
    }

    .ant-input-suffix {
      display: none;
    }

    .ant-input {
      background-color: transparent;
    }
  }
`
export const PageNameWrapper = styled.div`
  height: 50px;
  width: 550px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-right: auto;
`
export const LogoWrapper =styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //padding: 0 20px;
  margin-right: auto;
  .logo{
    width: 40px;
  }
  .logo-text{
    height: 50px;
  }
`
export const ToggleWrapper =styled.div`
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  .anticon{
    font-size: 2rem;
    color: #fff;
  }
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
  .ant-badge-count {
    //width: 22px;
    //height: 22px;
    padding: 0;
    font-size: 10px;
    //border: 2px solid white;
    
  }
`
export const LanguageWrapper = styled.div`
  cursor: pointer;
  p {
    margin-bottom: 0.2em;
    font-weight:700;
    color:  ${props => props.theme.solidColor} !important;
  }
`


