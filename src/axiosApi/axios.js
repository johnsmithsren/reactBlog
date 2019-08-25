/*
 * @Auther: renjm
 * @Date: 2019-07-27 12:56:42
 * @LastEditTime: 2019-08-23 14:01:05
 * @Description: 对于axios进行统一封装
 */
const axios = require("axios");
const config = require("../config.json");

class Axios {
  constructor() {
    this._axios = axios.create({
      baseURL: `${config.axios.url}:${config.axios.port}`
    });
    this.init();
  }
  init() {
    // 请求过滤
    this._axios.interceptors.request.use(
      function(request) {
        // if (isHandlerEnabled(request)) {
        //   // Modify request here
        //   request.headers["X-CodePen"] =
        //     "https://codepen.io/teroauralinna/full/vPvKWe";
        // }
        return request;
      },
      function(error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // 返回过滤
    this._axios.interceptors.response.use(
      function(response) {
        // Do something with response data
        return response;
      },
      function(error) {
        // Do something with response error
        return Promise.reject(error);
      }
    );
  }
  /**
   * @description: 重写axios get 方法
   * @param {type}
   * @return:
   */
  async get(url, params = {}) {
    // 开始 loading
    // proxyUtil.startLoading();
    let _getResult = await this._axios
      .get(url, {
        params: params,
        validateStatus: function(status) {
          return status >= 200 && status < 300;
        }
      })
      .then(response => {
        // 结束 loading
        // proxyUtil.endLoading();
        // 返回后端返回数据
        return response.data;
      })
      .catch(error => {
        // 异常处理
        // proxyUtil.endLoading();
        // proxyUtil.alertMessage(error);
      })
      .finally(function() {
        // always executed
      });
    if (_getResult) {
      return _getResult;
    } else {
      return [];
    }
  }

  post(url, params = {}) {
    // 开始 loading
    // proxyUtil.startLoading();
    return this._axios
      .post(url, params)
      .then(response => {
        // 结束 loading
        // proxyUtil.endLoading();
        return response.data;
      })
      .catch(error => {
        console.log(error);
        // 异常处理
        // proxyUtil.endLoading();
        // proxyUtil.alertMessage(error);
      })
      .finally(function() {
        // always executed
      });
  }

  put(url, params = {}) {
    // 开始 loading
    // proxyUtil.startLoading();
    return this._axios
      .put(url, {
        params: params,
        validateStatus: function(status) {
          // axios 底层采用 Promise 实现，下方表达式表示只有返回 code 为 2xx 才被正常返回（resolve），非 2xx 全部当做异常（reject）
          return status >= 200 && status < 300;
        }
      })
      .then(response => {
        // 结束 loading
        // proxyUtil.endLoading();
        // 返回后端返回数据
        return response.data;
      })
      .catch(error => {
        // 异常处理
        // proxyUtil.endLoading();
        // proxyUtil.alertMessage(error);
      })
      .finally(function() {
        // always executed
      });
  }
  delete(url, params = {}) {
    // 开始 loading
    // proxyUtil.startLoading();
    return this._axios
      .delete(url, {
        params: params,
        validateStatus: function(status) {
          // axios 底层采用 Promise 实现，下方表达式表示只有返回 code 为 2xx 才被正常返回（resolve），非 2xx 全部当做异常（reject）
          return status >= 200 && status < 300;
        }
      })
      .then(response => {
        // 结束 loading
        // proxyUtil.endLoading();
        // 返回后端返回数据
        return response.data;
      })
      .catch(error => {
        // 异常处理
        // proxyUtil.endLoading();
        // proxyUtil.alertMessage(error);
      })
      .finally(function() {
        // always executed
      });
  }

  asyncAll(requests = []) {
    // 开始 loading
    // proxyUtil.startLoading();
    // 使用 axios 的 all 方法
    return this._axios
      .all(requests)
      .then(resultArr => {
        // 结束 loading
        // proxyUtil.endLoading();
        // 对结果做特殊化处理，此处是对返回接口 code 在一定范围内作信息弹框
        for (let result of resultArr) {
          let code = result.code;
          if (code > 220 || code < 200) {
            // proxyUtil.alertMessage(result.msg);
          }
        }
        //  返回每个方法返回的接口数据
        return resultArr;
      })
      .catch(error => {
        // 异常处理
        //   proxyUtil.endLoading()
        //   proxyUtil.alertMessage(error)
      })
      .finally(function() {
        // always executed
      });
  }
}
export default Axios;
