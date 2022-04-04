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
import { Document, Page } from 'react-pdf'
// const isPdfFile = require("pdfjs-dist");
// const pdfPath = "../learning/helloworld.pdf";

const { TabPane } = Tabs

const LookupDocumentsDetailPage = (props) => {
  const history = useHistory()
  const location = useLocation()
  const { match } = props
  const { commonStore, authenticationStore, metadataStore, lookupFilesStore, lookupDocumentsStore } = props
  const { departments,
    warehouses,
    phongLookup,
    physicalStateList,
    warrantyList,
    documentCategories,
    formList,
    userList,
    roleList,
    confidentialityList
  } = metadataStore
  const { documentsByFileId } = lookupFilesStore
  const [documentSource, setDocumentSource] = useState({})
  const [courses, setCourses] = useState([])
  const [pagination, setPagination] = useState({ skip: 1, take: 5 })
  const [sourceFile, setSourceFile] = useState(null)
  // Setting worker path to worker bundle.
  //pdfjsLib.GlobalWorkerOptions.workerSrc = "../../build/browserify/pdf.worker.bundle.js";

  const getContentPdf = () => {
    commonStore.getDocumentFileContent({ 'DocumentId': 34158 }).then(res => {
      // // FileDownload(res,'test.pdf')
      // // console.log('res',res)
      // let array = JSON.parse(res).content
      setSourceFile(res)
    }).catch(error => {
      message.error(error.message)
    })
  }

  const getLookupCoursesByPhong = () => {
    let listCourses = []
    if (phongLookup) {
      let findPhong = phongLookup.find(item => item.PhongId === documentSource.PhongId)
      if (findPhong) listCourses = findPhong.Courses
    }
    setCourses(listCourses)
  }

  useEffect(() => {
    if (!documentSource.DocFileId) return
    getContentPdf()
  }, [documentSource])

  useEffect(() => {
    getLookupCoursesByPhong()
  }, [documentSource, phongLookup.length > 0])

  useEffect(() => {
    let payload = {
      'EntityId': match?.params?.id,
    }
    lookupDocumentsStore.getDocumentDetail(payload).then(res => {
      setDocumentSource(res.Entity)
    }).catch(error => {
      message.error(error.message)
    })
  }, [match.params])

  return (
    <React.Fragment>
      <Helmet><title>Chi tiết tài liệu</title></Helmet>
      <PageWrapper>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a onClick={() => history.push('/home')}>Trang chủ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item > <a onClick={() => {
            history.goBack()
          }}>Tra cứu tài liệu</a> </Breadcrumb.Item>
          <Breadcrumb.Item>
            Chi tiết
          </Breadcrumb.Item>
        </Breadcrumb>
        <HeadingSection>
          <div className={'heading-tilte'}>
            Chi tiết tài liệu ({documentSource?.FileFileName})
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
                  <Button type='primary' ghost icon={<PrinterOutlined />}>In Barcode</Button>
                  <Button type='primary' ghost icon={<PrinterOutlined />}>In mẫu hồ sơ</Button>
                </Space>
              </div>
            </HeadingSection>
            <Row gutter={[16, 32]}>
              <Col xs={24} xxl={24} xl={24} sm={24}>
                <FloatingLabel label={'Tên hồ sơ'}>
                  <Input value={documentSource?.FileFileName} />
                </FloatingLabel>
              </Col>
              <Col xs={24} xxl={16} xl={16} sm={24}>
                <FloatingLabel label={'Trích Yếu'}>
                  <Input value={documentSource?.DocFileName} />
                </FloatingLabel>
              </Col>
              <Col xs={24} xxl={8} xl={8} sm={24}>
                <FloatingLabel label={'Số ký hiệu'}>
                  <Input value={documentSource?.TextNumber} />
                </FloatingLabel>
              </Col>
              <Col xs={24} xxl={4} xl={4} sm={24}>
                <FloatingLabel label={'Nhóm vấn đề'}>
                  <Input value={documentSource?.ProblemGroup} />
                </FloatingLabel>
              </Col>
              <Col xs={24} xxl={4} xl={4} sm={24}>
                <FloatingLabel label={'Số thứ tự'}>
                  <Input value={documentSource?.Order} />
                </FloatingLabel>
              </Col>
              <Col xs={24} xxl={4} xl={4} sm={24}>
                <FloatingLabel label={'Số trang của tài liệu'}>
                  <Input value={documentSource.NumberOfPage} />
                </FloatingLabel>
              </Col>
              <Col xs={24} xxl={4} xl={4} sm={24}>
                <FloatingLabel label={'Trang số'}>
                  <Input value={documentSource?.PageNumber} />
                </FloatingLabel>
              </Col>
              <Col xs={24} xxl={8} xl={8} sm={24}>
                <FloatingLabel label={'Thể loại'}>
                  <Select value={documentSource?.DocumentCategoryId}>
                    {documentCategories && documentCategories.map(item => (
                      <Select.Option key={item['MasterDataId']}
                        value={item['MasterDataId']}>{item['MasterDataName']}</Select.Option>
                    ))}
                  </Select>
                </FloatingLabel>
              </Col>
              <Col xs={24} xxl={16} xl={16} sm={24}>
                <FloatingLabel label={'Phông'}>
                  <Select value={documentSource?.PhongId}>
                    {phongLookup && phongLookup.map(item => (
                      <Select.Option key={item['PhongId']} value={item['PhongId']}>{item['PhongName']}</Select.Option>
                    ))}
                  </Select>
                </FloatingLabel>
              </Col>
              <Col xxl={8} xl={8} sm={12} xs={24}>
                <FloatingLabel label={'Khóa'}>
                  <Select value={documentSource?.CourseId}>
                    {courses && courses.map(item => (
                      <Select.Option key={item['CourseId']}
                        value={item['CourseId']}>{item['CourseName']}</Select.Option>
                    ))}
                  </Select>
                </FloatingLabel>
              </Col>
              <Col xs={24} xxl={16} xl={16} sm={24}>
                <FloatingLabel label={'Cơ quan ban hành'}>
                  <Select value={documentSource?.DepartmentId}>
                    {departments && departments.map(item => (
                      <Select.Option key={item['DepartmentId']}
                        value={item['DepartmentId']}>{item['DepartmentName']}</Select.Option>
                    ))}
                  </Select>
                </FloatingLabel>
              </Col>
              <Col xxl={8} xl={8} sm={12} xs={24}>
                <FloatingLabel label={'Độ mật'}>
                  <Select value={documentSource?.SecurityId}>
                    {confidentialityList && confidentialityList.map(item => (
                      <Select.Option key={item.MasterDataId}
                        value={item.MasterDataId}>{item.MasterDataName}</Select.Option>
                    ))}
                  </Select>
                </FloatingLabel>
              </Col>
              <Col xxl={8} xl={8} sm={12} xs={24}>
                <FloatingLabel label={'Ngày phát hành'}>
                  <DatePicker
                    value={documentSource.ReleaseDate ? moment(documentSource.ReleaseDate) : undefined}
                    format={'DD/MM/YYYY'}
                  />
                </FloatingLabel>
              </Col>
              <Col xxl={16} xl={16} sm={12} xs={24}>
                <FloatingLabel label={'Người ký'}>
                  <Input value={documentSource?.Signer} />
                </FloatingLabel>
              </Col>
              <Col xxl={12} xl={12} sm={12} xs={24}>
                <FloatingLabel label={'Người dùng được xem'}>
                  <Select mode={'multiple'} value={documentSource?.Users}>
                    {userList && userList.map(item => (
                      <Select.Option key={item.UserId}
                        value={item.UserId}>{item.Username}</Select.Option>
                    ))}
                  </Select>
                </FloatingLabel>
              </Col>
              <Col xxl={12} xl={12} sm={12} xs={24}>
                <FloatingLabel label={'Vai trò được xem'}>
                  <Select mode={'multiple'} value={documentSource?.Roles}>
                    {roleList && roleList.map(item => (
                      <Select.Option key={item.RoleId}
                        value={item.RoleId}>{item.RoleName}</Select.Option>
                    ))}
                  </Select>
                </FloatingLabel>
              </Col>
              <Col xxl={6} xl={6} sm={12} xs={24}>
                <FloatingLabel label={'Thời gian bảo quản'}>
                  <Select placeholder={'--Thời hạn bảo quản--'} value={documentSource?.Warranty}>
                    {warrantyList && warrantyList.map(item => (
                      <Select.Option key={item.MasterDataName}
                        value={item.MasterDataName}>{item.MasterDataName}</Select.Option>
                    ))}
                  </Select>
                </FloatingLabel>
              </Col>
              <Col xxl={6} xl={6} sm={12} xs={24}>
                <FloatingLabel label={'Kho lưu trữ'}>
                  <Select value={documentSource?.WareHouseId}>
                    {warehouses && warehouses.map(item => (
                      <Select.Option key={item['WareHouseId']}
                        value={item['WareHouseId']}>{item['WareHousePosition']}</Select.Option>
                    ))}
                  </Select>
                </FloatingLabel>
              </Col>
              <Col xxl={6} xl={6} sm={12} xs={24}>
                <FloatingLabel label={'Trạng thái vật lý'}>
                  <Select placeholder={'--Chọn trạng thái--'} mode={'multiple'} value={documentSource?.MasterDatas}>
                    {physicalStateList && physicalStateList.map(item => (
                      <Select.Option key={item.MasterDataId}
                        value={item.MasterDataId}>{item.MasterDataName}</Select.Option>
                    ))}

                  </Select>
                </FloatingLabel>
              </Col>
              <Col xxl={6} xl={6} sm={12} xs={24}>
                <FloatingLabel label={'Hộp số'}>
                  <Input value={documentSource?.NumberOfBox} />
                </FloatingLabel>
              </Col>
              <Col xxl={24} xl={24} sm={12} xs={24}>
                <FloatingLabel label={'Bản mẫu'}>
                  <Select value={documentSource?.FormId}>
                    {formList && formList.map(item => (
                      <Select.Option key={item.FormId}
                        value={item.FormId}>{item.FormName}</Select.Option>
                    ))}
                  </Select>
                </FloatingLabel>
              </Col>
              <Col xxl={24} xl={24} sm={12} xs={24}>
                <FloatingLabel label={'Ghi chú'}>
                  <Input.TextArea value={documentSource?.Note} rows={4} />
                </FloatingLabel>
              </Col>
            </Row>
            <div className={'btn-cancel'} style={{ textAlign: 'center', marginTop: 20 }}>
              <Button onClick={() => history.goBack()} type={'primary'} ghost>Hủy</Button>
            </div>
          </TabPane>
          <TabPane tab='Chi tiết tài liệu' key='doc-detail'>
            <Document
              file={`${window.location.origin}/${documentSource.DocFilePaths}`}
            >
              <Page pageNumber={1} />
            </Document>
          </TabPane>
        </Tabs>

      </PageWrapper>
    </React.Fragment>
  )
}

export default inject('commonStore',
  'authenticationStore',
  'metadataStore',
  'lookupFilesStore',
  'lookupDocumentsStore',
)(observer(LookupDocumentsDetailPage))