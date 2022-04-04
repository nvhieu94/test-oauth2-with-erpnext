import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Checkbox,message } from 'antd'
import { inject, observer } from 'mobx-react'
import { useHistory, useLocation } from 'react-router-dom'
import { RegisterLabel,FormWrapper } from '../../../layouts/AuthLayout/AuthLayoutStyled'
import {UserOutlined} from '@ant-design/icons';


const LoginForm = props => {

  const { authenticationStore } = props

  const [loginForm] = Form.useForm()
  const history = useHistory()
  const location = useLocation()

  const onLogin = info => {
    const callBack = encodeURIComponent('https://localhost:3000/callback')
    window.location.href = 'https://gas-dev.dpotech.vn/api/method/frappe.integrations.oauth2.authorize?client_id=e1cf85a8d7&state=444&response_type=code&scope=openid%20all&redirect_uri='+callBack
  }

  const handleClickForgotPass = () => {

  }
  const handleClickRegister = ()=>{

  }

  return (
    <FormWrapper>


      <Form
        form={loginForm}
        className={'login-logo'}
        layout={'vertical'}
        onFinish={onLogin}
        scrollToFirstError
        requiredMark={false}
        colon={false}
      >
        <Button type={'primary'} htmlType={'submit'} block className={'login-btn'}>
            Đăng nhập
        </Button>
      </Form>
    </FormWrapper>
  )
}

LoginForm.propTypes = {
  children: PropTypes.node,
  authenticationStore: PropTypes.object,
}

export default inject(
  'authenticationStore',
)(observer(LoginForm))
