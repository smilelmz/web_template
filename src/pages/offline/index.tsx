import React from 'react'
import { Result } from 'antd'
import { createNamespace } from '@/utils'
import './index.less'

const [bem] = createNamespace('offline')

interface IProps {
  lang?: string
}

const OfflinePage: React.FC<IProps> = ({ lang }: IProps) => (
  <div className={bem()}>
    <Result
      status='500'
      title={lang === 'zh' ? '停服维护' : 'System Upgrading'}
      subTitle={lang === 'zh' ? '9月28日维护更新公告' : '(GMT-05:00 NewYork) May 13 (Wednesday) 11:00-19:00'}
      extra={
        lang === 'zh' ? (
          <div className={bem('extra')}>
            <div>
              为了给大家带来更好的使用体验，服务器将于 <span className={bem('sign')}>9月28日(周一) 00:00-08:00</span>{' '}
              进行停服维护，如未能按时完成，则开服时间将会顺延。具体更新详情请留意稍后更新公告，或维护结束后至网站登录界面查看。
            </div>
            <div>维护期间将暂时无法进入服务器进行操作，给各位带来的不便，敬请谅解，非常感谢大家的支持和理解！</div>
          </div>
        ) : null
      }
    />
  </div>
)

OfflinePage.defaultProps = {
  lang: 'zh',
}

export default OfflinePage
