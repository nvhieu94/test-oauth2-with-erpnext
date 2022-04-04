import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const SidebarWrapper = styled.aside`
  position: fixed;
  height: 100vh;
  background-color: #fff;
  top: 64px;
  left: 0;
  width: ${props => props.toggle ? 50 : 250}px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #d9d9d9;
`

export const LogoWrapper = styled(Link)`
  width: 158px;
  display: block;
  margin: 8px auto 18px;

  img {
    width: 100%;
  }

  span {
    width: 100%;
    font-weight: 800;
    font-size: 24px;
  }
`

export const BottomMenu = styled.div`
  margin-top: auto;

  ul {
    margin: 0 20px 0;
    padding: 15px 0 5px;

    li {
      margin-bottom: 15px;

      a {
        font-size: 14px;
        color: #313131;
        line-height: 20px;
        transition: ease .3s;

        &:hover {
          color: #237BD3;
          transition: ease .3s;
        }
      }
    }
  }
`

export const Copyright = styled.p`
  padding: 0 20px 30px;
  color: #858A8F;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 0;
`

export const ActionButtonWrapper = styled.div`
  padding: 0 20px;
  margin-bottom: 24px;

  .ant-btn {
    font-size: 14px;
    height: 50px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    border-radius: 8px;

    .anticon {
      font-size: 20px;
    }
  }
`

export const MainMenu = styled.div`
  padding: 0 0px 0 8px;
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

export const HorizontalLine = styled.hr`
  display: block;
  width: calc(100% - 32px);
  margin-left: auto;
  margin-right: auto;
  height: 1px;
  border: none;
  background-color: #E5E9F2;
`

export const Capacity = styled.div`
  padding: 18px 16px;

  .ant-progress {
    margin-top: 5px;
    margin-bottom: 10px;

    .ant-progress-inner {
      background-color: #E2E2E2;
    }
  }

  strong {
    color: #000;
    font-size: 14px;
    padding-left: 12px;
    position: relative;
  }

  p {
    color: #313131;
    font-size: 12px;
    line-height: 20px;
  }

  .ant-btn {
    background-color: rgba(35, 123, 211, 0.1);
    color: #237BD3;
    border: none;
    width: 122px;
    height: 36px;
    line-height: 36px;
    padding: 0;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`

export const Scroller = styled.div`
  height: 100%;
  overflow-y: auto;
`

export const ActionMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
`
export const ActionMenuIcon = styled.div`
  margin-right: 8px;
`
export const ActionMenuText = styled.span`
  font-size: 1.4rem;
  color: #313131;
`
