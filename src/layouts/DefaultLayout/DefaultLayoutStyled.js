import styled from 'styled-components'

export const LayoutWrapper = styled.main`
  padding-top: 64px;
  padding-left: ${props => props.isMobile ? 0 : props.toggle ? 50 : 256}px;
  min-height: 100vh;
  background-color: #fff;
`
export const ContentWrapper = styled.div`
  padding: ${props => props.isMobile ? '15px 15px 20px' : '20px 24px'};
  min-height: calc(100vh - 64px);
`