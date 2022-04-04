import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import {
  PageWrapper,
  HeadingSection,
  SearchFormWrapper,
  SearchActionWrapper, GridViewWrapper,
} from '../../components/CommonStyled/CommonStyled'
import { inject, observer } from 'mobx-react'
import { Breadcrumb, Button, Row, Col, Input, Select, Space, Table, message, DatePicker, Modal } from 'antd'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet/es/Helmet'
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  FileExcelOutlined,
  EyeOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import FloatingLabel from '../../components/FloatingLabel'
import PaginationComponent from '../../components/PaginationComponent'
import moment from 'moment'
import FileDownload from 'js-file-download'
import { useMediaQuery } from 'react-responsive/src'

const { confirm } = Modal

const BorrowAndReturnPage = props => {
  const { commonStore, metadataStore, borrowAndReturnFilesStore } = props
  const { phongLookup } = metadataStore
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
      width: '10%',
      align: 'center',
    },
    {
      dataIndex: 'Renter',
      title: 'Tên người mượn',
      ellipsis: true,
      width: '20%',
    },
    {
      dataIndex: 'Status',
      title: 'Trạng thái mượn',
      ellipsis: true,
      width: '15%',
      render: function renderColumn(text, record) {
        if (record.Status === 1)
          return (
            <span style={{ color: '#0C69BE' }}>Đang mượn</span>
          )
        return (
          <span style={{ color: '#219653' }}>Đã trả</span>
        )
      },
    },
    {
      dataIndex: 'DocFiles',
      title: 'Danh sách tài liệu',
      ellipsis: true,
      width: '20%',
      render: function renderColumn(text, record) {
        let list = JSON.parse(record.StringDocumentValue)
        let docFiles = []
        if (list) {
          list.forEach(element => {
            docFiles.push(element.docFileName)
          })
        }

        return (
          <span>{docFiles.join(', ')}</span>
        )
      },
    },
    {
      dataIndex: 'EmailStatus',
      title: 'Đã gửi mail',
      ellipsis: true,
      width: '10%',
      render: function renderColumn(text, record) {
        if (record.EmailStatus === 1)
          return (
            <span style={{ color: '#0C69BE' }}>Đã gửi mail</span>
          )
        return (
          <span style={{ color: '#F39738' }}>Chưa gửi mail</span>
        )
      },
    },
    {
      dataIndex: 'RentalDate',
      title: 'Ngày mượn',
      ellipsis: true,
      width: '10%',
      render: function renderColumn(text, record) {
        let date = moment(record.RentalDate)
        return (
          <span>{date.format('DD-MM-yyyy')}</span>
        )
      },
    },
    {
      dataIndex: 'ReturnDate',
      title: 'Ngày trả',
      ellipsis: true,
      width: '10%',
      render: function renderColumn(text, record) {
        let date = moment(record.ReturnDate)
        return (
          <span>{date.format('DD-MM-yyyy')}</span>
        )
      },
    },
    {
      dataIndex: 'action',
      width: '10%',
      render: function renderColumn(text, record) {
        return (
          <Space>
            <EyeOutlined onClick={() => {
              history.push(`/borrow-return-documents/${record.CallCardId}`)
            }} />
            <EditOutlined onClick={() => {
              history.push(`/borrow-return-documents/${record.CallCardId}`)
            }} />
            <DeleteOutlined onClick={() => handleDeleteItem(record)} />
          </Space>
        )
      },
    },
  ]

  ////Config pagination
  const paginationConfig = {
    total: borrowAndReturnFilesStore.files.TotalCount,
    showSizeChanger: true,
    // showQuickJumper: true,
    current: pagination.skip,
    pageSize: pagination.take,
    position: ['bottomRight'],
    //showTotal: total => `Total ${total} items`,
    pageSizeOptions: ['5', '10', '20', '50', '100'],

  }
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
      setSelectedRows(selectedRows)
    },
    selectedRows: selectedRows,
    setSelectedRowKeys: selectedRowKeys,
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

  const formatFilterDate = () => {

    if (filterDate.RentalStartDate && filterDate.RentalEndDate && filterDate.ReturnStartDate && filterDate.ReturnEndDate) {
      return [[[[['RentalDate'], '>=', moment(filterDate.RentalStartDate).format('YYYY-MM-DD')], 'and',
        [['RentalDate'], '<', moment(filterDate.RentalEndDate).format('YYYY-MM-DD')]], 'and', [['ReturnDate'], '>=', moment(filterDate.ReturnStartDate).format('YYYY-MM-DD')]]
        , 'and',
        [['ReturnDate'], '<', moment(filterDate.ReturnEndDate).format('YYYY-MM-DD')],
      ]
    } else if (filterDate.RentalStartDate && filterDate.RentalEndDate && filterDate.ReturnStartDate) {
      return [[[['RentalDate'], '>=', moment(filterDate.RentalStartDate).format('YYYY-MM-DD')], 'and',
        [['RentalDate'], '<', moment(filterDate.RentalEndDate).format('YYYY-MM-DD')]], 'and',
        [['ReturnDate'], '>=', moment(filterDate.ReturnStartDate).format('YYYY-MM-DD')]]
    } else if (filterDate.RentalStartDate && filterDate.RentalEndDate && filterDate.ReturnEndDate) {

      return [[[['RentalDate'], '>=', moment(filterDate.RentalStartDate).format('YYYY-MM-DD')], 'and',
        [['RentalDate'], '<', moment(filterDate.RentalEndDate).format('YYYY-MM-DD')]], 'and',
        [['ReturnDate'], '<', moment(filterDate.ReturnEndDate).format('YYYY-MM-DD')]]
    } else if (filterDate.RentalStartDate && filterDate.ReturnStartDate && filterDate.ReturnEndDate) {
      return [[[['RentalDate'], '>=', moment(filterDate.RentalStartDate).format('YYYY-MM-DD')], 'and',
        [['ReturnDate'], '>=', moment(filterDate.ReturnStartDate).format('YYYY-MM-DD')]], 'and',
        [['ReturnDate'], '<', moment(filterDate.ReturnEndDate).format('YYYY-MM-DD')]]
    } else if (filterDate.RentalEndDate && filterDate.ReturnStartDate && filterDate.ReturnEndDate) {
      return [[[['RentalDate'], '<', moment(filterDate.RentalEndDate).format('YYYY-MM-DD')], 'and',
        [['ReturnDate'], '>=', moment(filterDate.ReturnStartDate).format('YYYY-MM-DD')]], 'and',
        [['ReturnDate'], '<', moment(filterDate.ReturnEndDate).format('YYYY-MM-DD')]]
    } else if (filterDate.RentalStartDate && filterDate.ReturnStartDate) {
      return [[['RentalDate'], '>=', moment(filterDate.RentalStartDate).format('YYYY-MM-DD')], 'and',
        [['ReturnDate'], '>=', moment(filterDate.ReturnStartDate).format('YYYY-MM-DD')]]
    } else if (filterDate.RentalStartDate && filterDate.ReturnEndDate) {
      return [[['RentalDate'], '>=', moment(filterDate.RentalStartDate).format('YYYY-MM-DD')], 'and',
        [['ReturnDate'], '<', moment(filterDate.ReturnEndDate).format('YYYY-MM-DD')]]
    } else if (filterDate.RentalEndDate && filterDate.ReturnStartDate) {
      return [[['RentalDate'], '<', moment(filterDate.RentalEndDate).format('YYYY-MM-DD')], 'and',
        [['ReturnDate'], '>=', moment(filterDate.ReturnStartDate).format('YYYY-MM-DD')]]
    } else if (filterDate.RentalEndDate && filterDate.ReturnEndDate) {
      return [[['RentalDate'], '<', moment(filterDate.RentalEndDate).format('YYYY-MM-DD')], 'and',
        [['ReturnDate'], '<', moment(filterDate.RentalEndDate).format('YYYY-MM-DD')]]
    } else if (filterDate.RentalStartDate && filterDate.RentalEndDate) {
      return [[['RentalDate'], '>=', moment(filterDate.RentalStartDate).format('YYYY-MM-DD')], 'and',
        [['RentalDate'], '<', moment(filterDate.RentalEndDate).format('YYYY-MM-DD')]]
    } else if (filterDate.ReturnStartDate && filterDate.ReturnEndDate) {
      return [[['ReturnDate'], '>=', moment(filterDate.ReturnStartDate).format('YYYY-MM-DD')], 'and',
        [['ReturnDate'], '<', moment(filterDate.ReturnEndDate).format('YYYY-MM-DD')]]
    } else if (filterDate.RentalStartDate) {
      return [['RentalDate'], '>=', moment(filterDate.RentalStartDate).format('YYYY-MM-DD')]
    } else if (filterDate.RentalEndDate) {
      return [['RentalDate'], '<', moment(filterDate.RentalEndDate).format('YYYY-MM-DD')]
    } else if (filterDate.ReturnStartDate) {
      return [['ReturnDate'], '>=', moment(filterDate.ReturnStartDate).format('YYYY-MM-DD')]
    } else if (filterDate.ReturnEndDate) {
      return [['ReturnDate'], '<', moment(filterDate.ReturnEndDate).format('YYYY-MM-DD')]
    } else {
      return undefined
    }

  }

  ////Change Event Table
  const onChangeTable = (pagination, filters, sorter, extra) => {
    if (extra.action === 'paginate') {
      setPagination({
        skip: pagination.current,
        take: pagination.pageSize,
      })
      const params = { ...filterData, ...{ skip: pagination.current, take: pagination.pageSize } }
      getBorrowAndReturnFiles(params)
    }
  }

  const onChangePage = (pageSetting) => {
    setPagination({
      skip: pageSetting.current,
      take: pageSetting.pageSize,
    })
    let params = {
      'Take': pageSetting.pageSize,
      'Skip': pageSetting.current,
      'EqualityFilter': filterData,
      'ContainsText': searchText,
    }
    if (formatFilterDate()) {
      params.Criteria = formatFilterDate()
    }
    getBorrowAndReturnFiles(params)
  }

  const getBorrowAndReturnFiles = (params) => {
    borrowAndReturnFilesStore.getFiles(params).then(res => {
    }).catch(error => {
      message.error(error.message)
    })
  }


  const handleDeleteItem = (record) => {
    confirm({
      title: 'Xác nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Xóa bản ghi',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        borrowAndReturnFilesStore.deleteRental({ EntityIds: record.CallCardId }).then(res => {
          message.success('Xóa thành công')
          setPagination({ skip: 1, take: 5 })
          let params = {
            'Take': 5,
            'Skip': 1,
            'EqualityFilter': filterData,
            'ContainsText': filterData.ContainsText,
          }
          getBorrowAndReturnFiles(params)
        }).catch(error => {
          message.error('Đã có lỗi xãy ra')
        })
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const onHandleDeleteMultiple = () => {
    confirm({
      title: 'Xác nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Xóa bản ghi',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        borrowAndReturnFilesStore.deleteMultipleRental({ EntityIds: selectedRowKeys }).then(res => {
          message.success('Xóa thành công')
          setPagination({ skip: 1, take: 5 })
          let params = {
            'Take': 5,
            'Skip': 1,
            'EqualityFilter': filterData,
            'ContainsText': filterData.ContainsText,
          }
          getBorrowAndReturnFiles(params)
        }).catch(error => {
          message.error('Đã có lỗi xãy ra')
        })
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const onHandleExportExcel = () => {
    let params = { 'Take': 0, 'Skip': 0, 'Sort': [] }
    if (selectedRowKeys && selectedRowKeys?.length > 0) {
      params.Criteria = [['CallCardId'], 'in', [selectedRowKeys]]
    }
    borrowAndReturnFilesStore.getExcelList(params).then(res => {
      console.log('res', res)
      FileDownload(res, 'Danh_sach_muon.tra.xlsx')
    }).catch(error => {
      message.error(error.message)
    })

  }

  const onHandleSearch = () => {
    setPagination({ skip: 1, take: 5 })
    let params = {
      'Take': 5,
      'Skip': 1,
      'EqualityFilter': filterData,
      'ContainsText': searchText,
    }
    if (formatFilterDate()) {
      params.Criteria = formatFilterDate()
    }
    getBorrowAndReturnFiles(params)
  }

  const onHandleClear = () => {
    setPagination({ skip: 1, take: 5 })
    setFilterData({})
    setFilterDate({})
    setSearchText('')
    let params = {
      'Take': 5,
      'Skip': 1,
      'EqualityFilter': {},
      'ContainsText': '',
    }
    getBorrowAndReturnFiles(params)
  }

  useEffect(() => {
    commonStore.setPageName('DASHBOARD')
  }, [])

  ////Get courseList by phông
  useEffect(() => {
    let list = []
    let findPhong = phongLookup.find(item => item.PhongId === filterData.PhongId)
    if (findPhong) setCourses(findPhong.Courses)
    else setCourses([])
  }, [filterData.PhongId])

  useEffect(() => {
    let params = {
      'Take': pagination.take,
      'Skip': pagination.skip,
      'EqualityFilter': filterData,
      'ContainsText': searchText,
    }
    if (formatFilterDate()) {
      params.Criteria = formatFilterDate()
    }
    getBorrowAndReturnFiles(params)
  }, [])

  ///format dataSource
  useEffect(() => {
    let data = []
    if (borrowAndReturnFilesStore.files.Entities) {
      data = borrowAndReturnFilesStore.files.Entities.map((item, index) => {
        item.NumberOfRow = index + 1
        return item
      })
      setDataSource(data)
    }
  }, [borrowAndReturnFilesStore.files])

  return (
    <React.Fragment>
      <Helmet><title>Mượn trả tài liệu</title></Helmet>
      <PageWrapper isTablet={isTablet}>
        <Breadcrumb>

          <Breadcrumb.Item>
            <a onClick={() => history.push('/home')}>Trang chủ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Mượn trả tài liệu</Breadcrumb.Item>
        </Breadcrumb>

        <HeadingSection>
          <div className={'heading-tilte'}>
            Yêu cầu mượn trả tài liệu
          </div>
          <div className={'heading-action'}>
            <Button type='primary' ghost className={'btn-create'} onClick={() => {
              history.push(`/borrow-return-documents/new`)
            }}>Thêm mới <PlusOutlined /></Button>
          </div>
        </HeadingSection>
        <SearchFormWrapper>
          <Row gutter={[16, 32]}>
            <Col xs={24} xxl={12} xl={12} sm={24}>
              <FloatingLabel label={'Tên tài liệu'}>
                <Input value={filterData['ContainsText']} placeholder={'Nhập tên hồ sơ'}
                       onChange={(e) => setSearchText(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col xxl={6} xl={6} sm={12} xs={24}>
              <FloatingLabel label={'Trạng thái mượn'}>
                <Select value={filterData['Status']}
                        placeholder={'--Chọn trạng thái--'}
                        onChange={(value) => onChangeInput(value, 'Status')}
                >
                  <Select.Option value={1}>{'Đang mượn'}</Select.Option>
                  <Select.Option value={2}>{'Đã trả'}</Select.Option>
                </Select>
              </FloatingLabel>
            </Col>
            <Col xxl={6} xl={6} sm={12} xs={24}>
              <FloatingLabel label={'Đã gửi email'}>
                <Select value={filterData['EmailStatus']}
                        placeholder={'--Chọn trạng thái--'}
                        onChange={(value) => onChangeInput(value, 'EmailStatus')}
                >
                  <Select.Option value={1}>{'Đã gửi mail'}</Select.Option>
                  <Select.Option value={2}>{'Chưa gửi mail'}</Select.Option>
                </Select>
              </FloatingLabel>
            </Col>
            <Col xxl={6} xl={6} sm={12} xs={24}>
              <FloatingLabel label={'Ngày mượn từ'}>
                <DatePicker placeholder={'Từ ngày'}
                            onChange={(date) => {
                              onChangeDate(date, 'RentalStartDate')
                            }} value={filterData['RentalStartDate']} />
              </FloatingLabel>
            </Col>
            <Col xxl={6} xl={6} sm={12} xs={24}>
              <FloatingLabel label={'Ngày mượn đến'}>
                <DatePicker
                  onChange={(date) => {
                    onChangeDate(date, 'RentalEndDate')
                  }}
                  placeholder={'Đến ngày'} value={filterData['RentalEndDate']} />
              </FloatingLabel>
            </Col>
            <Col xxl={6} xl={6} sm={12} xs={24}>
              <FloatingLabel label={'Ngày trả từ'}>
                <DatePicker
                  onChange={(date) => {
                    onChangeDate(date, 'ReturnStartDate')
                  }} placeholder={'Từ ngày'} value={filterData['ReturnStartDate']} />
              </FloatingLabel>
            </Col>
            <Col xxl={6} xl={6} sm={12} xs={24}>
              <FloatingLabel label={'Ngày trả đến'}>
                <DatePicker
                  onChange={(date) => {
                    onChangeDate(date, 'ReturnEndDate')
                  }}
                  placeholder={'Đến ngày'} value={filterData['ReturnEndDate']} />
              </FloatingLabel>
            </Col>
          </Row>
          <SearchActionWrapper>
            <Space>
              <Button type='primary' onClick={onHandleSearch} icon={<SearchOutlined />}>Tìm kiếm</Button>
              <Button type={'default'} onClick={onHandleClear}>Hủy</Button>
            </Space>
          </SearchActionWrapper>
        </SearchFormWrapper>
        <GridViewWrapper>
          <HeadingSection>
            <div className={'heading-tilte'}>
              Danh sách kết quả
            </div>
            <div className={'heading-action'}>
              <Space>
                <Button type='text'
                        onClick={onHandleDeleteMultiple}
                        icon={<DeleteOutlined style={{ color: 'red', fontSize: 18 }} />}>Xóa</Button>
                <Button type={'primary'} onClick={onHandleExportExcel} ghost><FileExcelOutlined /></Button>
              </Space>
            </div>
          </HeadingSection>
          <Table rowKey={(record) => record.CallCardId}
                 rowSelection={{ type: 'checkbox', ...rowSelection }}
                 dataSource={dataSource}
                 columns={columns}
                 pagination={false}
                 scroll={isMobile || isTablet ? { x: 1260 } : { x: false }}
                 onChange={onChangeTable}
          />
          <PaginationComponent onChangePage={onChangePage}
                               total={borrowAndReturnFilesStore.files?.TotalCount || 0}
                               current={pagination.skip}
                               pageSize={pagination.take} />
        </GridViewWrapper>
      </PageWrapper>
    </React.Fragment>
  )
}

BorrowAndReturnPage.propTypes = {
  commonStore: PropTypes.object,
}

export default inject(
  'commonStore', 'authenticationStore', 'metadataStore', 'borrowAndReturnFilesStore',
)(observer(BorrowAndReturnPage))
