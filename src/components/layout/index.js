import React, { Component } from "react";
import BlogNavBar from "../navBar";
import { Container, Badge, Col, Row, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Login from "../login";
class BlogLayout extends Component {
  constructor() {
    super();
    this.state = { issues: [{ id: 1, name: "hhh", Col: "这是一段评论" }] };
    this.Index = this.Index.bind(this);
    this.About = this.About.bind(this);
    this.Users = this.Users.bind(this);
  }

  componentDidMount() {
    this.loadData();
    // Subscribe to changes
  }

  componentWillUnmount() {}
  loadData() {}

  Index() {
    return (
      <Router>
        <Container>
          <br />
          <Row className="justify-content-md-center">
            <Col md="10">
              <h2>
                <Link to="/index/">
                  JIM <Badge variant="secondary">博客</Badge>
                </Link>
              </h2>
            </Col>
            <Col>
              <Button href="/login/">登录</Button>
            </Col>
          </Row>
          <BlogNavBar />
        </Container>
        {/* <Route path="/login/" exact component={Login} /> */}
      </Router>
    );
  }

  About() {
    return <h2>About</h2>;
  }

  Users() {
    return <h2>Users</h2>;
  }
  render() {
    // const info = this.props.info;
    return (
      <Router>
        <Route path="/" exact={true} component={this.Index} />
        <Route path="/about/" exact={true} component={this.About} />
        <Route path="/users/" exact={true} component={this.Users} />
        <Route path="/login/" exact component={Login} />
        <Route path="/index/" exact component={this.Index} />
      </Router>
    );
  }
}

export default BlogLayout;
