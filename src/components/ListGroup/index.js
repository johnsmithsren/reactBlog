/*
 * @Auther: renjm
 * @Date: 2019-07-26 08:37:36
 * @LastEditTime: 2019-07-31 21:32:41
 * @Description:
 */
import React, { Component } from "react";
// import Hello from "../hello";
import { ListGroup, Row, Col, ButtonToolbar, Button } from "react-bootstrap";
import Hello from "../hello";
const _ = require("lodash");

class BlogList extends Component {
  constructor() {
    super();
    this.state = { issues: [{ id: 1, name: "hhh", Col: "这是一段评论" }] };
    // this.updateIssues = this.updateIssues.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleChange(e) {}

  render() {
    return (
      <Row>
        <Col sm={{ offset: 4 }}>
          <ListGroup>
            <ListGroup.Item action href="#link2">
              侧边栏
            </ListGroup.Item>
            <ListGroup.Item>侧边栏1</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    );
  }
}
export default BlogList;
