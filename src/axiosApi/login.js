/*
 * @Auther: renjm
 * @Date: 2019-07-27 13:54:27
 * @LastEditTime: 2019-07-27 20:57:05
 * @Description: 登录相关接口
 */

import Axios from "./axios";
const _ = require("lodash");
class LoginManger {
  constructor() {
    this._axios = new Axios();
  }
  /**
   * @description: 登出接口
   * @param {type}
   * @return:
   */
  login(userInfo) {
    let _username = _.get(userInfo, "username");
    // let _password = _.get(userInfo, "password");
    if (!_username) {
      return Promise.reject(new Error(`登录无效：用户名称(${_username})`));
    }
    return this._axios.get(`/login`, userInfo);
  }

  /**
   * @description: 登录接口
   * @param {type}
   * @return:
   */
  logout(id) {
    if (!id) {
      return Promise.reject(new Error(`deleteUser：id(${id})无效`));
    }
    localStorage.removeItem(id);
    return this._axios.delete(`/users/${id}`);
  }
}

export default new LoginManger();
