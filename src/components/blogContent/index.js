/*
 * @Auther: renjm
 * @Date: 2019-07-24 20:16:12
 * @LastEditTime: 2019-08-31 14:49:03
 * @Description:
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import contentApi from "../../axiosApi/content";
const _ = require("lodash");

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: _.get(this, "props.location.query.content", "<p>暂无文章</p>")
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
  delete() {
    contentApi.deleteContent(_.get(this, "props.location.query.id"));
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
    let title = _.get(this, "props.location.query.title", "<p>暂无文章</p>");
    return (
      <>
        <Container>
          <Row>
            <Col md={{ offset: "10" }}>
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
              <div dangerouslySetInnerHTML={{ __html: title }} />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default withRouter(Content);
