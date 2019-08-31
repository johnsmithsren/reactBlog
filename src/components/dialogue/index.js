/*
 * @Auther: renjm
 * @Date: 2019-08-02 21:53:50
 * @LastEditTime: 2019-08-30 21:37:32
 * @Description:
 */
import React, { Component } from "react";
import contentApi from "../../axiosApi/content";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
// import { Editor, EditorState } from "draft-js";

const _ = require("lodash");

// import { Table } from "react-bootstrap";
// 定义一个 hello 组件
class modalDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleShow: this.props.handleShow
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }
  componentDidMount() {}
  handleClose() {
    this.setState({ handleShow: false });
  }
  handleShow() {
    this.setState({ handleShow: false });
  }
  async saveChange(id) {
    let result = false;
    if (id) {
      let contentInfo = {
        title: this.refs.title.value,
        content: this.refs.content.value,
        id: id
      };
      result = await contentApi.editContent(contentInfo);
    } else {
      let contentInfo = {
        title: this.refs.title.value,
        content: this.refs.content.value
      };
      result = await contentApi.createContent(contentInfo);
    }

    if (result) {
      this.props.handleDropdownClick("close");
    }
  }

  // 在componentDidUpdate中进行异步操作，驱动数据的变化
  async componentDidUpdate(previousProps, previousState) {}

  render() {
    let content = _.get(this.props, "contentInfo.content");
    let title = _.get(this.props, "contentInfo.title");
    let id = _.get(this.props, "contentInfo.id");
    return (
      <>
        <Modal
          show={this.props.handleShow}
          onHide={() => this.props.handleDropdownClick("close")}
        >
          <Modal.Header closeButton>
            <Modal.Title>编辑</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup>
              <FormControl
                size="sm"
                as="textarea"
                ref="title"
                aria-label="With textarea"
                defaultValue={title}
              />
            </InputGroup>
          </Modal.Body>

          <InputGroup>
            <FormControl
              as="textarea"
              size="lg"
              ref="content"
              aria-label="With textarea"
              defaultValue={content}
            />
          </InputGroup>
          <Modal.Footer>
            <Button
              variant="secondary"
              handle="close"
              onClick={e => this.props.handleDropdownClick(e)}
            >
              关闭
            </Button>
            <Button variant="primary" onClick={() => this.saveChange(id)}>
              保存
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default modalDialog;
