import React from 'react'
import { BankOutlined, ProjectOutlined } from '@ant-design/icons'
import HOCLazy from '@/components/hoc/HOCLazy'
import { IRouterList } from './type'

const route: IRouterList = {
  path: '/',
  routes: [
    { path: '/home', name: 'Home', icon: <BankOutlined />, component: HOCLazy(() => import('@/pages/home')) },
    {
      path: '/',
      name: 'One',
      icon: <ProjectOutlined />,
      component: HOCLazy(() => import('@/pages/one')),
      hideInMenu: false,
    },
    { path: '/two', name: 'Two', icon: <ProjectOutlined />, component: HOCLazy(() => import('@/pages/two')) },
  ],
}

export default {
  route,
  location: {
    pathname: '/',
  },
  getRouteList() {
    const { routes } = this.route
    const target: IRouterList[] = []
    const deepMap = (arr: IRouterList[]) => {
      for (let item of arr) {
        if (item.routes) {
          deepMap(item.routes)
        }
        target.push(item)
      }
    }
    deepMap(routes!)
    return target
  },
  getRouteMap() {
    const routesList: Record<string, IRouterList> = {}
    for (const item of this.getRouteList()) {
      routesList[item.path] = item
    }
    return routesList
  },
  getBreadcrumbList(PName: string, routesMap: Record<string, IRouterList>) {
    const breadcrumbList: IRouterList[] = []
    const PNameList = PName.split('/')
    for (const [idx, item] of PNameList.entries()) {
      if (item === '') {
        continue
      }
      const breadc = PNameList.slice(0, idx + 1).join('/')
      breadcrumbList.push({ ...routesMap[breadc] })
    }
    return breadcrumbList
  },
}
