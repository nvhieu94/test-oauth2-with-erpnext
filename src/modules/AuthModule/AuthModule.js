import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AuthLayout from '../../layouts/AuthLayout'
import LoginForm from './LoginForm'
import Helmet from 'react-helmet/es/Helmet'

const AuthModule = props => {

  const { match } = props

  const { authType } = match.params

  const [pageTitle, setPageTitle] = useState('')
  const [formTitle, setFormTitle] = useState('')
  const [formSubtitle, setFormSubtitle] = useState('')
  const [content, setContent] = useState(null)

  const renderFormContent = useCallback(() => {
    switch (authType) {
      case 'login':
        setPageTitle('Login page')
        setFormTitle('LOGIN TO DIGITAL')
        setFormSubtitle('Wellcome!...')
        setContent(<LoginForm />)
        return
      default:
        return
    }
  }, [authType])

  useEffect(() => {
    renderFormContent()
  }, [authType])

  return (
    <AuthLayout
      title={formTitle}
      subtitle={formSubtitle}
    >
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      {content}
    </AuthLayout>
  )
}

AuthModule.propTypes = {
  children: PropTypes.node,
}

export default AuthModule
