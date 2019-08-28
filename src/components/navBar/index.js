/*
 * @Auther: renjm
 * @Date: 2019-07-26 08:37:36
 * @LastEditTime: 2019-08-28 10:11:06
 * @Description:
 */
import React, { Component } from "react";
// import Hello from "../hello";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import BlogList from "../ListGroup";
import Hello from "../hello";
import { Col, Row } from "react-bootstrap";
// const uuidv4 = require("uuid/v4");
// const _ = require("lodash");
class BlogNavBar extends Component {
  constructor() {
    super();
    this.state = {
      issues: [{ id: 1, name: "hhh", Col: "这是一段评论" }],
      type: "blog"
    };
    this.updateIssues = this.updateIssues.bind(this);
    this.deleteIssues = this.deleteIssues.bind(this);
    this.updateNavBarType = this.updateNavBarType.bind(this);
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
  updateNavBarType(type) {
    // console.log(type);
    this.setState({ type: type });
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
              <Navbar.Brand onClick={this.updateNavBarType.bind(this, "blog")}>
                首页
              </Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Item>
                  <Nav.Link onClick={this.updateNavBarType.bind(this, "blog")}>
                    博客
                  </Nav.Link>
                </Nav.Item>
                <Nav.Link onClick={this.updateNavBarType.bind(this, "comic")}>
                  漫画
                </Nav.Link>
                <Nav.Link onClick={this.updateNavBarType.bind(this, "create")}>
                  写作
                </Nav.Link>

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
          <Col md={7}>
            <Hello
              issueId={2}
              issues={this.state.issues}
              type={this.state.type}
            />
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
