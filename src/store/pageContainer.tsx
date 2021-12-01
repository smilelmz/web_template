import React from 'react'
import { action, makeAutoObservable } from 'mobx'
import { TabPaneProps } from 'antd'

class PageContainerStore {
  extra: React.ReactNode[] = []

  tabList: TabPaneProps[] = []

  footer: React.ReactNode[] = []

  tabActiveKey = ''

  constructor() {
    // 6.0主动监听数据的写法
    makeAutoObservable(this)
  }

  @action
  setExtra = (extra: React.ReactNode[] = []) => {
    this.extra = extra
  }

  @action
  setTabList = (tabList: TabPaneProps[] = []) => {
    this.tabList = tabList
  }

  @action
  setActiveTab = (tab = '') => {
    this.tabActiveKey = tab
  }

  @action
  setFooter = (footer: React.ReactNode[] = []) => {
    this.footer = footer
  }
}

export default PageContainerStore
