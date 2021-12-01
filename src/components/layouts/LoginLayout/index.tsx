import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '@/pages/login'
import Register from '@/pages/login/register'
import { createNamespace } from '@/utils'
import config from '@/config'
import './index.less'

const [bem] = createNamespace('login-layout')
const { baseRoute, loginUrl } = config

const LoginLayout = () => (
  <div className={bem()}>
    <Switch>
      <Route exact path={`${baseRoute}${loginUrl}`} component={Login} />
      <Route exact path={`${baseRoute}/register`} component={Register} />
    </Switch>
  </div>
)

export default LoginLayout
