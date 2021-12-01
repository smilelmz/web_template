import React from 'react'
import { AxiosRequestConfig } from 'axios'

interface CommonTypeComponent {
  style?: RecordType
  className?: string
  onClick?: React.MouseEventHandler<HTMLElement> | undefined
}

type IAxiosRequestConfig = AxiosRequestConfig & {
  hump?: boolean
  loading?: boolean
}
