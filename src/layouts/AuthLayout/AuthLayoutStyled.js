import styled from 'styled-components'

export const LayoutWrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 100px 0;
  min-height: 100vh;
  width: 100%;
    //background: ${props => props.theme.gradientColor};
  position: relative;
  z-index: 0;

  &:after {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
      //background: url(${props => props.bgimg}) repeat top left;
    background-size: 300px 300px;
    z-index: -1;
    opacity: .035;
  }
`
export const LogoWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 60px;
  margin-bottom: 30px;

  img {
    height: 100%;
  }
`
export const FormWrapper = styled.div`
  position: relative;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  padding: 32px;
  @media screen and (min-width: 641px) {
    min-width: 564px;
  }
  @media screen and (max-width: 640px) {
    width: calc(100% - 60px);
  }
  //.back-login-icon {
  //  cursor: pointer;
  //  position: absolute;
  //  top: 16px;
  //  left: 24px;
  //  font-size: 20px;
  //  color: #1890ff;
  //}
  
  .ant-input-affix-wrapper .ant-input-affix-wrapper-focused {
    box-shadow: none;
  }
`
export const FormTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #000;
  line-height: 1.4;
  margin-bottom: 0;
`
export const FormSubtitle = styled.p`
  font-size: 16px;
`
export const RegisterLabel = styled.div`
  margin: 55px 0 16px 0;
  text-align: center;
`
export const OTPInputWrapper = styled.div`
  position: relative;

  .otp-req-btn {
    position: absolute;
    right: 15px;
    text-align: right;
    bottom: 13px;
    z-index: 10;
    color: #237BD3;

    &.disabled {
      color: #ABABAB;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  .register-input {
    padding-right: 150px;
  }
`
