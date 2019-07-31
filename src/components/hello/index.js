import React, { Component } from "react";
// import { Row } from "antd";
// 定义一个行组件
import Rows from "../rows";
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
    this.getContent = this.getContent.bind(this);
    this.helloRows = this.props.issues.map(issue => (
      <Rows key={issue.id} issueinfo={issue} />
    ));
  }
  // async componentWillMount() {}
  async componentDidMount() {
    let helloRows = this.props.issues.map(issue => (
      <Rows key={issue.id} issueinfo={issue} />
    ));
    if (this.props.type === "comic") {
      helloRows = <p>漫画</p>;
    }
    if (this.props.type === "blog" || this.props.type === "index") {
      let result = await this.getContent("blog");
      helloRows = result.map(content => (
        <Tab.Container
          key={content.id}
          id="list-group-tabs-example"
          defaultActiveKey={content.id}
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
      ));
    }
    if (this.props.type === "create") {
      helloRows = (
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>博客内容</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
      );
    }
    this.setState({ helloRows: helloRows });
  }
  async getContent(type) {
    let result = await contentApi.listContent(type);
    // this.setState({ contentList: result });
    return result;
  }

  // 在componentDidUpdate中进行异步操作，驱动数据的变化
  async componentDidUpdate(previousProps, previousState) {
    let helloRows = this.props.issues.map(issue => (
      <Rows key={issue.id} issueinfo={issue} />
    ));
    if (this.props.type === "comic") {
      helloRows = <p>漫画</p>;
    }
    if (this.props.type === "blog" || this.props.type === "index") {
      let result = await this.getContent("blog");

      helloRows = result.map(content => (
        <ListGroup key={content._id} variant="flush">
          <ListGroup.Item key={content._id}>{content.content}</ListGroup.Item>
        </ListGroup>
      ));
    }
    if (this.props.type === "create") {
      helloRows = (
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>博客内容</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
      );
    }
    if (previousProps.type !== this.props.type) {
      this.setState({ helloRows: helloRows });
    }
  }
  render() {
    return <Col>{this.state.helloRows}</Col>;
  }
}
export default Hello;
