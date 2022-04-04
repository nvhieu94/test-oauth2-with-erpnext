import styled from 'styled-components'


export const PageWrapper = styled.div`
  flex-wrap: wrap;
  height: 100%;
`

export const HeadingSection =styled.div`
  display: flex;
  margin: 18px 0px 18px 0;
  .heading-tilte{
    font-size: 1.8rem;
    font-weight: 600;
  }
  .heading-action {
    margin-left: auto;
    .btn-create {
      border-color: #3ac47d !important;
      color:  #3ac47d !important;
    }
  }
`
export const SearchFormWrapper = styled.div`
  //margin: 18px 0 0 0;

`

export const SearchActionWrapper = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
`
export const GridViewWrapper = styled.div`
  
`

export const SectionWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  .section-label{
    font-weight: 600;
  }
  .section-value {
    margin-left: 20px;
  }
  .color-red {
    color: red;
  }
`
export const TextWrapper =styled.span`
  margin-left:8px;
  display: inline-block;
  width: 150px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
`
