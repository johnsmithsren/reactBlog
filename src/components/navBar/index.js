/*
 * @Auther: renjm
 * @Date: 2019-07-26 08:37:36
 * @LastEditTime: 2019-07-26 14:49:19
 * @Description:
 */
import React, { Component } from "react";
// import Hello from "../hello";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import BlogList from "../ListGroup";
import { Col, Row } from "antd";
const _ = require("lodash");
class BlogNavBar extends Component {
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
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home">首页</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Item>
              <Nav.Link href="#home">博客</Nav.Link>
            </Nav.Item>

            <Nav.Link href="#features">漫画</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="搜索" className="mr-sm-2" />
            <Button variant="outline-primary">搜索</Button>
          </Form>
        </Navbar>
        <BlogList />
      </Row>
    );
  }
}
export default BlogNavBar;
