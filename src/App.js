import React, { useEffect } from 'react'
import LoadingSpinner from './components/LoadingSpinner'
import SmallDeviceNotice from './components/SmallDeviceNotice'
// Styling
import './App.less'
import ThemeProvider from './providers/ThemeProvider'
import { useMediaQuery } from 'react-responsive'
// Ant Design
import { ConfigProvider, message } from 'antd'
// Axios
import axios from 'axios'
// MomentJS
import moment from 'moment'
import viVN from 'antd/es/locale/vi_VN'
import 'moment/locale/vi'
// React Router
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
// MobX
import { Provider } from 'mobx-react'
import commonStore from './stores/commonStore'
import loadingAnimationStore from './stores/loadingAnimationStore'
import authenticationStore from './stores/authenticationStore'
import metadataStore from './stores/metadataStore'
import menuStore from './stores/menuStore'
import lookupFilesStore from './stores/lookupFilesStore'
import borrowAndReturnFilesStore from './stores/borrowAndReturnFilesStore'
import lookupDocumentsStore from './stores/lookupDocumentsStore';
import homeStore from './stores/homeStore';
// Modules
import AuthModule from './modules/AuthModule'
import ProtectedModule from './modules/ProtectedModule'
// Pages
import NotFoundPage from './pages/NotFoundPage'
import AuthenticationCallbackPage from './pages/AuthenticationCallback'
const history = createBrowserHistory()
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('u') || sessionStorage.getItem('u') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/auth/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
)




// axios.defaults.timeout = 20000
axios.interceptors.request.use(
  config => {
    loadingAnimationStore.showSpinner(true),
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
      };
      config.crossDomain = true;
    return config
  },
  error => {
    loadingAnimationStore.showSpinner(false)
    return Promise.reject(error)
  },
)
axios.interceptors.response.use(
  response => {
    loadingAnimationStore.showSpinner(false)
    return response
  },
  error => {
   loadingAnimationStore.showSpinner(false)

    if (error?.response?.status === 408 || error?.code === 'ECONNABORTED') {
      message.error('Request timeout!')
    } else if (error?.response?.status === 401) {
      authenticationStore.userLogout().then(() => {
        history.push('/auth/login')
      })
    }
    return Promise.reject(error)
  },
)

moment.locale('vi', {
  week: {
    dow: 1,
  },
})

const rootStores = {
  commonStore,
  loadingAnimationStore,
  authenticationStore,
  metadataStore,
  menuStore,
  lookupFilesStore,
  borrowAndReturnFilesStore,
  lookupDocumentsStore,
  homeStore
}

const App = () => {
  const isDesktop = useMediaQuery({ minWidth: 1025 })
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 })
  const isMobile = useMediaQuery({ maxWidth: 767 })

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')
   
  }, [])
  useEffect(() => {
    commonStore.checkIsDesktop(isDesktop)
    commonStore.checkIsTablet(isTablet)
    commonStore.checkIsMobile(isMobile)

  }, [isDesktop, isTablet, isMobile])


  return (
    <Provider {...rootStores}>

      <ThemeProvider>
        <ConfigProvider
        // locale={viVN}
        >
          <Router history={history}>
            <Switch>
              <Route exact path={'/auth/:authType'} component={AuthModule} />
              <Route exact path={'/callback'} component={AuthenticationCallbackPage} />
              <ProtectedRoute
                path={[
                  '/',
                  '/home',
                  
                ]}
                exact
                component={ProtectedModule}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </ConfigProvider>
        <LoadingSpinner />
      </ThemeProvider>

    </Provider>
  )
}

export default App
