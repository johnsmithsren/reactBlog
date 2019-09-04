/*
 * @Auther: renjm
 * @Date: 2019-07-31 13:33:36
 * @LastEditTime: 2019-09-04 13:14:34
 * @Description: 博客内容组件
 */

import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { ListGroup, Row, Tab, Col } from "react-bootstrap";
import PaginationHandle from "../pagination";
import contentApi from "../../axiosApi/content";
const _ = require("lodash");
const uuidv4 = require("uuid/v4");

// 定义一个 博客列表 组件
class SubBlogTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      keyPath: "#",
      handleShow: false,
      redirect: false,
      redirectToReferrer: false,
      contentList: [],
      active: 1,
      pageSize: 5
    };
  }
  // async componentWillMount() {}
  async componentDidMount() {
    await this.getContent();
  }

  async getContent() {
    let contentInfo = await contentApi.listContent(this.state.active, 5);
    this.setState({ contentList: contentInfo });
  }

  async pageHandler(active) {
    let contentInfo = await contentApi.listContent(active, 5);
    this.setState({ contentList: contentInfo });
  }

  /**
   * @description:  构建 博客的内容
   * @param {type}
   * @return:
   */
  getBlogRow() {
    let blogRow = <p>敬请期待博客内容</p>;
    if (this.state.redirect) {
      return <Redirect to={{ from: { pathname: "/show" } }} />;
    }
    if (this.state.type === "blog") {
      // var htmlToReactParser = new HtmlToReactParser();
      blogRow = this.state.contentList.map(content => (
        <>
          <Row key={uuidv4()} md={12}>
            <Col key={uuidv4()}>
              <ListGroup key={uuidv4()} variant="flush">
                <ListGroup.Item
                  key={uuidv4()}
                  variant="light"
                  bssize="sm"
                  onClick={e => this.redirect(e, content)}
                >
                  <Col key={uuidv4()} md="8">
                    <h5 key={uuidv4()}>{content.title}</h5>
                  </Col>
                  <Col key={uuidv4()}>
                    {new Date(content.createTime * 1000).toLocaleString()}
                  </Col>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      ));
    }
    return blogRow;
  }

  redirect = (e, content) => {
    this.setState({ redirectToReferrer: true, currentContent: content });
  };

  render() {
    let { from } = this.props.location.state || {
      from: { pathname: "/content", query: this.state.currentContent }
    };
    let { redirectToReferrer } = this.state;
    const { history } = this.props;

    if (redirectToReferrer) {
      history.push(from);
      this.setState({ redirectToReferrer: false });
    }
    return (
      <>
        <Tab.Container
          id="list-group-blog"
          defaultActiveKey={this.state.keyPath}
        >
          {this.getBlogRow()}
        </Tab.Container>
        <PaginationHandle
          totalPages={_.get(this.state.contentList, "0.count")}
          pageSize="5"
          pageHandler={this.pageHandler.bind(this)}
        />
      </>
    );
  }
}
export default withRouter(SubBlogTab);
