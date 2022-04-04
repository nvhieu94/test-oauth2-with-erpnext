import React, { useEffect, useRef, useState } from 'react'
import {
  PageWrapper,
  HeadingSection,
  SearchFormWrapper,
  SearchActionWrapper, GridViewWrapper,
  SectionWrapper,
} from '../../components/CommonStyled/CommonStyled'
import { inject, observer } from 'mobx-react'
import { Helmet } from 'react-helmet/es/Helmet'
import { Breadcrumb, Button, Tabs, Row, Col, Space, Table, Input, Select, DatePicker, message } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import { CloseOutlined, PrinterOutlined } from '@ant-design/icons'
import FloatingLabel from '../../components/FloatingLabel'
import moment from 'moment'
import PaginationComponent from '../../components/PaginationComponent'
import miscUtils from '../../utils/miscUtils'
import FileDownload from 'js-file-download'
import { Document, Page } from 'react-pdf'
import { useMediaQuery } from 'react-responsive/src'

const { TabPane } = Tabs

const FileDetailPage = (props) => {
  const history = useHistory()
  const location = useLocation()
  const { match } = props
  const { commonStore, authenticationStore, metadataStore, lookupFilesStore } = props
  const { departments, warehouses, phongLookup, physicalStateList, warrantyList, documentCategories } = metadataStore
  const { documentsByFileId } = lookupFilesStore
  const [filesInfo, setFileInfo] = useState({})
  const [documentSource, setDocumentSource] = useState([])
  const [courses, setCourses] = useState([])
  const [pagination, setPagination] = useState({ skip: 1, take: 5 })
  const [sourceFile, setSourceFile] = useState(null)
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 })
  const isMobile = useMediaQuery({ maxWidth: 767 })

  const columns = [
    {
      dataIndex: 'NumberOfRow',
      title: 'STT',
    },
    {
      dataIndex: 'TextNumber',
      title: 'Số ký hiệu',
      render: function renderColumn(text, record) {
        return <a onClick={() => handleExportPdf(record)}>{text}</a>
      },

    },
    {
      dataIndex: 'DocFileName',
      title: 'Trích yếu',
    },
    {
      dataIndex: 'DocumentCategoryId',
      title: 'Thể loại',
      render: function renderColumn(text) {
        return miscUtils.getValueOfArrayByKey(text, 'MasterDataId', 'MasterDataName', documentCategories)
      },
    },
    {
      dataIndex: 'ProblemGroup',
      title: 'Nhóm vấn đề',
    },
  ]


  const handleExportPdf = (record) => {

    commonStore.getDocumentFileContent({ 'DocumentId': 34158 }).then(res => {
      // FileDownload(res,'test.pdf')
      // console.log('res',res)
      setSourceFile(res)


    }).catch(error => {
      message.error(error.message)
    })
  }

  const onChangePage = (pageSetting) => {
    setPagination({
      skip: pageSetting.current,
      take: pageSetting.pageSize,
    })
    getGetDocumentsByFileId(filesInfo, pageSetting.current, pageSetting.pageSize)
  }
  const getGetDocumentsByFileId = (file, skip, take) => {
    let payload = {
      'Skip': skip - 1,
      'Take': take,
      'EqualityFilter': {
        'FileId': file?.FileId,
      },
    }


    lookupFilesStore.getGetDocumentsByFileId(payload).then(res => {
      if (res.Entities) {
        let data = []
        data = res.Entities.map((item, index) => {
          item.NumberOfRow = index
          return item
        })
        console.log('data', data)
        setDocumentSource(data)
      }
    }).catch(error => {
      message.error(error.message)
    })
  }


  const getLookupCoursesByPhong = () => {
    let listCourses = []
    if (phongLookup) {
      let findPhong = phongLookup.find(item => item.PhongId === filesInfo.PhongId)
      if (findPhong) listCourses = findPhong.Courses
    }
    setCourses(listCourses)
  }
  const getDocumentCategorieById = (id) => {
    let findCategory = documentCategories.find(item.MasterDataId === id)
    if (findCategory) return findCategory.MasterDataName
  }

  useEffect(() => {
    let payload = {
      'EntityId': match?.params?.id,
    }
    lookupFilesStore.getFileDetail(payload).then(res => {
      setFileInfo(res.Entity)
      getGetDocumentsByFileId(res.Entity, pagination.skip, pagination.take)
    }).catch(error => {
      message.error(error.message)
    })
  }, [match.params])

  useEffect(() => {
    getLookupCoursesByPhong()
  }, [filesInfo, phongLookup.length > 0])

  return (
    <React.Fragment>
      <Helmet><title>Chi tiết hồ sơ</title></Helmet>
      <PageWrapper>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a onClick={() => history.push('/home')}>Trang chủ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a onClick={() => {
              history.goBack()
            }}>Tra cứu hồ sơ </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Chi tiết hồ sơ
          </Breadcrumb.Item>
        </Breadcrumb>
        <HeadingSection>
          <div className={'heading-tilte'}>
            Chi tiết hồ sơ ({filesInfo?.FileName} )
          </div>
          <div className={'heading-action'}>
            <Button type='default' onClick={() => history.goBack()}><CloseOutlined /></Button>
          </div>
        </HeadingSection>
        <Tabs defaultActiveKey='general-info'>
          <TabPane tab='Thông tin chung' key='general-info'>
            <HeadingSection>
              <div className={'heading-action'}>
                <Space>
                  <Button type='primary' ghost icon={<PrinterOutlined />}>In mẫu hồ sơ</Button>
                  <Button type='primary' ghost icon={<PrinterOutlined />}>In Barcode</Button>
                  <Button type='primary' ghost icon={<PrinterOutlined />}>In mục lục</Button>
                </Space>
              </div>
            </HeadingSection>
            <Row gutter={[16, 32]}>
              <Col md={8}>
                <SectionWrapper>
                  <div className={'section-label'}>Mã hồ sơ:</div>
                  <div className={'section-value color-red'}>{filesInfo?.FileCode}</div>
                </SectionWrapper>
              </Col>
              <Col md={8}>
                <SectionWrapper>
                  <div className={'section-label'}>Tổ số tài liệu:</div>
                  <div className={'section-value'}>{filesInfo?.TotalDoc}</div>
                </SectionWrapper>
              </Col>
            </Row>
            <Row gutter={[16, 32]}>
              <Col xs={24} xxl={16} xl={16} sm={24}>
                <FloatingLabel label={'Tên hồ sơ'}>
                  <Input value={filesInfo?.FileName} />
                </FloatingLabel>
              </Col>
              <Col xxl={4} xl={4} sm={12} xs={24}>
                <FloatingLabel label={'Hộp số'}>
                  <Input value={filesInfo?.NumberOfBox} />
                </FloatingLabel>
              </Col>
              <Col xxl={4} xl={4} sm={12} xs={24}>
                <FloatingLabel label={'Số hiệu'}>
                  <Input value={filesInfo?.Number} />
                </FloatingLabel>
              </Col>
              <Col xs={24} xxl={16} xl={16} sm={24}>
                <FloatingLabel label={'Phòng'}>
                  <Select value={filesInfo?.PhongId}>
                    {phongLookup && phongLookup.map(item => (
                      <Select.Option key={item['PhongId']} value={item['PhongId']}>{item['PhongName']}</Select.Option>
                    ))}
                  </Select>
                </FloatingLabel>
              </Col>
              <Col xxl={8} xl={8} sm={12} xs={24}>
                <FloatingLabel label={'Khóa'}>
                  <Select value={filesInfo?.CourseId}>
                    {courses && courses.map(item => (
                      <Select.Option key={item['CourseId']}
                                     value={item['CourseId']}>{item['CourseName']}</Select.Option>
                    ))}
                  </Select>
                </FloatingLabel>
              </Col>
              <Col xxl={4} xl={4} sm={12} xs={24}>
                <FloatingLabel label={'Mục số'}>
                  <Input value={filesInfo?.TableOfContents} />
                </FloatingLabel>
              </Col>
              <Col xxl={20} xl={20} sm={12} xs={24}>
                <FloatingLabel label={'Cơ quan ban hành'}>
                  <Select value={filesInfo?.DepartmentId}>
                    {departments && departments.map(item => (
                      <Select.Option key={item['DepartmentId']}
                                     value={item['DepartmentId']}>{item['DepartmentName']}</Select.Option>
                    ))}
                  </Select>
                </FloatingLabel>
              </Col>

              <Col xxl={12} xl={12} sm={12} xs={24}>
                <FloatingLabel label={'Thời gian bắt đầu'}>
                  <DatePicker
                    value={filesInfo?.StartTime ? moment(filesInfo?.StartTime) : undefined}
                    format={'DD/MM/YYYY'}
                  />
                </FloatingLabel>
              </Col>
              <Col xxl={12} xl={12} sm={12} xs={24}>
                <FloatingLabel label={'Thời gian kết thúc'}>
                  <DatePicker
                    value={filesInfo?.EndTime ? moment(filesInfo?.EndTime) : undefined}
                    format={'DD/MM/YYYY'}
                  />
                </FloatingLabel>
              </Col>
              <Col xxl={4} xl={4} sm={12} xs={24}>
                <FloatingLabel label={'Nhóm vấn đề'}>
                  <Input value={filesInfo?.ProblemGroup} />
                </FloatingLabel>
              </Col>
              <Col xxl={20} xl={20} sm={12} xs={24}>
                <FloatingLabel label={'Kho lưu trữ'}>
                  <Select value={filesInfo?.WareHouseId}>
                    {warehouses && warehouses.map(item => (
                      <Select.Option key={item['WareHouseId']}
                                     value={item['WareHouseId']}>{item['WareHousePosition']}</Select.Option>
                    ))}
                  </Select>
                </FloatingLabel>
              </Col>
              <Col xxl={12} xl={12} sm={12} xs={24}>
                <FloatingLabel label={'Thời hạn bảo quản'}>
                  <Select placeholder={'--Thời hạn bảo quản--'} value={filesInfo?.Warranty}>
                    {warrantyList && warrantyList.map(item => (
                      <Select.Option key={item.MasterDataName}
                                     value={item.MasterDataName}>{item.MasterDataName}</Select.Option>
                    ))}
                  </Select>
                </FloatingLabel>
              </Col>
              <Col xxl={12} xl={12} sm={12} xs={24}>
                <FloatingLabel label={'Trạng thái vật lý'}>
                  <Select value={filesInfo?.MasterDatas} placeholder={'--Chọn trạng thái--'} mode={'multiple'}>
                    {physicalStateList && physicalStateList.map(item => (
                      <Select.Option key={item.MasterDataId}
                                     value={item.MasterDataId}>{item.MasterDataName}</Select.Option>
                    ))}

                  </Select>
                </FloatingLabel>
              </Col>
              <Col xxl={24} xl={24} sm={24} xs={24}>
                <FloatingLabel label={'Ghi chú'}>
                  <Input.TextArea rows={4} value={filesInfo?.Note} />
                </FloatingLabel>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab='Tài liệu và văn bản' key='file'>
            <SectionWrapper>
              <div className={'section-label'}>Danh sách Tài Liệu & Văn bản trong hồ sơ</div>
            </SectionWrapper>
            <Table columns={columns} dataSource={documentSource || []}
                   rowKey={(record) => record.DocFileId}
                   pagination={false}
                   scroll={isMobile || isTablet ? { x: 1260 } : { x: false }}
            />
            <PaginationComponent onChangePage={onChangePage}
                                 total={documentsByFileId?.TotalCount || 0}
                                 current={pagination.skip}
                                 pageSize={pagination.take} />

          </TabPane>
        </Tabs>
        <div className={'btn-cancel'} style={{ textAlign: 'center', marginTop: 20 }}>
          <Button onClick={() => history.goBack()} type={'primary'} ghost>Hủy</Button>
        </div>
      </PageWrapper>
    </React.Fragment>
  )
}
export default inject('commonStore', 'authenticationStore', 'metadataStore', 'lookupFilesStore')(observer(FileDetailPage))