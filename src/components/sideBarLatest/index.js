/*
 * @Auther: renjm
 * @Date: 2019-07-26 08:37:36
 * @LastEditTime: 2019-09-05 12:48:52
 * @Description: 主要是存放博客 和 漫画的最新更新内容
 */
import contentApi from "../../axiosApi/content";
import comicApi from "../../axiosApi/comic";
import React, { Component } from "react";
import { ListGroup, Row, Col, Badge } from "react-bootstrap";
const uuidv4 = require("uuid/v4");
const _ = require("lodash");
class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topContent: <p>漫画没有更新</p>,
      topComic: <p>博客没有更新</p>
    };
  }

  async componentDidMount() {
    let topContent = await contentApi.getTopBlog();
    let topComic = await comicApi.getTopComic();
    let _topContent = topContent.map(topcontent => (
      <ListGroup.Item key={uuidv4()}>{topcontent.title}</ListGroup.Item>
    ));
    let _topComic = topComic.map(topcomic => (
      <ListGroup.Item key={uuidv4()}>
        {topcomic.title}
        {_.get(
          _.split(_.get(_.split(_.get(topcomic, "path"), "."), "0"), "/"),
          "2"
        )}
      </ListGroup.Item>
    ));
    this.setState({ topContent: _topContent, topComic: _topComic });
  }

  componentWillUnmount() {}

  render() {
    return (
      <Row>
        <Col>
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
