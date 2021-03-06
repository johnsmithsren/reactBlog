/*
 * @Auther: renjm
 * @Date: 2019-08-23 21:23:08
 * @LastEditTime: 2019-09-07 22:42:45
 * @Description: 登录页面
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Col, Row, Form, Button } from "react-bootstrap";
import { message } from "antd";
import loginApi from "../../axiosApi/login";
const _ = require("lodash");
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      redirectToReferrer: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async e => {
    e.preventDefault();
    let params = {
      username: e.target.elements.email.value,
      password: e.target.elements.password.value
    };
    let result = await loginApi.login(params);
    if (_.get(result, "accessToken", false)) {
      let { history } = this.props;
      localStorage.setItem("token", JSON.stringify(result));
      let { from } = this.props.location.state || {
        from: { pathname: "/blog", query: result.username }
      };
      history.push(from);
    } else {
      message.info("用户名或密码错误");
    }
  };

  handleSignin() {
    let { from } = this.props.location.state || {
      from: { pathname: "/signin" }
    };
    let { history } = this.props;
    history.push(from);
  }

  render() {
    return (
      <>
        <br />
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column md="4">
                  邮箱、手机
                </Form.Label>
                <Col md="10">
                  <Form.Control name="email" placeholder="Email" />
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
              <Button variant="primary" value="signin" type="submit">
                登录
              </Button>
              <Button onClick={e => this.handleSignin(e)}>注册</Button>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}
export default withRouter(Login);
