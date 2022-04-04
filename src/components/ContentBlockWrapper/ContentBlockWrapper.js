import React from 'react'
import PropTypes from 'prop-types'
import { ContentWrapper } from './ContentBlockWrapperStyled'

const ContentBlockWrapper = props => {

  const {
    children,
  } = props

  return (
    <ContentWrapper>
      {children}
    </ContentWrapper>
  )
}

ContentBlockWrapper.propTypes = {
  children: PropTypes.node,
}

export default ContentBlockWrapper
