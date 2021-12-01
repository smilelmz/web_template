import React from 'react'
import { Result, Button } from 'antd'
import { RouteComponentProps } from 'react-router-dom'
import config from '@/config'

const { baseRoute } = config

const NoMatch: React.FC<RouteComponentProps> = ({ history }) => (
  <div
    style={{
      paddingTop: 50,
    }}
  >
    <Result
      status='404'
      title='404'
      subTitle='页面没有找到'
      extra={
        <Button
          type='primary'
          onClick={() => {
            history.push(`${baseRoute}`)
          }}
        >
          首页
        </Button>
      }
    />
  </div>
)

export default NoMatch
