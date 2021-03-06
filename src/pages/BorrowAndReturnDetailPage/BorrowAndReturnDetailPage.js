import React, { useEffect, useRef, useState } from 'react'
import {
  PageWrapper,
  HeadingSection,
} from '../../components/CommonStyled/CommonStyled'
import { inject, observer } from 'mobx-react'
import { Helmet } from 'react-helmet/es/Helmet'
import { Breadcrumb, Button, Row, Col, Space, Input, Select, DatePicker, message } from 'antd'
import { useHistory } from 'react-router-dom'
import FloatingLabel from '../../components/FloatingLabel'
import moment from 'moment'
const { Option } = Select;
const BorrowAndReturnDetailPage = (props) => {

  const history = useHistory()
  const { match, lookupDocumentsStore, borrowAndReturnFilesStore } = props
  const [info, setInfo] = useState({})
  const [documnetsList, setDocumnetsList] = useState([])
  const mode = match.params.id == 'new' ? 0 : 1;


  const getDocuments = () => {
    lookupDocumentsStore.getDocuments({ Skip: 0, Take: 100 }).then(res => {
      setDocumnetsList(res.Entities)
    }).catch(error => {
      message.error(error.message)
    })
  }
  useEffect(() => {
    getDocuments()
  }, [])


  ////Change data input
  const onChangeInput = (value, name) => {
    setInfo({
      ...info,
      [name]: value,
    })
  }

  const onHandleSave = () => {
    let params = { ...info }
    if (info.RentalDate) {
      params.RentalDate = moment(info.RentalDate).format("YYYY-MM-DD")
    }
    if (info.ReturnDate) {
      params.ReturnDate = moment(info.ReturnDate).format("YYYY-MM-DD")
    }
    if (mode === 0) {
      borrowAndReturnFilesStore.createRental({ Entity: params }).then(res => {
        history.goBack()
      }).catch(error => {
        message.error(error.message)
      })
    } else {
      borrowAndReturnFilesStore.updateRental({ Entity: params }).then(res => {
        history.goBack()
      }).catch(error => {
        message.error(error.message)
      })
    }
  }

  useEffect(() => {
    if (match?.params?.id === 'new') return
    borrowAndReturnFilesStore.getFileDetail({ EntityId: match?.params?.id }).then(res => {
      setInfo(res.Entity)
    }).catch(error => {
      message.error(error.message)
    })
  }, [match])

  return (
    <React.Fragment>
      <Helmet><title>Y??u c???u m?????n tr???</title></Helmet>
      <PageWrapper>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a onClick={() => history.push('/home')}>Trang ch???</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item ><a onClick={() => {
            history.goBack()
          }}> M?????n tr??? h??? s??</a></Breadcrumb.Item>
          <Breadcrumb.Item>
            {mode == 0 ? 'T???o y??u c???u' : 'Th??ng tin m?????n tr???'}
          </Breadcrumb.Item>
        </Breadcrumb>
        <HeadingSection>
          <div className={'heading-tilte'}>
            {mode == 0 ? 'Y??u c???u m?????n t??i li???u' : 'Th??ng tin m?????n tr???'}
          </div>
        </HeadingSection>
        <Row gutter={[16, 32]} style={{ 'marginTop': '70px' }}>
          <Col xs={24} xxl={12} xl={12} sm={24}>
            <FloatingLabel label={'Ng?????i m?????n'}>
              <Input value={info?.Renter} onChange={(e) => onChangeInput(e.target.value, 'Renter')} />
            </FloatingLabel>
          </Col>
          <Col xs={24} xxl={12} xl={12} sm={24}>
            <FloatingLabel label={'Email ng?????i m?????n'}>
              <Input value={info?.EmailTo} onChange={(e) => onChangeInput(e.target.value, 'EmailTo')} />
            </FloatingLabel>
          </Col>
          <Col xs={24} xxl={12} xl={12} sm={24}>
            <FloatingLabel label={'Tr???ng th??i m?????n'} >
              <Select value={info?.Status} onChange={(value) => onChangeInput(value, 'Status')}>
                <Select.Option value={1}>{'??ang m?????n'}</Select.Option>
                <Select.Option value={2}>{'???? tr???'}</Select.Option>
              </Select>
            </FloatingLabel>
          </Col>
          <Col xs={24} xxl={12} xl={12} sm={24}>
            <FloatingLabel label={'???? g???i mail'}>
              <Select value={info?.EmailStatus} onChange={(value) => onChangeInput(value, 'EmailStatus')}>
                <Select.Option value={1}>{'???? g???i mail'}</Select.Option>
                <Select.Option value={2}>{'Ch??a g???i mail'}</Select.Option>
              </Select>
            </FloatingLabel>
          </Col>
          <Col xxl={12} xl={12} sm={12} xs={24}>
            <FloatingLabel label={'Ng??y m?????n'} >
              <DatePicker
                onChange={(value) => onChangeInput(value, 'RentalDate')}
                value={info?.RentalDate ? moment(info?.RentalDate) : undefined}
                format={"DD/MM/YYYY"}
              />
            </FloatingLabel>
          </Col>
          <Col xxl={12} xl={12} sm={12} xs={24}>
            <FloatingLabel label={'Ng??y tr???'}>
              <DatePicker
                onChange={(value) => onChangeInput(value, 'ReturnDate')}
                value={info?.ReturnDate ? moment(info?.ReturnDate) : undefined}
                format={"DD/MM/YYYY"}
              />
            </FloatingLabel>
          </Col>
          <Col xxl={24} xl={24} sm={24} xs={24}>
            <FloatingLabel label={'Danh s??ch t??i li???u'}>
              <Select mode="tags" style={{ width: '100%' }}
                onChange={(value) => onChangeInput(value, 'Documents')}
                value={info?.Documents}
              >
                {documnetsList && documnetsList.map(item => (
                  <Option value={item.DocFileId}>{item.DocFileName}</Option>
                ))}
              </Select>
            </FloatingLabel>
          </Col>
        </Row>
        <div className={'btn-summit'} style={{ textAlign: 'center', marginTop: 20 }}>
          <Space>
            <Button onClick={onHandleSave} type={'primary'}>L??u</Button>
            <Button onClick={() => history.goBack()} type={'primary'} ghost>H???y</Button>
          </Space>
        </div>
      </PageWrapper>
    </React.Fragment>
  )
}
export default inject('commonStore', 'borrowAndReturnFilesStore',
  'authenticationStore', 'metadataStore', 'lookupDocumentsStore', 'lookupFilesStore')(observer(BorrowAndReturnDetailPage))