import styled from "styled-components";


export const ControlWrapper = styled.div`
  label {
    position: absolute;
    top: 0;
    left: 18px;
    background-color: #fff;
    padding: 0 5px 0 5px;
    color: #6c757d;
  }
  .ant-input {
    border-radius: 5px;
  }
  .ant-picker {
    border-radius: 5px;
  }
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: 5px;
  }
  .ant-select-show-search.ant-select-multiple .ant-select-selector {
    border-radius: 5px;
  }
`