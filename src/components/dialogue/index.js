import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

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

  // 在componentDidUpdate中进行异步操作，驱动数据的变化
  async componentDidUpdate(previousProps, previousState) {}

  render() {
    return (
      <>
        <Modal show={this.props.handleShow} onHide="false">
          <Modal.Header closeButton>
            <Modal.Title>编辑</Modal.Title>
          </Modal.Header>
          <Modal.Body>hhhh</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              handle="close"
              onClick={e => this.props.handleDropdownClick(e)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default modalDialog;
