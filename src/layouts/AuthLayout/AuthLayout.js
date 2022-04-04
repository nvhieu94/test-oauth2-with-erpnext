import React from 'react'
import PropTypes from 'prop-types'
import { LayoutWrapper } from './AuthLayoutStyled'


const AuthLayout = props => {
  const { children } = props
  return (
    <LayoutWrapper>
      {children}
    </LayoutWrapper>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

export default AuthLayout
