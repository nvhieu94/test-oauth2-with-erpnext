import React from 'react'
import PropTypes from 'prop-types'
import { Button, Radio } from 'antd'
import {PaginationWrapper} from './PaginationLoadMoreStyled';

const PaginationLoadMore = (props) => {
    const {pageSize} = props
    const options = [
        { label: '20', value: 20 },
        { label: '50', value: 50 },
        { label: '100', value: 100 },
      ];
     const onChangePageSize =()=> {

     } 
    return (<PaginationWrapper>
        <Radio.Group
          options={options}
          onChange={onChangePageSize}
          value={pageSize}
          optionType="button"
        />
        <Button>Load more</Button>
    </PaginationWrapper>)
}  

PaginationLoadMore.prototype = {
    pageSize: PropTypes.number,
    onChangePage: PropTypes.func.isRequired,
  }
export default PaginationLoadMore
