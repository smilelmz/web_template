import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

export interface IRouterList {
  path: string
  name?: string
  component?: React.FC<RouteComponentProps>
  routes?: Array<IRouterList>
  hideInMenu?: boolean
  icon?: React.ReactNode
}
