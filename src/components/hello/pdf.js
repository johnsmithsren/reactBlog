/*
 * @Auther: renjm
 * @Date: 2019-07-31 22:21:33
 * @LastEditTime: 2019-08-02 22:29:33
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
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      comicTitle: "漫画列表",
      comicPath: null
    };
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };
  changeValue(title, path) {
    let comicPath = `../../${path}`;
    this.setState({ comicTitle: title, comicPath: comicPath });
  }
  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
  render() {
    const { pageNumber, numPages } = this.state;
    let comicList = this.props.comicList.map(comic => (
      <>
        <Dropdown.Item
          size="sm"
          eventKey={comic.id}
          path={comic.path}
          onClick={e => this.changeValue(e.target.textContent, comic.path)}
        >
          {comic.title}
        </Dropdown.Item>
      </>
    ));
    return (
      <>
        <Row>
          <Col>
            <DropdownButton
              size="sm"
              title={this.state.comicTitle}
              variant={"Secondary".toLowerCase()}
              id={`dropdown-variants-Secondary`}
              key="Secondary"
            >
              {comicList}
              {/* <Dropdown.Item eventKey="1">Action</Dropdown.Item>
              <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
              <Dropdown.Item eventKey="3" active>
                Active Item
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Separated link</Dropdown.Item> */}
            </DropdownButton>
          </Col>
        </Row>

        {this.state.comicPath ? (
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
            <Col md={{ offset: 8 }}>
              <nav>
                <Button variant="light" onClick={this.goToPrevPage}>
                  上一页
                </Button>
                <Button variant="light" onClick={this.goToNextPage}>
                  下一页
                </Button>
              </nav>
            </Col>
          </Row>
        ) : (
          []
        )}
      </>
    );
  }
}

export default Pdf;
