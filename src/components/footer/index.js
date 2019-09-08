/*
 * @Auther: renjm
 * @Date: 2019-08-02 21:53:50
 * @LastEditTime: 2019-09-06 15:45:05
 * @Description:
 */
import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
import "./footer.css";

// 定义一个 尾部展示页面
class modalFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <footer className="footer">
        <div className="footer-copyright text-center py-3">
          <Row>
            <Col md="12">
              <h6>感谢ReactBootstrap</h6>
              <h6>感谢Antd</h6>
            </Col>
          </Row>
          <Container fluid>
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <a href="https://www.MDBootstrap.com"> renjm </a>
          </Container>
        </div>
      </footer>
    );
  }
}
export default modalFooter;
