import React, { Component } from "react";
// import { Row } from "antd";
// 定义一个行组件
// import Rows from "../rows";
import SubTab from "./subTab";
// import { Col } from "antd";
import contentApi from "../../axiosApi/content";

// import { Table } from "react-bootstrap";
// 定义一个 hello 组件
class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      contentList: []
    };
    this.getContent = this.getContent.bind(this);
  }
  // async componentWillMount() {}
  async componentDidMount() {
    await this.getContent(this.props.type);
    // this.setState({ helloRows: result });
  }
  async getContent(type) {
    let result = await contentApi.listContent(type);
    this.setState({ contentList: result });
    // return result;
  }

  // 在componentDidUpdate中进行异步操作，驱动数据的变化
  async componentDidUpdate(previousProps, previousState) {
    if (previousProps.type !== this.props.type) {
      await this.getContent(this.props.type);
      // this.setState({ contentList: result });
    }
  }
  render() {
    return (
      <SubTab contentList={this.state.contentList} type={this.props.type} />
    );
  }
}
export default Hello;
