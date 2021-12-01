// 引入mockjs，使用mockjs来进行数据生成；
const Mock = require('mockjs')
// const Random = Mock.Random;

module.exports = {
  // 直接使用地址，相当于GET方法，直接返回
  '/api/mockdemo': {
    code: 0,
    data: {
      name: '刘沙',
    },
    msg: '',
  },
  '/api/mockdemo/error': {
    code: 500,
    data: {
      name: '刘沙',
    },
    msg: '获取数据失败',
  },
  '/api/mockdemo/list': {
    code: 0,
    data: {
      items: [...new Array(10)].map((_, k) => ({
        id: k,
        name: k,
        email: k,
        birthday: k,
      })),
      total: 1000,
    },
    msg: '',
  },
  // 使用方法来自定义生成
  '/api/mockdemo/fn/one': (req, res) => {
    const items = [...new Array(10)].map(() => ({
      id: Mock.mock('@id'),
      name: Mock.mock('@cname'),
      email: Mock.mock('@email'),
      birthday: Mock.mock('@datetime'),
    }))

    res.send({
      code: 0,
      data: {
        items,
        total: 1000,
      },
      msg: '',
    })
  },

  '/api/mockdemo/fn/two': (req, res) => {
    const data = Mock.mock({
      code: 0,
      data: {
        'items|10': [
          {
            id: '@id',
            userId: '@natural(100000,999999)',
            name: '@cname',
            email: '@email',
            birthday: '@datetime', // '@date("yyyy-MM-dd")'
            city: '@city',
            province: '@province',
            intro: '@cword(10, 30)',
            color: '@color()',
            codes: '@zip()',
            orderId: 'fz-@natural(1000, 9999)',
          },
        ],
        total: 1000,
      },
      msg: '',
    })
    res.send(data)
  },

  // 如果是get方法，并且后面加上id，例如getUserinfo/3478347
  // 需要前面加GET，方法中才能获取到请求的参数
  'GET /api/mockdemo/user/:id': (req, res) => {
    const { id } = req.params
    return res.json({
      code: 0,
      data: {
        id,
      },
      msg: '',
    })
  },
  // 使用post进行登录权限的判断；
  'POST /api/mockdemo/user/login': (req, res) => {
    const { password, username } = req.body
    if (password === 'admin' && username === 'admin') {
      return res.json({
        code: 0,
        data: {
          token: 'sdfsdfsdfdsf',
          id: 1,
          username: 'kenny',
          sex: 6,
        },
        msg: '登录成功！',
      })
    } else {
      return res.status(403).json({
        status: 'error',
        code: 403,
      })
    }
  },
  'DELETE /api/mockdemo/user/:id': (req, res) => {
    res.send({
      code: 0,
      data: true,
      msg: '删除成功！',
    })
  },
}
