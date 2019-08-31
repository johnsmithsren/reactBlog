/*
 * @Auther: renjm
 * @Date: 2019-07-24 20:16:12
 * @LastEditTime: 2019-08-31 10:57:28
 * @Description:
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BlogList from "./blogList";
import contentApi from "../../axiosApi/content";
// 定义一个 hello 组件
class Blog extends Component {
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
  }
  async getContent() {
    let contentInfo = await contentApi.listContent();
    this.setState({ contentList: contentInfo });
  }

  // 在componentDidUpdate中进行异步操作，驱动数据的变化
  async componentDidUpdate(previousProps, previousState) {
    if (previousProps.type !== this.props.type) {
      await this.getContent();

      // this.setState({ contentList: result });
    }
  }
  render() {
    return (
      <BlogList
        contentList={this.state.contentList}
        type={this.props.type}
        comicList={this.state.comicList}
        getContent={this.getContent.bind(this)}
      />
    );
  }
}
export default withRouter(Blog);
