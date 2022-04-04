import React from 'react'
import PropTypes from 'prop-types'
import { PaginationWrapper } from './PaginationComponentStyled'

import { Pagination, Select } from 'antd'

const { Option } = Select

const PaginationComponent = (props) => {
  const { current, pageSize, total, onChangePage } = props

  const onHandleChangePageSize = (value) => {
    if (onChangePage) onChangePage({ current: 1, pageSize: value })
  }

  const onHandleChangePage = (page, pageSize) => {
    if (onChangePage) onChangePage({ current: page, pageSize: pageSize })
  }

  return (
    <PaginationWrapper>
      {total >0 && <>
        <div className={'page-size'}>
          Số hàng mỗi trang
          <Select value={pageSize} style={{ width: 120 }} onChange={onHandleChangePageSize}>
            <Option value={5}>5</Option>
            <Option value={10}>10</Option>
            <Option value={15}>15</Option>
            <Option value={20}>20</Option>
          </Select>
        </div>
        <div className={'pagination-items'}>
          <Pagination current={current} pageSize={pageSize} total={total} onChange={onHandleChangePage} />
        </div>
      </>}

    </PaginationWrapper>
  )
}
PaginationComponent.prototype = {
  current: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
}
export default PaginationComponent