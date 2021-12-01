/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Switch, Route, Redirect, RouteComponentProps, useLocation } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Avatar, Menu, Dropdown } from 'antd'
import { UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined, ExportOutlined } from '@ant-design/icons'
import ProLayout, { PageContainer, WaterMark } from '@ant-design/pro-layout'
import { History } from 'history'
import { NoMatch } from '@/components/ui'
import { Storage, createNamespace } from '@/utils'
import config from '@/config'
import router from '@/router'
import services from '@/services/request'
import PageContainerStore from '@/store/pageContainer'
import './index.less'

const { baseRoute, projectName, loginUrl, publicPreRoute, publicName } = config
const routesList = router.getRouteList()
const routesMap = router.getRouteMap()
const [bem] = createNamespace('home-page')

type IProps = {
  pageContainer: PageContainerStore
}

const getBreadcrumb = (history: History) => {
  const breadcrumbRouteList = router.getBreadcrumbList(history.location.pathname.replace(baseRoute!, ''), routesMap)
  return breadcrumbRouteList
}

const logout = () => {
  Storage.removeCookie('Authorization')
  window.location.href = `${publicPreRoute}${publicName}${loginUrl}`
}

const BaseLayout: React.FC<IProps & RouteComponentProps> = props => {
  const { history, pageContainer } = props
  const { extra, tabList, footer, setActiveTab } = pageContainer
  const location = useLocation()
  const [pathname, setPathname] = useState(location.pathname || '/')
  const [collapsed, setCollapsed] = useState(false)

  const containerProps = {
    className: extra.length > 0 ? bem('extra') : '',
    extra: extra && extra.length > 0 ? extra : undefined,
    tabList: tabList && tabList.length > 0 ? tabList : undefined,
    footer: footer && footer.length > 0 ? footer : undefined,
  }

  const dropMenu = (
    <Menu>
      <Menu.Item icon={<ExportOutlined />} key='logout'>
        <div style={{ textAlign: 'center' }} onClick={logout}>
          &nbsp;&nbsp;退出
        </div>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className={bem()}>
      <ProLayout
        {...router}
        // fixedHeader
        fixSiderbar
        title={projectName}
        id='test-pro-layout'
        location={{
          pathname,
        }}
        collapsed={collapsed}
        collapsedButtonRender={false}
        onCollapse={setCollapsed}
        menuHeaderRender={(logo, title) => (
          <div id='customize_menu_header' onClick={() => history.push(`${baseRoute}`)}>
            {collapsed ? (
              <span className='pupulogo' style={{ fontSize: '14px', marginRight: '5px' }}>
                pupu
              </span>
            ) : (
              <span className='pupulogo' style={{ fontSize: '20px', marginRight: '5px' }}>
                pupu
              </span>
            )}
            {collapsed ? '' : projectName}
          </div>
        )}
        breadcrumbRender={() => {
          const breadcrumbList = getBreadcrumb(history)
          return breadcrumbList.map((item: any) => {
            const itemCopy = item
            const { component } = itemCopy
            const path = `${baseRoute}${itemCopy.path}`
            const breadcrumbName = itemCopy.name
            return {
              breadcrumbName,
              path,
              component,
            }
          })
        }}
        onMenuHeaderClick={e => console.info(e)}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              setPathname((item.path || baseRoute)!)
              history.push(`${baseRoute}${item.path!}`)
            }}
          >
            {dom}
          </div>
        )}
        headerContentRender={() => (
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{
              display: 'inline-block',
              padding: '0 10px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        )}
        rightContentRender={() => (
          <div style={{ marginRight: '10px' }}>
            <Dropdown overlay={dropMenu} trigger={['hover']}>
              <div
                onClick={() => {
                  history.push(`${baseRoute}/user`)
                }}
                style={{
                  display: 'inline-block',
                  padding: '0 10px',
                  cursor: 'pointer',
                }}
              >
                <Avatar icon={<UserOutlined />} />
                <span style={{ margin: '0 10px' }}>
                  {/* {username}（{userinfo.userNumber}） */}
                  lmz 151584
                </span>
                <DownOutlined />
              </div>
            </Dropdown>
          </div>
        )}
        itemRender={(route, _, routes) => {
          const last = routes.indexOf(route) === routes.length - 1
          return last ? (
            <span>{route.breadcrumbName}</span>
          ) : (
            <a
              onClick={() => {
                setPathname((route.path || baseRoute)!)
                history.push(`${baseRoute}${route.path!}`)
              }}
            >
              {route.breadcrumbName}
            </a>
          )
        }}
        pageTitleRender={false}
      >
        <PageContainer
          {...containerProps}
          onTabChange={keys => {
            setActiveTab(keys)
          }}
        >
          <div style={{ minHeight: 'calc(100vh - 200px)' }}>
            <WaterMark content='lmz' fontColor='rgba(0,0,0,.1)'>
              <Switch>
                {routesList.map(item => (
                  <Route
                    exact
                    key={`${item.path}${item.name}`}
                    path={`${baseRoute}${item.path}`}
                    render={props => {
                      services.clearPending() // 清除前一个页面请求
                      const GlobalCompoent = item.component!
                      // const hasToken = getAuthToken();
                      const hasToken = true
                      return hasToken ? (
                        <GlobalCompoent {...props} />
                      ) : (
                        <Redirect
                          to={{
                            pathname: baseRoute + loginUrl,
                          }}
                        />
                      )
                    }}
                  />
                ))}
                <Route component={NoMatch} />
              </Switch>
            </WaterMark>
          </div>
        </PageContainer>
      </ProLayout>
    </div>
  )
}

export default inject('pageContainer')(observer(BaseLayout))
