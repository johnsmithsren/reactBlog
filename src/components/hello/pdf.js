/*
 * @Auther: renjm
 * @Date: 2019-07-31 22:21:33
 * @LastEditTime: 2019-08-01 10:07:13
 * @Description: 加载pdf文档
 */

import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button, DropdownButton, Dropdown, Col, Row } from "react-bootstrap";
// import { Row } from "antd";
// import { expression } from "@babel/template";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;
class Pdf extends Component {
  state = {
    numPages: null,
    pageNumber: 1
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <>
        <Row>
          <Col md={8}>
            <nav>
              <Button variant="light" onClick={this.goToPrevPage}>
                上一页
              </Button>
              <Button variant="light" onClick={this.goToNextPage}>
                下一页
              </Button>
            </nav>
          </Col>
          <Col>
            <DropdownButton
              size="sm"
              title="漫画列表"
              variant={"Secondary".toLowerCase()}
              id={`dropdown-variants-Secondary`}
              key="Secondary"
            >
              <Dropdown.Item eventKey="1">Action</Dropdown.Item>
              <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
              <Dropdown.Item eventKey="3" active>
                Active Item
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        <Row>
          <Col>
            <Document
              file={require("../../pdfsource/154.pdf")}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </Col>
        </Row>
      </>
    );
  }
}

export default Pdf;
