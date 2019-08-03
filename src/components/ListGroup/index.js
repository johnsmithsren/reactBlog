/*
 * @Auther: renjm
 * @Date: 2019-07-26 08:37:36
 * @LastEditTime: 2019-08-03 07:44:13
 * @Description:
 */
import contentApi from "../../axiosApi/content";
import comicApi from "../../axiosApi/comic";
import React, { Component } from "react";
// import Hello from "../hello";
import { ListGroup, Row, Col, Badge } from "react-bootstrap";
// import Hello from "../hello";
const _ = require("lodash");

class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = { topContent: <p>没有更新</p>, topComic: <p>没有更新</p> };
    // this.updateIssues = this.updateIssues.bind(this);
  }

  async componentDidMount() {
    let topContent = await contentApi.getTopBlog();
    let topComic = await comicApi.getTopComic();
    let _topContent = topContent.map(topcontent => (
      <ListGroup.Item>{topcontent.title}</ListGroup.Item>
    ));
    let _topComic = topComic.map(topcomic => (
      <ListGroup.Item>{topcomic.title}</ListGroup.Item>
    ));
    this.setState({ topContent: _topContent, topComic: _topComic });
  }

  componentWillUnmount() {}

  render() {
    return (
      <Row>
        <Col sm={{ offset: 4 }}>
          <Badge variant="secondary">最新更新</Badge>
          <ListGroup variant="flush">
            {this.state.topContent}
            {this.state.topComic}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}
export default BlogList;
