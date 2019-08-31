/*
 * @Auther: renjm
 * @Date: 2019-07-24 20:16:12
 * @LastEditTime: 2019-08-31 10:42:59
 * @Description:
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Container
  // DropdownButton,
  // Dropdown
} from "react-bootstrap";
const _ = require("lodash");

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: _.get(this, "props.location.query.content", "<p>暂无文章</p>")
    };
    // this.getContent = this.getContent.bind(this);
  }

  render() {
    let content = _.get(
      this,
      "props.location.query.content",
      "<p>暂无文章</p>"
    );
    return (
      <>
        <Container>
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
