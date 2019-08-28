/*
 * @Auther: renjm
 * @Date: 2019-07-31 22:21:33
 * @LastEditTime: 2019-08-28 22:37:10
 * @Description: 加载pdf文档
 */

import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button, DropdownButton, Dropdown, Col, Row } from "react-bootstrap";
const uuidv4 = require("uuid/v4");
// import { Row } from "antd";
// import { expression } from "@babel/template";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
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
    let comicPath = path;
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
          key={uuidv4()}
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
        <Row key={uuidv4()}>
          <Col key={uuidv4()}>
            <DropdownButton
              size="sm"
              title={this.state.comicTitle}
              variant={"Secondary".toLowerCase()}
              id={`dropdown-variants-Secondary`}
              key="Secondary"
            >
              {comicList}
            </DropdownButton>
          </Col>
        </Row>

        {this.state.comicPath ? (
          <Row>
            <Col>
              <Document
                file={`${this.state.comicPath}`}
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
