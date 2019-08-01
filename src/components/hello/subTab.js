/*
 * @Auther: renjm
 * @Date: 2019-07-31 13:33:36
 * @LastEditTime: 2019-07-31 23:24:50
 * @Description: 博客内容组件
 */

import React, { Component } from "react";
import { ListGroup, Row, Tab, Col } from "react-bootstrap";
import Pdf from "./pdf";
// import { Col } from "antd";
// import contentApi from "../../axiosApi/content";
// import { Table } from "react-bootstrap";
// 定义一个 hello 组件
class SubBlogTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type
    };
  }
  // async componentWillMount() {}
  async componentDidMount() {}

  // 在componentDidUpdate中进行异步操作，驱动数据的变化
  async componentDidUpdate(previousProps, previousState) {}
  render() {
    let blogRow = <p>敬请期待博客内容</p>;
    if (this.props.type === "blog") {
      blogRow = this.props.contentList.map(content => (
        <>
          <Row key={content.id} md={12}>
            <Col key={content.id}>
              <ListGroup key={content.id}>
                <ListGroup.Item
                  variant="light"
                  bsSize="sm"
                  key={content.id}
                  action
                  href={`#${content.id}`}
                >
                  {content.title}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row key={content.id} md={8}>
            <Col key={content.id}>
              <Tab.Content key={content.id}>
                <Tab.Pane key={content.id} eventKey={"#" + content.id}>
                  {content.content}
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </>
      ));
    }

    return this.props.type === "blog" ? (
      <Tab.Container id="list-group-blog">{blogRow}</Tab.Container>
    ) : (
      <Pdf />
    );
  }
}
export default SubBlogTab;
