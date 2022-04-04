import React, { Fragment, memo } from 'react'
import { Helmet } from 'react-helmet/es/Helmet'
import { Wrapper } from './NotFoundPageStyled'
import { Button, Result } from 'antd'

const NotFoundPage = props => {

  const { history } = props

  return (
    <Wrapper>
      <Helmet>
        <title>404</title>
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="The page you are looking for is not found!"
        extra={
          <Fragment>
            <Button onClick={() => history.goBack()}>
              Back to previous page
            </Button>
            <Button type={'primary'} onClick={() => history.push('/')}>
              Back to home page
            </Button>
          </Fragment>
        }
      />
    </Wrapper>
  )
}

export default memo(NotFoundPage)
