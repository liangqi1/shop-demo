import Mock from 'mockjs'
import * as userData  from './data/user.js'
import * as orderData  from './data/order.js'
import * as cartData  from './data/cart.js'
import * as productData  from './data/product.js'
import { GetImgUrl } from '../utils/utils.js'

const tempMock = Mock.mock({
    'list|6': [{
      'id':"@id(10)",
      'ordStatus|1': [1, 2, 3],
      'name': Mock.Random.ctitle(4, 40),
      'productName': Mock.Random.ctitle(4, 8),
      'price': '@integer(1, 1000)',
      'num': '@integer(1, 5)',
      'info': '型号;规格;颜色;',
      'img': '@image("400x400", "#fff")'
    }]
})

const prodcutMock = Mock.mock({
    'list|5': [{
        'id':"@id(10)",
        'name': '@cword(10, 30)',
        'price': '@integer(1, 1000)',
        'img': '@image("400x400", "#fff")'
      }]
})

/** 登录接口 */
Mock.mock('/mock/auth/login', 'post', (req) => {
    const query = JSON.parse(req.body);
    if (query.user === 'admin' && query.pwd == '123456') {
        return {
                code: 200,
                data: { token: 'ca43274076ad485e88659b193e51f001'}
            }
    } else {
        return {
            code: 30001,
            msg: '账号密码错误'
        }
    }
})

/** 查询用户信息 */
Mock.mock('/mock/usr/getUsrInfo', {
    code: 200,
    data: userData.result
})

/** 查询订单 */
Mock.mock('/mock/ord/getAllOrds', {
    code: 200,
    data: productData.result
})

/** 查询购物车 */
Mock.mock('/mock/cart/getShopCart', {
        code: 200,
        data: productData.result
})

/** 获取主页面商品 */
Mock.mock('/mock/product/list', {
    code: 200,
    data: [
        ...prodcutMock.list,
    ]
})
