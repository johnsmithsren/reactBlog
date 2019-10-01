/*
 * @Auther: renjm
 * @Date: 2019-07-26 08:37:36
 * @LastEditTime: 2019-10-01 20:57:52
 * @Description: 主要是存放博客 和 漫画的最新更新内容 侧边栏
 */
import contentApi from "../../axiosApi/content";
import comicApi from "../../axiosApi/comic";
import React, { Component } from "react";
import { PageHeader } from 'antd';
import { ListGroup, Row, Col } from "react-bootstrap";
const uuidv4 = require("uuid/v4");
const _ = require("lodash");
class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topContent: <></>,
      topComic: <></>
    };
  }

  /**
   * @description: 组件加载后从服务器分别获取最新的漫画 和 博客 内容
   * @param {type}
   * @return:
   */
  async componentDidMount() {
    let topContent = await contentApi.getTopBlog();
    let topComic = await comicApi.getTopComic();
    let _topContent = topContent.map(topcontent => (
      <ListGroup.Item key={uuidv4()} style={{ border: '2px solid', 'border-radius': '25px', opacity: '0.8' }}>{topcontent.title}</ListGroup.Item>
    ));
    let _topComic = topComic.map(topcomic => (
      <ListGroup.Item key={uuidv4()} style={{ border: '2px solid', 'border-radius': '25px', opacity: '0.8' }}>
        {topcomic.title}
        {_.get(
          _.split(_.get(_.split(_.get(topcomic, "path"), "."), "0"), "/"),
          "2"
        )}
      </ListGroup.Item>
    ));
    this.setState({ topContent: _topContent, topComic: _topComic });
  }

  componentWillUnmount() { }

  render() {
    return (
      <Row>
        <Col>

          <React.Fragment>
            <PageHeader title={'最新更新'} style={{ border: '2px solid', 'border-radius': '25px', opacity: '0.8' }} />
            <ListGroup variant="flush" >
              {this.state.topContent}
              {this.state.topComic}
            </ListGroup>

          </React.Fragment>

        </Col>
      </Row>
    );
  }
}
export default BlogList;
