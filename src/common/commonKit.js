import axios from 'axios'
import Qs from 'qs'

export const baseURL = process.env.root

// axios 全局默认设置
axios.defaults.baseURL = 'http://192.168.0.32:8081'
// 默认允许携带cookie
axios.defaults.withCredentials=true

/***
 * 全局的ajax请求方法
 * @param method 请求的方式
 * @param url 请求的url
 * @param data 请求的参数
 * @param success 请求成功后的处理函数
 * @param vm 当前指针
 */
export const ajax = function (method, url, data, success, vm) {
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? data : null,
    params: data,
    timeout: 20000,
    withCredentials: true,
    paramsSerializer: function (params) { //用来序列化请求参数的
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    }
  }).then(function (res) {
    if (res.status !== 200) {
      vm.$Message.error("网络请求失败,响应码:" + res.status)
    } else {
      if (res.data.code === 200) {
        // 操作成功后的处理
        if (success) {
          success(res)
        }
      } else {
        vm.$Message.error(res.data.msg ? res.data.msg : '操作失败')
      }
    }
  }).catch(function (error) {
    console.log(error)
    if (error) {
      vm.$Message.error('请求出错或服务器出错' + error)
    }
  })

}
