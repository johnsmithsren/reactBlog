/*
 * @Auther: renjm
 * @Date: 2019-07-26 08:37:36
 * @LastEditTime: 2019-08-31 10:44:51
 * @Description:
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import BlogSectorLatestInfo from "../sideBarLatest";
import BlogSector from "../blog";
import { Col, Row, Container } from "react-bootstrap";
class BlogNavBar extends Component {
  constructor() {
    super();
    this.state = {
      issues: [{ id: 1, name: "hhh", Col: "这是一段评论" }],
      type: "blog"
    };
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md="10">
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
      </Container>
    );
  }
}
export default withRouter(BlogNavBar);
