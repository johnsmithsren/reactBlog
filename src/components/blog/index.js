/*
 * @Auther: renjm
 * @Date: 2019-07-31 13:33:36
 * @LastEditTime: 2019-09-05 15:46:55
 * @Description: 博客内容组件
 */

import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { ListGroup, Row, Tab, Col, CardColumns, Card } from "react-bootstrap";
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
      pageSize: 5,
      totalPages: 1
    };
  }
  // async componentWillMount() {}
  async componentDidMount() {
    await this.getContent();
  }

  async getContent() {
    let contentInfo = await contentApi.listContent(this.state.active, 5);
    this.setState({
      contentList: _.get(contentInfo, "rows", []),
      totalPages: _.get(contentInfo, "count", 1)
    });
  }

  async pageHandler(active) {
    let contentInfo = await contentApi.listContent(active, 5);
    this.setState({
      contentList: _.get(contentInfo, "rows", []),
      totalPages: _.get(contentInfo, "count", 1)
    });
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
      //   blogRow = this.state.contentList.map(content => (
      //     <>
      //       <Row key={uuidv4()} md={12}>
      //         <Col key={uuidv4()}>
      //           <ListGroup key={uuidv4()} variant="flush">
      //             <ListGroup.Item
      //               key={uuidv4()}
      //               variant="light"
      //               bssize="sm"
      //               onClick={e => this.redirect(e, content)}
      //             >
      //               <Col key={uuidv4()} md="8">
      //                 <h5 key={uuidv4()}>{content.title}</h5>
      //               </Col>
      //               <Col key={uuidv4()}>
      //                 创建于{new Date(content.createTime * 1000).toLocaleString()}
      //               </Col>
      //               <Col key={uuidv4()}>
      //                 {content.updateTime
      //                   ? `更新于${new Date(
      //                       content.updateTime * 1000
      //                     ).toLocaleString()}`
      //                   : []}
      //               </Col>
      //             </ListGroup.Item>
      //           </ListGroup>
      //         </Col>
      //       </Row>
      //     </>
      //   ));
      let count = 0;
      blogRow = this.state.contentList.map((content, index) => {
        if (count === 3) {
          count = 0;
        }
        count++;
        if (count === 1) {
          return (
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body onClick={e => this.redirect(e, content)}>
                <Card.Title>{content.title}</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <small className="text-muted">
                  创建于{new Date(content.createTime * 1000).toLocaleString()}
                  <br />
                  {content.updateTime
                    ? `更新于${new Date(
                        content.updateTime * 1000
                      ).toLocaleString()}`
                    : []}
                </small>
              </Card.Body>
            </Card>
          );
        }
        if (count === 2) {
          return (
            <Card className="p-3">
              <blockquote className="blockquote mb-0 card-body">
                <p>{content.title}</p>
                <footer className="blockquote-footer">
                  <small className="text-muted">
                    创建于{new Date(content.createTime * 1000).toLocaleString()}
                    <br />
                    {content.updateTime
                      ? `更新于${new Date(
                          content.updateTime * 1000
                        ).toLocaleString()}`
                      : []}
                  </small>
                </footer>
              </blockquote>
            </Card>
          );
        }
        if (count === 3) {
          return (
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>{content.title}</Card.Title>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  创建于{new Date(content.createTime * 1000).toLocaleString()}
                  <br />
                  {content.updateTime
                    ? `更新于${new Date(
                        content.updateTime * 1000
                      ).toLocaleString()}`
                    : []}
                </small>
              </Card.Footer>
            </Card>
          );
        }
      });
    }

    return <CardColumns>{blogRow}</CardColumns>;
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
          totalPages={this.state.totalPages}
          pageSize="5"
          pageHandler={this.pageHandler.bind(this)}
        />
      </>
    );
  }
}
export default withRouter(SubBlogTab);
