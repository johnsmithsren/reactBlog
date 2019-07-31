/*
 * @Auther: renjm
 * @Date: 2019-07-30 13:00:26
 * @LastEditTime: 2019-07-30 20:50:15
 * @Description:
 */

import Axios from "./axios";
const _ = require("lodash");
class ContentManger {
  constructor() {
    this._axios = new Axios();
  }
  /**
   * @description: 创建文章
   * @param {type}
   * @return:
   */
  createContent(userInfo) {
    let _username = _.get(userInfo, "username");
    // let _password = _.get(userInfo, "password");
    if (!_username) {
      return Promise.reject(new Error(`登录无效：用户名称(${_username})`));
    }
    return this._axios.post(`/create/content`, userInfo);
  }

  /**
   * @description: 编辑博客文章
   * @param {type}
   * @return:
   */
  deleteContent(id) {
    return this._axios.delete(`/delete/content`, id);
  }

  /**
   * @description: 编辑博客
   * @param {type}
   * @return:
   */
  editContent(id, content) {
    return this._axios.post(`/update/content`);
  }

  /**
   * @description: 博客列表
   * @param {type}
   * @return:
   */

  listContent(id, content) {
    return this._axios.get(`/list/content`);
  }
}

export default new ContentManger();
