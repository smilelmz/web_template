import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'mobx-react'
import HOCLazy from './components/hoc/HOCLazy'
import { ErrorBoundary } from '@/components/ui'
import config from '@/config'
import RootStore from '@/store'
import './app.less'

const BaseLayout = HOCLazy(() => import('@/components/layouts/BaseLayout'))
const LoginLayout = HOCLazy(() => import('@/components/layouts/LoginLayout'))
const rootStore = new RootStore()
const { baseRoute } = config

const App = () => (
  <ErrorBoundary>
    <Provider {...rootStore}>
      <BrowserRouter>
        <Switch>
          <Route path={`${baseRoute}/login`} component={LoginLayout} />
          <Route path={`${baseRoute}`} component={BaseLayout} />
          <Redirect exact from='/' to={`${baseRoute}`} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>
)

export default App
