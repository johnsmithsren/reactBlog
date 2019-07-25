import React, { Component } from "react";
import Hello from "../hello";

import { Container, Col, Row, Button, ButtonToolbar } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.css";
const _ = require("lodash");
class BlogLayout extends Component {
  constructor() {
    super();
    this.state = { issues: [{ id: 1, name: "hhh", Col: "这是一段评论" }] };
    setInterval(this.updateIssues.bind(this), 2000);
  }
  updateIssues() {
    const issueObj = {
      name: "www",
      Col: "这是评论"
    };
    const newIssues = this.state.issues.slice();
    if (_.get(newIssues, "length") === 5) {
      this.setState({ issues: newIssues });
    } else {
      issueObj.id = newIssues.length + 1;
      newIssues.push(issueObj);
      this.setState({ issues: newIssues });
    }
  }
  render() {
    // const info = this.props.info;
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="2" />
          <Col md="auto" />
          <Col xs lg="2" />
        </Row>
        <Row>
          <Col md="auto">
            <ButtonToolbar>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="info">Info</Button>
              <Button variant="light">Light</Button>
              <Button variant="dark">Dark</Button>
              <Button variant="link">Link</Button>
            </ButtonToolbar>
            <Hello issueId={2} issues={this.state.issues} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BlogLayout;
