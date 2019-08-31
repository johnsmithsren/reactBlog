/*
 * @Auther: renjm
 * @Date: 2019-07-31 22:21:33
 * @LastEditTime: 2019-08-31 10:54:07
 * @Description: 加载pdf文档
 */

import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Button,
  DropdownButton,
  Dropdown,
  Col,
  Row,
  Container
} from "react-bootstrap";
import comicApi from "../../axiosApi/comic";
const uuidv4 = require("uuid/v4");
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
    this.getComic = this.getComic.bind(this);
  }

  async componentDidMount() {
    await this.getComic();
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };
  changeValue(title, path) {
    let comicPath = path;
    this.setState({ comicTitle: title, comicPath: comicPath });
  }
  async getComic() {
    let comicInfo = await comicApi.listComic();
    this.setState({ comicList: comicInfo });
    // return result;
  }
  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
  render() {
    const { pageNumber, numPages } = this.state;

    let comicList = <p>暂无更新</p>;

    comicList = this.state.comicList
      ? this.state.comicList.map(comic => (
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
        ))
      : [];

    return (
      <>
        <Container>
          <Row key={uuidv4()}>
            <Col key={uuidv4()} md="12">
              <DropdownButton
                size="sm"
                key={uuidv4()}
                title={this.state.comicTitle}
                variant={"Secondary".toLowerCase()}
                id={`dropdown-variants-Secondary`}
                // key="Secondary"
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
              <Col md={{ offset: 5 }}>
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
        </Container>
      </>
    );
  }
}

export default Pdf;
