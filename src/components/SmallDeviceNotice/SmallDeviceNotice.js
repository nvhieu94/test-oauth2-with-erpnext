import React from 'react'
import { inject, observer } from 'mobx-react'
import { Comment, Heading, NoticeWrapper } from './SmallDeviceNoticeStyled'
// SVGs

const SmallDeviceNotice = props => {

  const { solidLightColor, solidColor } = props.commonStore.appTheme

  return (
    <NoticeWrapper bg={solidLightColor}>
      <img src={`${process.env.PUBLIC_URL}/assets/icons/mobile-notice.svg`} alt='' width={200} />
      <Heading color={solidColor}>
        You are using the device with small resolution!
      </Heading>
      <Comment>
        For the best experiences, please using this app on the larger resolution device or greater than 768px
      </Comment>
    </NoticeWrapper>
  )
}

export default inject(
  'commonStore',
)(observer(SmallDeviceNotice))
