import React, { useEffect, useRef, useState } from 'react'

import PropTypes from 'prop-types'
import {
    PageWrapper,
    HeadingSection,
    SearchFormWrapper,
    SearchActionWrapper, GridViewWrapper,
} from '../../components/CommonStyled/CommonStyled'
import { inject, observer } from 'mobx-react'
import { Breadcrumb, Button, Row, Col, Input, Select, Space, Table, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet/es/Helmet'
import {
    PlusOutlined,
    SearchOutlined,
    DeleteOutlined,
    FileExcelOutlined,
    EyeOutlined,
    FormOutlined,
} from '@ant-design/icons'
import FloatingLabel from '../../components/FloatingLabel'
import PaginationComponent from '../../components/PaginationComponent'
import miscUtils from '../../utils/miscUtils'
import Barcodes from '../../components/Barcodes'
import { useMediaQuery } from 'react-responsive/src'
import PaginationLoadMore from '../../components/PaginationLoadMore';

const HomePage = props => {
    const {  metadataStore, homeStore } = props
    const { departments, warehouses, phongLookup } = metadataStore
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [filterData, setFilterData] = useState({})
    const [courses, setCourses] = useState([])
    const [pagination, setPagination] = useState({ skip: 1, take: 5 })
    const [dataSource, setDataSource] = useState([])
    const history = useHistory()
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 })
    const isMobile = useMediaQuery({ maxWidth: 767 })


    const columns = [
        {
            dataIndex: 'NumberOfRow',
            title: 'STT',
            width: 80,
            align: 'center',
        },
        {
            dataIndex: 'FileName',
            title: 'Tên hồ sơ',
            ellipsis: true,
            width: 150,
        },
        {
            dataIndex: 'Number',
            title: 'Số hiệu',
            width: 100,
        },
        {
            dataIndex: 'DepartmentId',
            title: 'Cơ quan ban hành',
            render: function renderColumn(text) {
                return miscUtils.getValueOfArrayByKey(text, 'DepartmentId', 'DepartmentName', departments)
            },
            ellipsis: true,
        },
        {
            dataIndex: 'PhongId',
            title: 'Phòng',
            render: function renderColumn(text) {
                return miscUtils.getValueOfArrayByKey(text, 'PhongId', 'PhongName', phongLookup)
            },
            ellipsis: true,
        },
        {
            dataIndex: 'CourseId',
            title: 'Khóa',
           

            ellipsis: true,
        },
        {
            dataIndex: 'DigitalSignatures',
            title: 'Mã vạch',
            render: function renderColumn(text, record) {
                return <Barcodes value={record.FileId} />
            },
            align: 'center',
        },
        {
            dataIndex: 'action',
            width: 60,
            render: function renderColumn(text, record) {
                return (
                  <Space>
                      <EyeOutlined onClick={() => {
                          history.push(`/lookup-files/${record.FileId}`)
                      }} />
                  </Space>
                )
            },
        },
    ]


    ////Change data input
    const onChangeInput = (value, name) => {
       
    }

    ////Change Event Table
    const onChangeTable = (pagination, filters, sorter, extra) => {
        if (extra.action === 'paginate') {
            setPagination({
                skip: pagination.current,
                take: pagination.pageSize,
            })
            const params = { ...filterData, ...{ skip: pagination.current, take: pagination.pageSize } }
        }
    }


    const onHandleSearch = () => {
        setPagination({ skip: 1, take: 5 })
    }

    const onHandleClear = () => {
        setPagination({ skip: 1, take: 5 })
        setFilterData({})
    }

    useEffect(()=> {
        homeStore.getCongNoTaiSan();
    },[])
  

 

    return (
      <React.Fragment>
          <Helmet><title>Tra cứu hồ sơ</title></Helmet>
          <PageWrapper isTablet={isTablet}>
              <Breadcrumb>

                  <Breadcrumb.Item>
                      <a onClick={() => history.push('/home')}>Trang chủ</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Tra cứu hồ sơ</Breadcrumb.Item>
              </Breadcrumb>

              <HeadingSection>
                  <div className={'heading-tilte'}>
                      Tra cứu hồ sơ
                  </div>
              </HeadingSection>
              <SearchFormWrapper>
                  <Row gutter={[16, 32]}>
                      <Col xs={24} xxl={12} xl={12} sm={24}>
                          <FloatingLabel label={'Tên hồ sơ'}>
                              <Input value={filterData['ContainsText']}
                                     onChange={(e) => onChangeInput(e.target.value, 'ContainsText')}
                              />
                          </FloatingLabel>
                      </Col>
                  </Row>
                  <Row gutter={[16, 32]}>
                      <Col xxl={6} xl={6} sm={12} xs={24}>
                          <FloatingLabel label={'Phòng'}>
                              <Select value={filterData['PhongId']}
                                      allowClear placeholder={'--All--'}
                                      onChange={(value) => onChangeInput(value, 'PhongId')}
                              >
                                  {phongLookup && phongLookup.map(item => (
                                    <Select.Option key={item['PhongId']} value={item['PhongId']}>{item['PhongName']}</Select.Option>
                                  ))
                                  }
                              </Select>
                          </FloatingLabel>
                      </Col>
                      <Col xxl={6} xl={6} sm={12} xs={24}>
                          <FloatingLabel label={'Khóa'}>
                              <Select value={filterData['CourseId']}
                                      placeholder={'--All--'}
                                      allowClear
                                      onChange={(value) => onChangeInput(value, 'CourseId')}>
                                  {courses && courses.map(item => (
                                    <Select.Option key={item['CourseId']} value={item['CourseId']}>{item['CourseName']}</Select.Option>
                                  ))}
                              </Select>
                          </FloatingLabel>
                      </Col>
                      <Col xxl={6} xl={6} sm={12} xs={24}>
                          <FloatingLabel label={'Cơ quan ban hành'}>
                              <Select value={filterData['DepartmentId']}
                                      allowClear
                                      placeholder={'--All--'}
                                      onChange={(value) => onChangeInput(value, 'DepartmentId')}>
                                  {departments && departments.map(item => (
                                    <Select.Option key={item['DepartmentId']}
                                                   value={item['DepartmentId']}>{item['DepartmentName']}</Select.Option>
                                  ))}
                              </Select>
                          </FloatingLabel>
                      </Col>
                      <Col xxl={6} xl={6} sm={12} xs={24}>
                          <FloatingLabel label={'Kho lưu trữ'}>
                              <Select value={filterData['WareHouseId']}
                                      allowClear
                                      placeholder={'--All--'}
                                      onChange={(value) => onChangeInput(value, 'WareHouseId')}>
                                  {warehouses && warehouses.map(item => (
                                    <Select.Option key={item['WareHouseId']}
                                                   value={item['WareHouseId']}>{item['WareHousePosition']}</Select.Option>
                                  ))}
                              </Select>
                          </FloatingLabel>
                      </Col>
                  </Row>
                  <SearchActionWrapper>
                      <Space>
                          <Button type='primary' onClick={onHandleSearch} icon={<SearchOutlined />}>Tìm kiếm</Button>
                          <Button type={'default'} onClick={onHandleClear}>Làm mới</Button>
                      </Space>
                  </SearchActionWrapper>
              </SearchFormWrapper>
              <GridViewWrapper>
                  <HeadingSection>
                      <div className={'heading-tilte'}>
                          Danh sách kết quả
                      </div>
                  </HeadingSection>
                  <Table rowKey={(record) => record.FileId}
                         dataSource={dataSource}
                         columns={columns}
                         pagination={false}
                         scroll={isMobile || isTablet ?{ x: 1260 }:{x:false}}
                         onChange={onChangeTable}
                        //  footer={() => <PaginationLoadMore pageSize={20}  />}
                  />
              </GridViewWrapper>
          </PageWrapper>
      </React.Fragment>
    )
}

HomePage.propTypes = {
    commonStore: PropTypes.object,
}

export default inject(
  'metadataStore', 'homeStore',
)(observer(HomePage))
