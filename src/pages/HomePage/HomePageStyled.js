import styled from 'styled-components'
import { Row, Col } from 'antd'

export const PageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  h1, p {
    width: 100%;
    text-align: center;
  }
  h1 {
    font-size: 24px;
    font-weight: bold;
  }
  p {
    font-size: 16px;
  }
`

export const HomePageHeader = styled.div`
  width:100%;
  background-color:#fff;
  margin: 0px 8px 15px 8px;
  height:80px;
  padding-top: 25px;
`
export const HomePageHeaderTitle = styled.p`
  font-size: 22px !important;
`
export const MainRow = styled(Row)`
  width:100%
`
export const MainCol = styled(Col)`
  // background-color:#fff;
 
`
export const CardWrapper = styled.div`
  background-color:#fff;
  width:100%;

  padding:10px;
  margin-bottom:15px
`

export const HeaderChart = styled.div`
    padding: 0 0 15px 3px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 700;
`
