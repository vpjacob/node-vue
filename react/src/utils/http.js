import axios from "axios";
import * as _ from 'lodash';

// const base = "http://localhost:3000/chart/api";
const base = "http://39.106.18.19/chart/api";
const storage = window.localStorage

const buildPublicParams = (reqParams = {}) => {
  // reqParams.agent_id = global.agent_id;
  // reqParams.app_id = 'APITOUCH002';
  // reqParams.maoyankf_debug = 1;

  // let params1 = {}; // 排序 去空 然后生成token
  // Object.keys(reqParams).forEach(key => {
  //     //如果对象属性的值不为空，就保存该属性
  //     if ((reqParams[ key ]) && reqParams[ key ].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
  //         params1[ key ] = reqParams[ key ];
  //     }
  // });

  // let paramsStr = '';  // 加密获取token用 string
  // const newkey = Object.keys(params1).sort();
  // for (let i = 0; i < newkey.length; i++) {
  //     if (typeof (params1[ newkey[ i ] ]) !== 'object') {
  //         paramsStr = paramsStr + newkey[ i ] + params1[ newkey[ i ] ];
  //     }
  // }

  // // 添加token 属性
  // params1.token = md5(paramsStr + 'cb2021d99286bac00a6b815852e61b2c');

  return reqParams;
};


export const postFetch = (url, params = {}) => {
  return axios({
    url: base + url,
    method: 'post',
    responseType: 'json',
    data: buildPublicParams(params),
    timeout: 30000,
    headers: {
      'token': 'Bearer ' + _.get(storage.getItem('token') ,'' ,''),
    },
    // cancelToken : cancelToken,
    maxRedirects: 10,
  }).then(resp => {
    return resp.data;
  }).then(json => {
    // if (json.code == '1') {
    //     console.log('xxxxSuccess:', url, json.data, params);
    //     return json.data;
    // } else {
    //   console.log('xxxxFailed:', url, json, params);
    //     return {};
    // }
    return json
  }).catch(ex => {

    return {};
  });
};

// postFetch.interceptors.request.use((config) => {
//   if (localStorage.token) {
//     config.headers.Authorization = 'Bearer ' + localStorage.token
//   }
//   return config
// }, (err) => {
//   return Promise.reject(err)
// })

