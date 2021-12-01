import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Result, Button, Tabs } from 'antd'
import config from '@/config'

const { TabPane } = Tabs
const { baseRoute } = config

interface IProps {
  children: ReactNode
}

interface IState {
  hasError: boolean
  stackMsg: string
  errorMsg: string
}

class ErrorBoundary extends Component<IProps, IState> {
  state = {
    hasError: false,
    stackMsg: '',
    errorMsg: '',
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({
      hasError: true,
      stackMsg: info.componentStack,
      errorMsg: error.stack || '',
    })
  }

  render() {
    const { hasError, stackMsg, errorMsg } = this.state
    if (hasError) {
      return (
        <div
          style={{
            width: '100vw',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Result
            status='500'
            title='服务异常'
            subTitle='抱歉，我们的服务遇到了一点小问题，您可以稍后刷新重试或者返回首页'
            extra={[
              <Button key={1} style={{ marginRight: 20 }} onClick={() => window.location.reload()}>
                刷新页面
              </Button>,
              <Button key={2} type='primary'>
                <a href={`${baseRoute}/`}>返回首页</a>
              </Button>,
            ]}
          >
            <Tabs defaultActiveKey='1'>
              <TabPane tab='错误信息' key='1'>
                <pre>{errorMsg}</pre>
              </TabPane>
              <TabPane tab='堆栈信息' key='2'>
                <pre>{stackMsg}</pre>
              </TabPane>
            </Tabs>
          </Result>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
