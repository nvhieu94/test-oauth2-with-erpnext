import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import DefaultLayout from '../../layouts/DefaultLayout'
// Pages
import HomePage from '../../pages/HomePage';
import AuthenticationCallbackPage from '../../pages/AuthenticationCallback'
import {inject,observer} from 'mobx-react'


const ProtectedModule = (props) => {

  useEffect(() => {

  }, [props.location])

  return (
    <DefaultLayout>
      <Switch>
      <Route exact path={'/'} component={HomePage} />
        <Route exact path={'/home'} component={HomePage} />
      
      </Switch>
    </DefaultLayout>
  )

}

ProtectedModule.propTypes = {}

export default inject()(observer(ProtectedModule))
