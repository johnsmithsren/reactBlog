/*
 * @Auther: renjm
 * @Date: 2019-07-27 11:22:54
 * @LastEditTime: 2019-07-27 13:54:19
 * @Description: 用户相关接口
 */

import Axios from "./axios";

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
    if (!data || !Object.keys(data).length) {
      return Promise.reject(new Error("createUser：提交的数据无效"));
    }
    return this._axios.post("/users", data, { ...this.dataMethodDefaults });
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
