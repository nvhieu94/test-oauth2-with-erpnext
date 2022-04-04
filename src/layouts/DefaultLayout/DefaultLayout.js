import React from 'react'
import PropTypes from 'prop-types'
import { ContentWrapper, LayoutWrapper } from './DefaultLayoutStyled'
import MainHeaderBar from './MainHeaderBar'
import MainSidebar from './MainSidebar'
import { useMediaQuery } from 'react-responsive/src'
import { inject, observer } from 'mobx-react'
import MobileMenuDrawer from '../../components/MobileMenuDrawer'
const DefaultLayout = props => {
  const { commonStore } = props;
  const { compactSidebar } = commonStore
  const isDesktop = useMediaQuery({ minWidth: 1025 })
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 })
  const isMobile = useMediaQuery({ maxWidth: 767 })

  const { children } = props

  return (
    <LayoutWrapper isMobile={isMobile} toggle={compactSidebar}>
      <ContentWrapper isMobile={isMobile}>
        {
          isMobile
            ? <MobileMenuDrawer />
            : (
              <>
                <MainHeaderBar />
                <MainSidebar />
              </>
            )
        }
        {children}
      </ContentWrapper>
    </LayoutWrapper>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node,
}

export default inject('commonStore')(observer(DefaultLayout))
