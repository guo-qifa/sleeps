import axios from 'axios'
// import store from '@/store/index.js';
// import { Message } from 'element-ui';  //element库的消息提示，可以不用

//  axios.defaults.baseURL = '/api' // 跨域关键代码
// axios.defaults.baseURL = '/backstage' //
 
axios.defaults.baseURL = window.globalVar.baseUrl + '/backstage';
//axios.defaults.baseURL = 'https://www.topsleep.net/backstage/';


// if (process.env.NODE_ENV == 'development') { //开发
//     axios.defaults.baseURL = '/api';}
// else if (process.env.NODE_ENV == 'debug') { //测试
//     axios.defaults.baseURL = 'https://www.ces/hi.com';
// }
// else if (process.env.NODE_ENV == 'production') { //线上
//     axios.defaults.baseURL = 'https://www.production.com';
// }
import router from "../router/index";



// 请求超时时间
axios.defaults.timeout = 15000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//
// // 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        try {
            let token = "";
            token = JSON.parse(localStorage.loginUserinfo).token;
            if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
                config.headers.Authorization = token;
            }
            return config;
        } catch (e) {
            return config;
        }
    },
    error => {
        return Promise.error(error);
    });
// // 响应拦截器
axios.interceptors.response.use(
  response => {

      if(response.data.code === 400002){
          router.push({name: "login"});

      }
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }

  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      console.log(error)
    }
    return Promise.reject(error.response);
  }
);

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url,
            {
                params: params
            })
            .then(res => {

                resolve(res.data);
            })
            .catch(err => {
                if (!err.response) {

                } else {
                    reject(err.data);
                    console.log(err.response, '异常2');
                }
            })
    });
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                if (!err.response) {
                    // alert('post请求')
                    // Message({
                    //   showClose: true,
                    //   message: 'post请求错误',
                    //   type: 'error'
                    // });
                } else {
                    reject(err.data);
                    console.log(err.response, '异常2');
                }
            })
    });
}

export function deletes(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            data: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url, params).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

export default axios
