/*
 * @Auther: renjm
 * @Date: 2019-08-23 21:23:08
 * @LastEditTime: 2019-09-07 20:49:41
 * @Description: 登录页面
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Col, Row, Form, Button } from "react-bootstrap";
import { message } from "antd";
import userApi from "../../axiosApi/user";
const _ = require("lodash");
class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async e => {
    e.preventDefault();
    let params = {
      username: e.target.elements.username.value,
      email: e.target.elements.email.value,
      mobile: e.target.elements.mobile.value,
      password: e.target.elements.password.value
    };
    let result = await userApi.createUser(params);
    if (_.get(result, "message") === "success") {
      message.info(_.get(result, "message"));
      let { from } = this.props.location.state || {
        from: { pathname: "/login" }
      };
      let { history } = this.props;
      history.push(from);
    } else {
      message.info(_.get(result, "message"));
    }
  };

  render() {
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
              <Form.Group as={Row} controlId="formPlaintextMobile">
                <Form.Label column md="4">
                  手机
                </Form.Label>
                <Col md="10">
                  <Form.Control
                    type="mobile"
                    name="mobile"
                    placeholder="Mobile"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextUsername">
                <Form.Label column md="4">
                  用户名
                </Form.Label>
                <Col md="10">
                  <Form.Control
                    type="username"
                    name="username"
                    placeholder="Username"
                  />
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
                注册
              </Button>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(Signin);
