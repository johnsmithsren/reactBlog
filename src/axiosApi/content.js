/*
 * @Auther: renjm
 * @Date: 2019-07-30 13:00:26
 * @LastEditTime: 2019-09-02 22:53:44
 * @Description:
 */

import Axios from "./axios";
// const _ = require("lodash");
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
   * @description: 获取博客内容
   * @param {type}
   * @return:
   */
  getContent(id) {
    return this._axios.get(`/get/content`, { id: id });
  }
  /**
   * @description: 删除博客
   * @param {type}
   * @return:
   */
  deleteContent(id) {
    return this._axios.delete(`/delete/content`, { id: id });
  }

  /**
   * @description: 编辑博客文章
   * @param {type}
   * @return:
   */
  async editContent(contentInfo) {
    return this._axios.post(`/edit/content`, contentInfo);
  }

  /**
   * @description: 博客列表
   * @param {type} pageSize 每页大小
   * @param {number} page 第几页
   * @return:
   */

  listContent(pageSize, page) {
    return this._axios.get(`/list/content`, { pageSize: pageSize, page: page });
  }

  /**
   * @description: 获取最新的博客名称
   * @param {type}
   * @return:
   */

  async getTopBlog() {
    return await this._axios.get(`/list/top/content`);
  }
}

export default new ContentManger();
