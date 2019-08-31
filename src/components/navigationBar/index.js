/*
 * @Auther: renjm
 * @Date: 2019-07-26 08:37:36
 * @LastEditTime: 2019-08-30 21:28:33
 * @Description:
 */
import React, { Component } from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
// import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import BlogSectorLatestInfo from "../sideBarLatest";
import BlogSector from "../blog";
import { Col, Row } from "react-bootstrap";
class BlogNavBar extends Component {
  constructor() {
    super();
    this.state = {
      issues: [{ id: 1, name: "hhh", Col: "这是一段评论" }],
      type: "blog"
    };
    this.updateNavBarType = this.updateNavBarType.bind(this);
  }

  updateNavBarType(type) {
    this.setState({ type: type });
  }
  deleteIssues() {
    this.setState({ issues: [] });
  }

  render() {
    return (
      <>
        <Row>
          <Col md={7}>
            <BlogSector
              issueId={2}
              issues={this.state.issues}
              type={this.state.type}
            />
          </Col>

          <Col>
            <BlogSectorLatestInfo />
          </Col>
        </Row>
      </>
    );
  }
}
export default withRouter(BlogNavBar);
