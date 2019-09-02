/*
 * @Auther: renjm
 * @Date: 2019-08-28 09:07:33
 * @LastEditTime: 2019-09-02 17:23:15
 * @Description: 使用的是一个富文本编辑器插件
 */
import "braft-editor/dist/index.css";
import React, { Component } from "react";
import BraftEditor from "braft-editor";
import contentApi from "../../axiosApi/content";
import { Row, Button, Form, Col, Container } from "react-bootstrap";
import "./blogContentEditor.css";
// const MarkdownEditor = require("react-markdown-editor").MarkdownEditor;
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
const _ = require("lodash");
export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      keyPaht: "#",
      handleShow: false,
      editorState: null,
      contentId: "",
      contentTitle: [],
      markdownDefault: "写些什么吧！"
    };
    this.mdParser = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
    });
  }

  async componentDidMount() {
    // 假设此处从服务端获取html格式的编辑器内容
    let contentId = _.get(this, "props.match.params.id");
    let htmlContent = "<p>记录每一天</p>";
    if (contentId) {
      let content = await contentApi.getContent(contentId);
      if (content.contentType === "markdown") {
        this.setState({
          markdownDefault: _.get(content, "content"),
          contentTitle: _.get(content, "title")
        });
        this.setState({
          markdown: true
        });
      } else {
        this.setState({
          editorState: BraftEditor.createEditorState(_.get(content, "content")),
          contentTitle: _.get(content, "title")
        });
      }

      this.setState({
        contentId: contentId
      });
    } else {
      this.setState({
        editorState: BraftEditor.createEditorState(htmlContent)
      });
    }
  }
  changeToMarkdown() {
    if (this.state.markdown) {
      this.setState({
        markdown: false
      });
    } else {
      this.setState({
        markdown: true
      });
    }
  }
  handleGetMdValue = () => {};
  async submitContent() {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const { history } = this.props;
    let title = this.refs.title.value;
    let id = _.get(this, "props.match.params.id");
    let htmlContent = "";
    let contentType = "normal";
    if (this.state.markdown && this.mdEditor) {
      htmlContent = this.mdEditor.getMdValue();
      contentType = "markdown";
    } else {
      htmlContent = this.state.editorState.toHTML();
      contentType = "normal";
    }
    if (!_.isEmpty(id)) {
      let contentInfo = {
        content: htmlContent,
        title: title,
        contentType: contentType,
        id: id
      };
      let result = await contentApi.editContent(contentInfo);
      if (result) {
        let from = {
          pathname: `/blog`
        };
        history.push(from);
      }
    } else {
      let contentInfo = {
        content: htmlContent,
        title: title,
        contentType: contentType
      };
      await contentApi.createContent(contentInfo);
      let from = {
        pathname: `/blog`
      };
      history.push(from);
    }
  }

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const { editorState } = this.state;
    return (
      <Container>
        <Button variant="light" onClick={e => this.changeToMarkdown()}>
          切换{this.state.markdown ? "笔记模式" : "markdown"}
        </Button>
        <Form>
          <Form.Group as={Row} controlId="formHorizontalTitle">
            <Form.Label column sm={2}>
              正文标题
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                ref="title"
                placeholder="标题"
                defaultValue={this.state.contentTitle}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalContent">
            <Form.Label column sm={2}>
              正文内容
            </Form.Label>

            {this.state.markdown ? (
              <Col className="markdownEditor">
                <MdEditor
                  ref={node => (this.mdEditor = node)}
                  value={this.state.markdownDefault}
                  renderHTML={text => this.mdParser.render(text)}
                  onChange={this.handleEditorChange}
                />
              </Col>
            ) : (
              <Col className="border" sm={10}>
                <BraftEditor
                  value={editorState}
                  onChange={this.handleEditorChange}
                />
              </Col>
            )}
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button onClick={this.submitContent.bind(this)}>保存</Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
