/*
 * @Auther: renjm
 * @Date: 2019-07-27 13:54:27
 * @LastEditTime: 2019-09-06 21:17:05
 * @Description: 登录相关接口
 */

import Axios from "./axios";
import { message } from "antd";
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
      message.info("请填写用户名");
      return;
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
      return message.info("参数错误");
    }
    localStorage.removeItem(id);
    return this._axios.delete(`/users/${id}`);
  }
}

export default new LoginManger();
