/*
 * @Auther: renjm
 * @Date: 2019-07-26 08:37:36
 * @LastEditTime: 2019-07-26 14:15:18
 * @Description:
 */
import React, { Component } from "react";
// import Hello from "../hello";
import { ListGroup, Row, Col, Tab } from "react-bootstrap";
const _ = require("lodash");
class BlogList extends Component {
  constructor() {
    super();
    // this.state = {
    //   email: "",
    //   password: ""
    // };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleChange(e) {}

  render() {
    return (
      <Row>
        <Col sm={{ span: 4, offset: 8 }}>
          <ListGroup>
            <ListGroup.Item action href="#link2">
              侧边栏
            </ListGroup.Item>
            <ListGroup.Item>侧边栏1</ListGroup.Item>
            <ListGroup.Item>侧边栏2</ListGroup.Item>
            <ListGroup.Item>侧边栏3</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    );
  }
}
export default BlogList;
