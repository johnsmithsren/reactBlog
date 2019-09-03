/*
 * @Auther: renjm
 * @Date: 2019-07-24 20:16:12
 * @LastEditTime: 2019-09-02 22:38:53
 * @Description:
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import contentApi from "../../axiosApi/content";
import "./blogContent.css";
const Markdown = require("react-markdown");
const _ = require("lodash");

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: _.get(this, "props.location.query.content", "<p>暂无文章</p>"),
      markdown: false
    };
    // this.getContent = this.getContent.bind(this);
  }

  change() {
    let from = {
      pathname: `/edit/${_.get(this, "props.location.query.id")}`
    };
    const { history } = this.props;
    history.push(from);
  }

  // changeToMarkdown() {
  //   if (this.state.markdown) {
  //     this.setState({ markdown: false });
  //   } else {
  //     this.setState({ markdown: true });
  //   }
  // }
  async delete() {
    await contentApi.deleteContent(_.get(this, "props.location.query.id"));
    let from = {
      pathname: `/blog`
    };
    const { history } = this.props;
    history.push(from);
  }

  render() {
    let content = _.get(
      this,
      "props.location.query.content",
      "<p>暂无文章</p>"
    );
    let type = _.get(this, "props.location.query.contentType", "normal");
    let title = _.get(this, "props.location.query.title", "<p>暂无文章</p>");
    return (
      <>
        <Container>
          <Row>
            <Col md={{ offset: "9" }}>
              <Button variant="light" onClick={e => this.change(e, "edit")}>
                编辑
              </Button>
              <Button variant="light" onClick={e => this.delete()}>
                删除
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <div
                className="title"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              {type === "markdown" ? (
                <div className="content">
                  <Markdown source={content} />
                </div>
              ) : (
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default withRouter(Content);
