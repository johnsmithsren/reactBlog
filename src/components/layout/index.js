import React, { Component } from "react";
import Hello from "../hello";
import Login from "../login";
import BlogNavBar from "../navBar";
import {
  Container,
  Badge,
  Col,
  Nav,
  Row,
  Button,
  ButtonToolbar
} from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.css";
// const _ = require("lodash");
// const FontAwesome = require('react-fontawesome');
class BlogLayout extends Component {
  constructor() {
    super();
    this.state = { issues: [{ id: 1, name: "hhh", Col: "这是一段评论" }] };
    this.updateIssues = this.updateIssues.bind(this);
  }
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

  componentDidMount() {
    this.loadData();
    // Subscribe to changes
  }

  componentWillUnmount() {}
  loadData() {
    // setInterval(() => {
    //   this.updateIssues();
    // }, 2000);
  }

  render() {
    // const info = this.props.info;
    return (
      <Container>
        <br />
        <Row className="justify-content-md-center">
          <Col md="12">
            <h2>
              JIM <Badge variant="secondary">博客</Badge>
            </h2>
          </Col>
        </Row>
        <BlogNavBar />
        {/* <Row>
          <Col md="auto">
            <ButtonToolbar>
              <Button variant="primary" onClick={this.updateIssues}>
                添加评论
              </Button>
            </ButtonToolbar>
            <Hello issueId={2} issues={this.state.issues} />
            <Login />
          </Col>
        </Row> */}
      </Container>
    );
  }
}

export default BlogLayout;
