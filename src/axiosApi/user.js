/*
 * @Auther: renjm
 * @Date: 2019-07-27 11:22:54
 * @LastEditTime: 2019-09-07 09:01:55
 * @Description: 用户相关接口
 */

import Axios from "./axios";
import { message } from "antd";
const _ = require("lodash");
class UserManger {
  constructor() {
    this._axios = new Axios();
  }

  getUsersPageableList(page = 0, size = 20) {
    return this._axios.get(`/users?page=${page}&size=${size}`);
  }

  getUsersFullList() {
    return this._axios.get("/users/all");
  }

  getUser(id) {
    if (!id) {
      return Promise.reject(new Error(`getUser：id(${id})无效`));
    }
    return this._axios.get(`/users/${id}`);
  }
  createUser(data = {}) {
    if (_.isEmpty(data) || Object.keys(data).length !== 4) {
      return message.info("不能为空");
    }
    return this._axios.get("/create/user", data, {
      ...this.dataMethodDefaults
    });
  }

  updateUser(id, update = {}) {
    if (!update || !Object.keys(update).length) {
      return Promise.reject(new Error("updateUser：提交的数据无效"));
    }
    return this._axios.put(`/users/${id}`, update, {
      ...this.dataMethodDefaults
    });
  }

  deleteUser(id) {
    if (!id) {
      return Promise.reject(new Error(`deleteUser：id(${id})无效`));
    }
    return this._axios.delete(`/users/${id}`);
  }
}

export default new UserManger();
