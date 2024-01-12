import { $http } from '@/plugin/axios.js'
import { GetObjStorage, GetImgUrl } from '@/utils/utils.js'

/**
 * @function 登录
 * @param {*} paylod 
 * @returns 
 */
export async function fetchLogin (paylod) {
    return $http('/auth/login', paylod, 'POST')
}

/**
 * @function 查询用户信息
 * @param {*} paylod 
 * @returns 
 */
export async function fetchUsrInfo (paylod) {
    return $http('/usr/getUsrInfo', paylod)
}

/**
 * @function 查询订单
 * @param {*} paylod 
 * @returns 
 */
export async function fetchAllOrds (paylod) {
    const data = await $http('/ord/getAllOrds', paylod);
    const temp = GetObjStorage('ords').reverse();
    let result = [];
    if (temp.length) {
        temp.forEach(item=> {
            let cur = data.find(v => v.id == item.productId);
            if (cur) {
                result.push({
                    ...cur,
                    ...item,
                    ordStatus: item.status,
                    img: GetImgUrl(cur.img)
                })
            }
        })
    }
    console.log(result)
    return result
}

/**
 * @function 查询购物车
 * @param {*} paylod 
 * @returns 
 */
export async function fetchCarts (paylod) {
    const data = await $http('/cart/getShopCart', paylod) || [];
    const temp = GetObjStorage('carts');
    let result = []
    // const testIds = ['1', '2']; // 测试展示
    if (temp.length) {
        data.forEach(item=> {
            const cur = temp.find(v => v.id == item.id);
            if (cur) {
                result.push({
                    ...item,
                    num: cur.num,
                })
            }
        })
    }

    return result
}

/**
 * @function 查询商品列表
 * @param {*} paylod 
 * @returns 
 */
export async function fetchProductList (paylod) {
    return $http('/product/list', paylod)
}