/*
 * @Auther: renjm
 * @Date: 2019-08-23 21:23:08
 * @LastEditTime: 2019-08-30 20:56:19
 * @Description:
 */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
    this.setState({ redirectToReferrer: true });
  };

  state = { redirectToReferrer: false };

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

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
