/*
 * @Auther: renjm
 * @Date: 2019-07-31 13:33:36
 * @LastEditTime: 2019-07-31 17:51:23
 * @Description: 博客内容组件
 */

import React, { Component } from "react";
import { ListGroup, Row, Tab, Col } from "react-bootstrap";
// import { Col } from "antd";
import contentApi from "../../axiosApi/content";

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
    let blogRow = this.props.contentList.map(content => (
      <>
        <Row key={content.id} md={12}>
          <Col key={content.id}>
            <ListGroup key={content.id}>
              <ListGroup.Item key={content.id} action href={`#${content.id}`}>
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
    return (
      <Tab.Container id="list-group-tabs-example">{blogRow}</Tab.Container>
    );
  }
}
export default SubBlogTab;
