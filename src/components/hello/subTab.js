/*
 * @Auther: renjm
 * @Date: 2019-07-31 13:33:36
 * @LastEditTime: 2019-07-31 13:36:30
 * @Description: 博客内容组件
 */

import React, { Component } from "react";
import { Form, ListGroup, Row, Tab } from "react-bootstrap";
import { Col } from "antd";
import contentApi from "../../axiosApi/content";

// import { Table } from "react-bootstrap";
// 定义一个 hello 组件
class Hello extends Component {
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
    return (
      <Tab.Container
        key={content.id}
        id="list-group-blog-tabs"
        // defaultActiveKey={content.id}
      >
        <Row>
          <Col sm={12}>
            <ListGroup>
              <ListGroup.Item action href={content.id}>
                {content.content}
              </ListGroup.Item>
              {/* <ListGroup.Item action href="#link2">
            Link 2
          </ListGroup.Item> */}
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey={"#" + content.id}>{content.id}</Tab.Pane>
              {/* <Tab.Pane eventKey="#link2">{12312312}</Tab.Pane> */}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}
export default Hello;
