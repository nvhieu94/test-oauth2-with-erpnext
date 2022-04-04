import styled from 'styled-components'

export const NoticeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 60px;
  background: ${props => props.bg};
`
export const Heading = styled.h1`
  color: ${props => props.color};
  margin: 30px 0 10px;
  font-size: 20px;
  font-weight: 500;
  text-align: justify;
  text-align-last: center;
`
export const Comment = styled.p`  
  font-size: 16px;
  text-align: justify;
  text-align-last: center;
`
