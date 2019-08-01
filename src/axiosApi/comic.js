/*
 * @Auther: renjm
 * @Date: 2019-08-01 13:09:44
 * @LastEditTime: 2019-08-01 13:09:56
 * @Description: 获取漫画相关信息
 */

import Axios from "./axios";
const _ = require("lodash");
class ComicManager {
  constructor() {
    this._axios = new Axios();
  }

  /**
   * @description: 获取漫画列表
   * @param {type}
   * @return:
   */

  listComic() {
    return this._axios.get(`/list/comic`);
  }
}

export default new ComicManager();
