import React, { Component } from "react";
// import Hello from "../hello";
import { Col, Row, Form, Button } from "react-bootstrap";
import loginApi from "../../axiosApi/login";
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

  componentDidMount() {
    this.loadData();
    // Subscribe to changes
  }

  componentWillUnmount() {}
  loadData() {}
  handleSubmit = async e => {
    e.preventDefault();
    let params = {
      username: e.target.elements.email.value,
      password: e.target.elements.password.value
    };
    let result = await loginApi.login(params);
    localStorage.setItem(params.username, result.data.token);
    this.props.history.push("login");
  };

  render() {
    // const info = this.props.info;
    return (
      <>
        <br />
        <br />
        <br />
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
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
                    placeholder="Password"
                  />
                </Col>
              </Form.Group>
              <Button variant="primary" type="submit">
                登录
              </Button>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}

export default Login;
