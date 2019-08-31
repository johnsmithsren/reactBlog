/*
 * @Auther: renjm
 * @Date: 2019-08-23 21:23:08
 * @LastEditTime: 2019-08-31 10:07:23
 * @Description:
 */
import React, { Component } from "react";
import BlogNavBar from "../navigationBar";
import {
  Container,
  Badge,
  Col,
  Row,
  Navbar,
  Nav,
  Form,
  Button,
  FormControl
} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";
// import { HashRouter } from "react-router";
import Show from "../blogContent";
import Pdf from "../comicPdf/pdf";
import Editor from "../blogContentEditor";
import Login from "../login";

const InitIndex = withRouter(({ history }) => (
  <Container>
    <br />
    <Row className="justify-content-md-center">
      <Col md="10">
        <h2>
          <Link to="/blog">
            JIM <Badge variant="secondary">博客</Badge>
          </Link>
        </h2>
      </Col>
      <Col md="2">
        <button>
          <Link to="/login">登录</Link>
        </button>
      </Col>
    </Row>
    <br />
    <Row>
      <Col>
        <Navbar bg="light" variant="light">
          <Link to="/blog">
            <Navbar.Brand>首页</Navbar.Brand>
          </Link>

          <Link to="/blog">
            <Nav.Item>
              <Nav.Link disabled>博客</Nav.Link>
            </Nav.Item>
          </Link>

          <Link to="/comic">
            <Nav.Link disabled>漫画</Nav.Link>
          </Link>
          <Link to="/create">
            <Nav.Link disabled>写作</Nav.Link>
          </Link>

          <Form inline>
            <FormControl type="text" placeholder="搜索" className="mr-sm-2" />
            <Button variant="outline-primary">搜索</Button>
          </Form>
        </Navbar>
      </Col>
    </Row>
    <br />
  </Container>
));

/**
 * @description: 博客内容入口
 * @param {type}
 * @return:
 */
class BlogLayout extends Component {
  constructor() {
    super();
    this.state = { issues: [{ id: 1, name: "hhh", Col: "这是一段评论" }] };
    this.About = this.About.bind(this);
    this.Users = this.Users.bind(this);
  }

  componentDidMount() {
    this.loadData();
    // Subscribe to changes
  }

  componentWillUnmount() {}
  componentDidUpdate(pre) {
    const oldQuery = pre.location.query;
    const newQuery = this.props.location.query;
    if (oldQuery.status === newQuery.status) {
      return;
    }
    this.loadData();
  }
  loadData() {}

  /**
   * @description: 关于页面
   * @param {type}
   * @return:
   */
  About() {
    return <h2>About</h2>;
  }

  /**
   * @description: 用户信息展示
   * @param {type}
   * @return:
   */
  Users() {
    return <h2>Users</h2>;
  }

  render() {
    return (
      <Router>
        <InitIndex />
        <Route exact path="/about" component={this.About} />
        <Route exact path="/users" component={this.Users} />
        <Route exact path="/show" component={Show} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/blog" component={BlogNavBar} />
        <Route exact path="/comic" component={Pdf} />
        <Route exact path="/create" component={Editor} />
      </Router>
    );
  }
}

export default BlogLayout;
