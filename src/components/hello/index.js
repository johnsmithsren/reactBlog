/*
 * @Auther: renjm
 * @Date: 2019-07-24 20:16:12
 * @LastEditTime: 2019-08-28 22:36:23
 * @Description:
 */
import React, { Component } from "react";
// import { Row } from "antd";
// 定义一个行组件
// import Rows from "../rows";
import SubTab from "./subTab";
// import { Col } from "antd";
import contentApi from "../../axiosApi/content";
import comicApi from "../../axiosApi/comic";
// const uuidv4 = require("uuid/v4");
// import { Table } from "react-bootstrap";
// 定义一个 hello 组件
class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      contentList: [],
      comicList: []
    };
    this.getContent = this.getContent.bind(this);
  }
  // async componentWillMount() {}
  async componentDidMount() {
    await this.getContent();
    // this.setState({ helloRows: result });
  }
  async getContent() {
    let contentInfo = await contentApi.listContent();
    this.setState({ contentList: contentInfo });
    // return result;
  }
  async getComic() {
    let comicInfo = await comicApi.listComic();
    this.setState({ comicList: comicInfo });
    // return result;
  }

  // 在componentDidUpdate中进行异步操作，驱动数据的变化
  async componentDidUpdate(previousProps, previousState) {
    if (previousProps.type !== this.props.type) {
      if (this.props.type === "comic") {
        await this.getComic();
      }
      if (this.props.type === "blog") {
        await this.getContent();
      }
      if (this.props.type === "create") {
        await this.getContent();
      }

      // this.setState({ contentList: result });
    }
  }
  render() {
    return (
      <SubTab
        contentList={this.state.contentList}
        type={this.props.type}
        comicList={this.state.comicList}
        getComic={this.getComic.bind(this)}
        getContent={this.getContent.bind(this)}
      />
    );
  }
}
export default Hello;
