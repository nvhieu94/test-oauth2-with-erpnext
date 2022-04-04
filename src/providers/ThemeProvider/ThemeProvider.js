import React from 'react'
import { inject, observer } from 'mobx-react'
import { GlobalStyle } from './ThemeProviderStyled'

const ThemeProvider = ({ commonStore, children }) => {

  return (
    <>
      <GlobalStyle
        theme={commonStore.appTheme}
      />
      {children}
    </>
  )
}

export default inject('commonStore')(observer(ThemeProvider))
