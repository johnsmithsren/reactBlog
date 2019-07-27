/*
 * @Auther: renjm
 * @Date: 2019-07-26 08:37:36
 * @LastEditTime: 2019-07-27 19:19:45
 * @Description:
 */
import React, { Component } from "react";
// import Hello from "../hello";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import BlogList from "../ListGroup";
import Hello from "../hello";
import { Col, ButtonToolbar, Row } from "react-bootstrap";
const _ = require("lodash");
class BlogNavBar extends Component {
  constructor() {
    super();
    this.state = { issues: [{ id: 1, name: "hhh", Col: "这是一段评论" }] };
    this.updateIssues = this.updateIssues.bind(this);
    this.deleteIssues = this.deleteIssues.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleChange(e) {}
  updateIssues() {
    const issueObj = {
      name: "www",
      Col: "这是评论"
    };
    const newIssues = this.state.issues.slice();
    issueObj.id = newIssues.length + 1;
    newIssues.push(issueObj);
    this.setState({ issues: newIssues });
  }
  deleteIssues() {
    this.setState({ issues: [] });
  }
  render() {
    return (
      <>
        <br />
        <Row>
          <Col>
            <Navbar bg="light" variant="light">
              <Navbar.Brand onClick={this.updateIssues}>首页</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Item>
                  <Nav.Link onClick={this.updateIssues}>博客</Nav.Link>
                </Nav.Item>

                <Nav.Link onClick={this.deleteIssues}>漫画</Nav.Link>
                {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
              </Nav>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="搜索"
                  className="mr-sm-2"
                />
                <Button variant="outline-primary">搜索</Button>
              </Form>
            </Navbar>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={5}>
            {/* <Button variant="primary" onClick={this.updateIssues}>
              添加评论
            </Button> */}
            <Hello issueId={2} issues={this.state.issues} />
          </Col>

          <Col>
            <BlogList />
          </Col>
        </Row>
      </>
    );
  }
}
export default BlogNavBar;
