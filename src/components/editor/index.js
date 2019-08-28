/*
 * @Auther: renjm
 * @Date: 2019-08-28 09:07:33
 * @LastEditTime: 2019-08-28 22:36:36
 * @Description: 使用的是一个富文本编辑器插件
 */
import React, { Component } from "react";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import contentApi from "../../axiosApi/content";

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
    const htmlContent = await this.props.getContent();
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
    this.setState({
      editorState: BraftEditor.createEditorState(htmlContent)
    });
  }

  submitContent = async id => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    let result = "";
    const htmlContent = this.state.editorState.toHTML();
    if (id) {
      let contentInfo = {
        content: htmlContent,
        id: id
      };
      result = await contentApi.editContent(contentInfo);
    } else {
      let contentInfo = {
        content: htmlContent
      };
      result = await contentApi.createContent(contentInfo);
    }
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const { editorState } = this.state;

    return (
      <div className="my-component">
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          onSave={this.submitContent}
        />
      </div>
    );
  }
}
