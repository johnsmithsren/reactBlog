/*
 * @Auther: renjm
 * @Date: 2019-07-30 13:00:26
 * @LastEditTime: 2019-08-03 17:26:41
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
  createContent(contentInfo) {
    return this._axios.post(`/create/content`, contentInfo);
  }

  /**
   * @description: 编辑博客
   * @param {type}
   * @return:
   */

  editContent(contentInfo) {
    return this._axios.post(`/edit/content`, contentInfo);
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
   * @description: 博客列表
   * @param {type}
   * @return:
   */

  listContent() {
    return this._axios.get(`/list/content`);
  }

  /**
   * @description: 获取最新的博客名称
   * @param {type}
   * @return:
   */

  getTopBlog() {
    return this._axios.get(`/list/top/content`);
  }
}

export default new ContentManger();
