/**
 * @function 判断是否是空，包括空字符
 * @param {*} v 
 */
export function IsEmptyStr (v) {
    return !(v && (typeof(v) === 'string' && v.trim() ))
}

/**
 * @function 小数点后面保留第n位
 * @param {*} x 做近似处理的数
 * @param {*} n 小数点后第 n 位
 */
export function toRound(x, n) {
    return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
}

/**
 * @function 对象数组去重
 * @param {*} arr 
 * @param {*} uniId 
 * @returns 
 */
export function uniqueArray(arr, uniId){
    const res = new Map();
    return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
}
 
/**
 * @function 获取本地图片地址
 */
export function GetImgUrl (filePath) {
    return new URL(`../assets/img/${filePath}`, import.meta.url).href
}

/**
 * @function 获取ListStorage
 * @param {*} key 
 * @returns 
 */
export function GetObjStorage(key) {
    const temp = localStorage.getItem(key);
    return temp ? JSON.parse(temp) : []
}

//------------- 业务逻辑--------------------------------
/** 订单状态 */
export const OrdStatus = [
    { key: 1, name: '已支付' },
    { key: 2, name: '待发货' },
    { key: 3, name: '已完成' },
]

/**
 * @function 获取订单状态名称
 * @param {*} key 
 * @returns 
 */
export function FormatOrdStatus(key) {
    const obj = OrdStatus.find(item => item.key == key)
    return obj && obj.name || key
}