/*
 * @Auther: renjm
 * @Date: 2019-08-28 09:07:33
 * @LastEditTime: 2019-08-31 08:34:34
 * @Description: 使用的是一个富文本编辑器插件
 */
import "braft-editor/dist/index.css";
import React, { Component } from "react";
import BraftEditor from "braft-editor";
import contentApi from "../../axiosApi/content";
import { Row, Button, Form, Col } from "react-bootstrap";
const _ = require("lodash");
export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      keyPaht: "#",
      handleShow: false,
      editorState: null
    };
  }

  async componentDidMount() {
    // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await this.props.getContent();
    const htmlContent = <p>你好</p>;
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
    this.setState({
      editorState: BraftEditor.createEditorState(htmlContent)
    });
  }

  submitContent = async id => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    let title = this.refs.title.value;
    const htmlContent = this.state.editorState.toHTML();
    if (id) {
      let contentInfo = {
        content: htmlContent,
        title: title,
        id: id
      };
      await contentApi.editContent(contentInfo);
    } else {
      let contentInfo = {
        content: htmlContent,
        title: title
      };
      await contentApi.createContent(contentInfo);
    }
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const { editorState } = this.state;
    let id = _.get(this.props, "contentInfo.id");
    return (
      <Form>
        <Form.Group as={Row} controlId="formHorizontalTitle">
          <Form.Label column sm={2}>
            正文标题
          </Form.Label>
          <Col sm={10}>
            <Form.Control ref="title" placeholder="标题" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalContent">
          <Form.Label column sm={2}>
            正文内容
          </Form.Label>

          <Col className="border" sm={10}>
            <BraftEditor
              value={editorState}
              onChange={this.handleEditorChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Remember me" />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" onClick={() => this.submitContent(id)}>
              保存
            </Button>
          </Col>
        </Form.Group>
      </Form>
    );
  }
}
