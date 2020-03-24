/**
 * axios 配置
 * @author lhl
 * @date 2019/07/18
 */

import axios from "axios";

// 判定开发模式
if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "/api";
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL =
    "http:" +
    window.location.href.split(":")[1] +
    ":" +
    window.location.port +
    "/api";
}

// 设置全局头信息
axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";

// 全局设置超时时间
axios.defaults.timeout = 240000;

// 请求路由拦截
axios.interceptors.request.use(
  function (config) {
    let store = sessionStorage.store ? JSON.parse(sessionStorage.store) : {};
    if (store.token) {
      config.headers["authorization"] = store.token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 封装请求方法
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, JSON.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// query参数post
export function querypost(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, null, { params: params })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

// 文件下载请求
export function down(url, params, fileName) {
  let file = fileName;
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params }, { responseType: "blob" })
      .then(response => {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        const aEle = document.createElement("a"); // 创建a标签
        const href = window.URL.createObjectURL(blob); // 创建下载的链接
        aEle.href = href;
        aEle.download = file; // 下载后文件名
        document.body.appendChild(aEle);
        aEle.click(); // 点击下载
        document.body.removeChild(aEle); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
        resolve("success");
      })
      .catch(err => {
        reject(err);
      });
  });
}

// 执行多个并发请求
export function all() {
  var userPromise = Array.prototype.slice.apply(arguments);
  return new Promise((resolve, reject) => {
    axios
      .all(userPromise)
      .then(
        axios.spread(() => {
          resolve(arguments);
        })
      )
      .catch(error => {
        reject(error);
      });
  });
}
