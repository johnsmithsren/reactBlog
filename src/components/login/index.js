import React, { Component } from "react";
// import Hello from "../hello";
import { Col, Row, Form, Button } from "react-bootstrap";
// const _ = require("lodash");
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // updateIssues() {
  //   const issueObj = {
  //     name: "www",
  //     Col: "这是评论"
  //   };
  //   const newIssues = this.state.issues.slice();
  //   if (_.get(newIssues, "length") > 5) {
  //     return;
  //   } else {
  //     issueObj.id = newIssues.length + 1;
  //     newIssues.push(issueObj);
  //     this.setState({ issues: newIssues });
  //   }
  // }

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
  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.elements.email.value);
    console.log(e.target.elements.password.value);
  }

  render() {
    // const info = this.props.info;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column md="4">
            邮箱
          </Form.Label>
          <Col md="10">
            <Form.Control type="email" name="email" placeholder="Email" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column md="4">
            密码
          </Form.Label>
          <Col md="10">
            <Form.Control
              type="password"
              name="password"
              splaceholder="Password"
            />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          登录
        </Button>
      </Form>
    );
  }
}

export default Login;
