import axios from 'axios';
import { showMessage } from "../utils/status";   // 引入状态码文件
import { showToast, showSuccessToast, showFailToast } from 'vant';
import router from '../router';

axios.defaults.timeout = 60000;
axios.defaults.baseURL = '/mock';   

//request 拦截
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('usr-t') || ''
  // 配置请求头
    config.headers = {
      //'Content-Type':'application/x-www-form-urlencoded',
      'Content-Type':'application/json;charset=UTF-8', 
      'token': token,
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//response 拦截
axios.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data) {
      const { code: statusCode, msg } = response.data
      if (statusCode !== 200) {
        showToast(msg || '请求错误');
        return Promise.reject(response.data)
      } else {
        return Promise.resolve(response.data.data)
      }
      // 403 重定向
      // if (router.currentRoute.value.name !== 'login' && statusCode === 403) {
      //   router.push({
      //     path: '/login',
      //     query: { redirect: router.currentRoute.fullPath}
      //   })
      // }

    } else {
      return Promise.reject(response.data)
    }
  },
  error => {
    const {response} = error;
    if (response) {
      // 网络错误
      showMessage(response.status);
      return Promise.reject(response.data);
    } else {
      showFailToast('网络连接异常,请稍后再试!');
    }
  }
);

// 封装 GET POST
export function $http(url='',params={},type='POST'){
return new Promise((resolve,reject)=>{
  let promise
  if( type.toUpperCase()=== 'POST' ){
    promise = axios({
      method:'POST',
      url,
      data:params
    })
  } else {
    promise = axios({
      url,
      params
    })
  }
  promise.then(res=>{
    resolve(res)
  }).catch(err=>{
    reject(err)
  })
})
}