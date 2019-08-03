/*
 * @Auther: renjm
 * @Date: 2019-07-31 13:33:36
 * @LastEditTime: 2019-08-03 17:34:12
 * @Description: 博客内容组件
 */

import React, { Component } from "react";
import {
  ListGroup,
  Row,
  Tab,
  Col,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import Dialogue from "../dialogue";
import contentApi from "../../axiosApi/content";
import Pdf from "./pdf";
const _ = require("lodash");

// 定义一个 hello 组件
class SubBlogTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      keyPaht: "#",
      handleShow: false
    };
  }
  // async componentWillMount() {}
  async componentDidMount() {}

  setKey(e) {
    let _keypath = _.get(this.state, "keyPath");
    if (e.target.localName === "div") {
      if (
        _.get(e, "target.attributes.href.value") !== undefined &&
        _keypath !== _.get(e, "target.attributes.href.value")
      ) {
        this.setState({ keyPath: e.target.attributes.href.value });
      } else {
        this.setState({ keyPath: "#" });
      }
    } else {
      if (_keypath !== e.target.hash) {
        this.setState({ keyPath: e.target.hash });
      } else {
        this.setState({ keyPath: "#" });
      }
    }
  }

  async handleDropdownClick(e, content) {
    if (_.get(e, "target.attributes.prefix.value") === "edit") {
      this.setState({
        handleShow: true,
        contentInfo: content
      });
    }
    if (_.get(e, "target.attributes.prefix.value") === "create") {
      this.setState({
        handleShow: true,
        contentInfo: []
      });
    }
    if (_.get(e, "target.attributes.prefix.value") === "delete") {
      await contentApi.deleteContent({ id: _.get(content, "id") });
      await this.props.getContent();
      // await this.props.getComic();
    }
    if (_.get(e, "target.attributes.handle.value") === "open") {
      this.setState({ handleShow: true });
    }
    if (
      e === "close" ||
      _.get(e, "target.attributes.handle.value") === "close"
    ) {
      this.setState({ handleShow: false });
      await this.props.getContent();
      await this.props.getComic();
    }
  }

  // 在componentDidUpdate中进行异步操作，驱动数据的变化
  async componentDidUpdate(previousProps, previousState) {}
  render() {
    let blogRow = <p>敬请期待博客内容</p>;
    if (this.props.type === "blog") {
      blogRow = this.props.contentList.map(content => (
        <>
          <Row key={content.id} md={12}>
            <Col key={content.id}>
              <ListGroup variant="flush" key={content.id}>
                <ListGroup.Item
                  variant="light"
                  bsSize="sm"
                  key={content.id}
                  onClick={k => this.setKey(k)}
                  action
                >
                  <Row>
                    <Col href={`#${content.id}`} onClick={k => this.setKey(k)}>
                      {content.title}
                    </Col>
                    <Col md={{ offset: 2, span: 2 }}>
                      <DropdownButton
                        title="操作"
                        variant="flush"
                        id={`dropdown-variants`}
                        key="Secondary"
                      >
                        <Dropdown.Item
                          eventKey="1"
                          prefix="edit"
                          handle="open"
                          onClick={e => this.handleDropdownClick(e, content)}
                        >
                          编辑
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="2"
                          prefix="delete"
                          onClick={e => this.handleDropdownClick(e, content)}
                        >
                          删除
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="3"
                          prefix="create"
                          onClick={e => this.handleDropdownClick(e, content)}
                        >
                          创建
                        </Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Row>
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
      <>
        <Tab.Container id="list-group-blog" activeKey={this.state.keyPath}>
          {blogRow}
        </Tab.Container>
        <Dialogue
          handleDropdownClick={this.handleDropdownClick.bind(this)}
          contentInfo={this.state.contentInfo}
          handleShow={this.state.handleShow}
        />
      </>
    ) : (
      <Pdf comicList={this.props.comicList} />
    );
  }
}
export default SubBlogTab;
