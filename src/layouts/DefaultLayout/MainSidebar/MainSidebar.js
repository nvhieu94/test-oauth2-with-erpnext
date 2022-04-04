import React, { useEffect, useState } from 'react'
import {
  LogoWrapper,
  MainMenu,
  Scroller,
  SidebarWrapper,
} from './MainSidebarStyled'
import { useHistory, useLocation } from 'react-router-dom'
import { Menu, message } from 'antd'
import { HomeOutlined, FileDoneOutlined, FileTextOutlined, FolderOpenOutlined } from '@ant-design/icons'
import {AppstoreOutlined} from '@ant-design/icons'
import { inject, observer } from 'mobx-react'

const MainSidebar = props => {
  const { commonStore, menuStore } = props
  const { appTheme } = commonStore
  const { menuList } = menuStore

  const history = useHistory()
  const location = useLocation()
  const [menuKey, setMenuKey] = useState('my-files')
  const [menus, setMenus] = useState([])


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



  const renderMenu = (item) => {
    return item && item.map((item, index) => {
      if (item.children.length > 0) {
        return (
          <Menu.SubMenu key={`view-table/${item.ID}`} title={item.DisplayName}>
            {renderMenu(item.children)}
          </Menu.SubMenu>
        )
      } else {
        return (<Menu.Item key={`view-table/${item.ID}`}>{item.DisplayName}</Menu.Item>)
      }
    })
  }



  return (
    <SidebarWrapper
      toggle={commonStore.compactSidebar}>
      <Scroller>
        <MainMenu theme={appTheme}>
          <Menu mode='inline' className='side-bar-left' onClick={handleNavigate} selectedKeys={menuKey}>
          <Menu.SubMenu icon={<AppstoreOutlined />}  key="sub1" title="Kế toán">
            <Menu.Item key={'home'}>
      
              <span>Hóa đơn bán hàng</span>
            </Menu.Item>
            <Menu.Item key={'home'}>
          
              <span>Hóa đơn mua hàng</span>
            </Menu.Item>
            <Menu.Item key={'home'}>
          
              <span>Công nợ bình</span>
            </Menu.Item>
            <Menu.Item key={'home'}>
            
              <span>Công nợ tiền</span>
            </Menu.Item>
            <Menu.Item key={'home'}>
        
              <span>Đơn giá mua bán</span>
            </Menu.Item>
            <Menu.Item key={'home'}>
       
              <span>Nhà cung cấp/Khách hàng</span>
            </Menu.Item>
          </Menu.SubMenu >
          <Menu.SubMenu icon={<AppstoreOutlined />}  key="sub1" title="Kho">
            <Menu.Item key={'lookup-files'}>
              <span>Bảng thống kế kho</span>
            </Menu.Item>
            <Menu.Item key={'lookup-files'}>
              <span>Biên bản kiểm kho</span>
            </Menu.Item>
            <Menu.Item key={'lookup-files'}>
              <span>Đơn nhập kho</span>
            </Menu.Item>
            <Menu.Item key={'lookup-files'}>
              <span>Quản lý nhân viên kho 1/2</span>
            </Menu.Item>
            <Menu.Item key={'lookup-files'}>
              <span>Quy chuẩn thông tin tài sản</span>
            </Menu.Item>
            <Menu.Item key={'lookup-files'}>
              <span>Danh sách kho</span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu icon={<AppstoreOutlined />}  key="sub1" title="Quản lý sản xuất">
            <Menu.Item key={'lookup-documents'}>
              <span>Báo cáo sản xuất</span>
            </Menu.Item>
            <Menu.Item key={'lookup-documents'}>
              <span>Lịch sử sản xuất</span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu icon={<AppstoreOutlined />}  key="sub1" title="Giao vận">
            <Menu.Item key={'borrow-return-documents'}>
              <span>Quản lý biển số xe</span>
            </Menu.Item>
              <Menu.Item key={'borrow-return-documents'}>
              <span>Quản lý giao việc</span>
            </Menu.Item>
          </Menu.SubMenu>
           
            <Menu.SubMenu icon={<AppstoreOutlined />}   key={'customer'} title="Khách hàng">
            <Menu.Item key={'borrow-return-documents'}>
              <span>Báo cáo nhầm lẫn</span>
            </Menu.Item>
            <Menu.Item key={'borrow-return-documents'}>
              <span>Đơn báo bình lỗi</span>
            </Menu.Item>
              <Menu.Item key={'borrow-return-documents'}>
                <span>Dánh giá của khách hàng</span>
              </Menu.Item>
              </Menu.SubMenu>
            <Menu.Item key={'report'}>
              <FileDoneOutlined />
              <span>Báo cáo</span>
            </Menu.Item>
            <Menu.SubMenu icon={<AppstoreOutlined />}   key={'setting'} title="Cấu hình">
              <Menu.Item key={'borrow-return-documents'}>
                <span>Nguyên vật liệu sản xuấ</span>
              </Menu.Item>
              <Menu.Item key={'units'}>
                <span>Units</span>
              </Menu.Item>
            </Menu.SubMenu>

          </Menu>
        </MainMenu>
      </Scroller>
    </SidebarWrapper>
  )
}


MainSidebar.propTypes = {}

export default inject(
  'commonStore',
  'menuStore',
)(observer(MainSidebar))
