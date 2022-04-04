import React, { useEffect, useRef, useState } from 'react'

import PropTypes from 'prop-types'
import {
  PageWrapper,
  HeadingSection,
  SearchFormWrapper,
  SearchActionWrapper, GridViewWrapper,
  TextWrapper
} from '../../components/CommonStyled/CommonStyled'
import { inject, observer } from 'mobx-react'
import { Breadcrumb, Button, Row, Col, Input, Select, Space, Table, message, DatePicker } from 'antd'
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
import moment from 'moment'
import Barcodes from '../../components/Barcodes'
import { useMediaQuery } from 'react-responsive/src'

const LookupDocumentsPage = (props) => {
  const { commonStore, lookupDocumentsStore, metadataStore, lookupFilesStore } = props
  const { departments, warehouses, phongLookup, documentCategories } = metadataStore

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [filterData, setFilterData] = useState({})
  const [filterDate, setFilterDate] = useState({})
  const [searchText, setSearchText] = useState('')
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
      dataIndex: 'TextNumber',
      title: 'Số ký hiệu',
      width: 180,
      render: function renderColumn(text, record) {
        return <a onClick={() => history.push(`/lookup-documents/${record.DocFileId}`)}><TextWrapper>{text}</TextWrapper></a>
      },
    },
    {
      dataIndex: 'DocFileName',
      title: 'Trích yếu',
      render: function renderColumn(text) {
        return <TextWrapper>{text}</TextWrapper>
      },
      width: 180,
    },
    {
      dataIndex: 'DepartmentId',
      title: 'Cơ quan ban hành',
      ellipsis: true,
      render: function renderColumn(text) {
        return <TextWrapper>{miscUtils.getValueOfArrayByKey(text, 'DepartmentId', 'DepartmentName', departments)}</TextWrapper>
      },
      width: 180,
    },

    {
      dataIndex: 'CourseId',
      title: 'Khóa',
      render: function renderColumn(text, record) {
        return getCourseById(text, record.PhongId)
      },
      width: 150,
    },
    {
      dataIndex: 'DocumentCategoryId',
      title: 'Thể loại',
      render: function renderColumn(text) {
        return miscUtils.getValueOfArrayByKey(text, 'MasterDataId', 'MasterDataName', documentCategories)
      },
      width: 150,
    },
    {
      dataIndex: 'ProblemGroup',
      title: 'Nhóm vấn đề',
      width: 150,
    },
    {
      dataIndex: 'ReleaseDate',
      title: 'Ngày phát hành',
      width: 150,
      render: function renderColumn(text, record) {
        return text ? moment(text).format('DD/MM/YYYY') : null
      },
    },
    {
      dataIndex: 'DigitalSignatures',
      title: 'Mã vạch',
      render: function renderColumn(text, record) {
        return <Barcodes value={record.DocFileId} />
      },
      width: 150,
    },
    {
      dataIndex: 'action',
      width: 60,
      render: function renderColumn(text, record) {
        return (
          <Space>
            <EyeOutlined onClick={() => {
              history.push(`/lookup-documents/${record.DocFileId}`)
            }} />
          </Space>
        )
      },
    },
  ]

  const getCourseById = (id, phongId) => {
    let courseName = null
    let findPhong = phongLookup.find(item => item.PhongId === phongId)
    if (findPhong && findPhong.Courses) {
      let course = findPhong.Courses.find(a => a.CourseId === id)
      if (course) courseName = course.CourseName
    }
    return courseName
  }

  const onHandleSearch = () => {
    setPagination({ skip: 1, take: 5 })
    let params = {
      'Take': 5,
      'Skip': 0,
      'EqualityFilter': filterData,
      'ContainsText': searchText,
    }
    if (formatFilterDate()) {
      params.Criteria = formatFilterDate()
    }
    getDocuments(params)
  }

  const formatFilterDate = () => {
    if (filterDate.StartTime && filterDate.EndTime) {
      return [[['ReleaseDate'], '>=', moment(filterDate.StartTime).format('YYYY-MM-DD')], 'and', [['ReleaseDate'], '<', moment(filterDate.EndTime).format('YYYY-MM-DD')]]
    } else if (filterDate.StartTime) {
      return [['ReleaseDate'], '>=', moment(filterDate.StartTime).format('YYYY-MM-DD')]
    } else if (filterDate.EndTime) {
      return [['ReleaseDate'], '<', moment(filterDate.EndTime).format('YYYY-MM-DD')]
    } else return undefined
  }
  const onHandleClear = () => {
    setPagination({ skip: 1, take: 5 })
    setFilterData({})
    setFilterDate({})
    setSearchText('')
    let params = {
      'Take': 5,
      'Skip': 0,
      'EqualityFilter': {},
      'ContainsText': '',
    }
    getDocuments(params)
  }

  const onChangePage = (pageSetting) => {
    setPagination({
      skip: pageSetting.current,
      take: pageSetting.pageSize,
    })
    let params = {
      'Take': pageSetting.pageSize,
      'Skip': pageSetting.current - 1,
      'EqualityFilter': filterData,
      'ContainsText': searchText,
    }
    if (formatFilterDate()) {
      params.Criteria = formatFilterDate()
    }
    getDocuments(params)
  }
  ////Change data input
  const onChangeInput = (value, name) => {
    if (name === 'PhongId') {
      setFilterData({
        ...filterData,
        [name]: value,
        ['CourseId']: null,
      })
    } else {
      setFilterData({
        ...filterData,
        [name]: value,
      })
    }
  }

  const onChangeDate = (value, name) => {
    setFilterDate({
      ...filterDate,
      [name]: value,
    })
  }

  const getDocuments = (params) => {
    lookupDocumentsStore.getDocuments(params).then(res => {
    }).catch(error => {
      message.error(error.message)
    })
  }

  ////Get courseList by phông
  useEffect(() => {
    let list = []
    let findPhong = phongLookup.find(item => item.PhongId === filterData.PhongId)
    if (findPhong) setCourses(findPhong.Courses)
    else setCourses([])
  }, [filterData.PhongId])

  ////Get default documnet
  useEffect(() => {
    let params = {
      'Take': pagination.take,
      'Skip': pagination.skip - 1,
      'EqualityFilter': filterData,
      'ContainsText': searchText,
    }
    if (formatFilterDate()) {
      params.Criteria = formatFilterDate()
    }
    getDocuments(params)
  }, [])

  ///format dataSource
  useEffect(() => {
    let data = []
    if (lookupDocumentsStore.documents && lookupDocumentsStore.documents.Entities) {
      data = lookupDocumentsStore.documents.Entities.map((item, index) => {
        item.NumberOfRow = index
        return item
      })
      setDataSource(data)
    }
  }, [lookupDocumentsStore.documents])

  return (
    <React.Fragment>
      <Helmet><title>Tra cứu tài liệu</title></Helmet>
      <PageWrapper>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a onClick={() => history.push('/home')}>Trang chủ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Tra cứu tài liệu</Breadcrumb.Item>
        </Breadcrumb>
        <HeadingSection>
          <div className={'heading-tilte'}>
            Tra cứu tài liệu
          </div>
        </HeadingSection>
        <SearchFormWrapper>
          <Row gutter={[16, 32]}>
            <Col xs={24} xxl={12} xl={12} sm={24}>
              <FloatingLabel label={'Từ khóa'}>
                <Input value={filterData['ContainsText']}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </FloatingLabel>
            </Col>
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
              <FloatingLabel label={'Ngày hiệu lực/ Ngày ban hành từ'}>
                <DatePicker value={filterData['StartTime'] || undefined}
                  format={'DD/MM/YYYY'}
                  placeholder={'Từ ngày'}
                  onChange={(date) => {
                    onChangeDate(date, 'StartTime')
                  }} />
              </FloatingLabel>
            </Col>
            <Col xxl={6} xl={6} sm={12} xs={24}>
              <FloatingLabel label={'Ngày hiệu lực/ Ngày ban hành đến'}>
                <DatePicker value={filterData['EndTime'] || undefined}
                  placeholder={'Đến ngày'}
                  format={'DD/MM/YYYY'}
                  onChange={(date) => {
                    onChangeDate(date, 'EndTime')
                  }} />
              </FloatingLabel>
            </Col>

            <Col xs={24} xxl={12} xl={12} sm={24}>
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
          <Table rowKey={(record) => record.DocFileId}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
                 scroll={isMobile || isTablet ?{ x: 1260 }:{x:false}}
          />
          <PaginationComponent onChangePage={onChangePage}
            total={lookupDocumentsStore.documents?.TotalCount || 0}
            current={pagination.skip}
            pageSize={pagination.take} />
        </GridViewWrapper>
      </PageWrapper>
    </React.Fragment>
  )
}

export default inject(
  'commonStore',
  'authenticationStore',
  'metadataStore',
  'lookupDocumentsStore',
)(observer(LookupDocumentsPage))