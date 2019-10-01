/*
 * @Auther: renjm
 * @Date: 2019-08-23 21:23:08
 * @LastEditTime: 2019-10-01 11:15:40
 * @Description:
 */
import React from "react";
import BlogNavBar from "../navigationBar";
import { Container, Badge, Col, Row, Navbar } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";
// import { HashRouter } from "react-router";

import Show from "../blogContent";
import Pdf from "../comicPdf/pdf";
import Editor from "../blogContentEditor";
import Login from "../login";
import Signin from "../signin";
const _ = require("lodash");

/**
 * @description: 关于页面
 * @param {type}
 * @return:
 */
function About() {
  return <h2>About</h2>;
}

/**
 * @description: 用户信息展示
 * @param {type}
 * @return:
 */
function Users() {
  return <h2>Users</h2>;
}

const Authenticated = {
  isLogin: false,
  username: "",
  login() {
    let userinfo = localStorage.getItem("token");
    if (userinfo) {
      userinfo = JSON.parse(userinfo);
      this.username = _.get(userinfo, "username");
    }
    this.isLogin = true;
    return this.username;
  },
  signout(history) {
    localStorage.removeItem("token");
    this.isLogin = false;
    this.username = "";
    let { from } = {
      from: { pathname: "/blog" }
    };
    history.push(from);
  }
};

const Auth = withRouter(({ history }) => (
  <Container>


    <br />
    <Row className="justify-content-md-center">
      <Col md="10">
        <h2>
          JIM <Badge variant="secondary">博客</Badge>
        </h2>
      </Col>

      <Col md="2">
        {Authenticated.login() ? (
          <div>
            <p>欢迎，{Authenticated.username}</p>

            <p
              onClick={() => {
                Authenticated.signout(history);
              }}
            >
              退出
            </p>
          </div>
        ) : (
            <Link to="/login">登录</Link>
          )}
      </Col>
    </Row>
    <Row className="justify-content-md-start">
      <Col>
        <h6> 欢迎来star（￣︶￣）↗</h6>
        <iframe
          className="githubIframe"
          frameBorder="0"
          scrolling="0"
          width="100px"
          height="20px"
          title="欢迎来star（￣︶￣）↗"
          src="https://ghbtns.com/github-btn.html?user=johnsmithsren&repo=reactBlog&type=star&count=true"
        ></iframe>
      </Col>
    </Row>
    <br />
    <Row>
      <Col md="8">
        <Navbar variant="light">
          <Link to="/blog">
            <Navbar.Brand>首页</Navbar.Brand>
          </Link>
          <Link to="/blog">
            <Navbar.Brand>博客</Navbar.Brand>
          </Link>
          <Link to="/comic">
            <Navbar.Brand>漫画</Navbar.Brand>
          </Link>
          {Authenticated.login() ? (
            <Link to="/create">
              <Navbar.Brand>写作</Navbar.Brand>
            </Link>
          ) : (
              []
            )}
        </Navbar>
      </Col>
    </Row>
    <br />
  </Container>
));
/**
 * @description: 用户信息展示
 * @param {type}
 * @return:
 */
// function NotFound() {
//   return <h2>页面未找到</h2>;
// }
function BlogLayout() {
  return (
    <Router>
      <Auth />
      <Switch>
        <Route exact path="/" component={BlogNavBar} />
        <Route path="/about" component={About} />
        <Route path="/users" component={Users} />
        <Route path="/content" component={Show} />
        <Route path="/login" component={Login} />
        <Route path="/blog" component={BlogNavBar} />
        <Route path="/comic" component={Pdf} />
        <Route path="/create" component={Editor} />
        <Route path="/edit/:id" component={Editor} />
        <Route path="/signin" component={Signin} />
      </Switch>
    </Router>
  );
}
/**
 * @description: 博客内容入口
 * @param {type}
 * @return:
 */

export default BlogLayout;
