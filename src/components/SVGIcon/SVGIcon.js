import React, { memo } from 'react'
import PropTypes from 'prop-types'

const iconName = {
  'drive': 'drive.svg',
  'clock': 'clock.svg',
  'sync': 'sync.svg',
  'user-group': 'user-group.svg',
  'offline': 'offline.svg',
  'trash': 'trash.svg',
  'star': 'star.svg',
  'cloud': 'cloud.svg',
  'search-filter': 'search-filter.svg',
  'search': 'search.svg',
  'bell': 'bell.svg',
  'question-circle': 'question-circle.svg',
  'list-view': 'list-view.svg',
  'grid-view': 'grid-view.svg',
  'share':'share.svg',
  'lock':'lock.svg',
  'movefolder':'movefolder.svg',
  'edit':'edit.svg',
  'download':'download.svg',
  'info-circle':'info-circle.svg',
  'link':'link.svg',
  'google-drive':'google-drive.svg',
  'computer':'computer.svg',
  'onedrive':'onedrive.svg',
  // File list icon. Dùng tạm sau này lấy hàng từ server về
  'archive': 'files/archive.svg',
  'excel': 'files/excel.svg',
  'folder': 'files/folder.svg',
  'image': 'files/image.svg',
  'movie': 'files/movie.svg',
  'music': 'files/music.svg',
  'pdf': 'files/pdf.svg',
  'word': 'files/word.svg',
}

const SvgIcon = props => {

  const { name, width, height } = props

  return (
    <img
      className={'svgicon anticon'}
      src={`${process.env.PUBLIC_URL}assets/icons/${iconName[name]}`}
      alt=''
      width={width} height={height}
    />
  )
}

SvgIcon.propTypes = {
  name: PropTypes.oneOf(Object.keys(iconName)).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default memo(SvgIcon)
