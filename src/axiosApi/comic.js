/*
 * @Auther: renjm
 * @Date: 2019-08-01 13:09:44
 * @LastEditTime: 2019-08-23 21:18:38
 * @Description: 获取漫画相关信息
 */

import Axios from "./axios";
// const _ = require("lodash");
class ComicManager {
  constructor() {
    this._axios = new Axios();
  }

  /**
   * @description: 获取漫画列表
   * @param {type}
   * @return:
   */

  async listComic() {
    return await this._axios.get(`/list/comic`);
  }

  /**
   * @description: 获取最新漫画 名称
   * @param {type}
   * @return:
   */
  async getTopComic() {
    return await this._axios.get(`/list/top/comic`);
  }
}

export default new ComicManager();
