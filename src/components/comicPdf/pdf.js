/*
 * @Auther: renjm
 * @Date: 2019-07-31 22:21:33
 * @LastEditTime: 2019-09-06 15:50:01
 * @Description: 加载pdf文档
 */

import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Cascader } from "antd";
import { Button, Col, Row, Container } from "react-bootstrap";
import comicApi from "../../axiosApi/comic";
const _ = require("lodash");
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

  /**
   * @description: 组件加载之后获取漫画列表
   * @param {type}
   * @return:
   */
  async componentDidMount() {
    await this.getComic();
  }

  /**
   * @description: paf插件显示用途，用来暂时该pdf页数
   * @param {type}
   * @return:
   */
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  /**
   * @description:
   * @param {type}
   * @return:
   */
  changeValue(title, path) {
    let comicPath = path;
    this.setState({ comicTitle: title, comicPath: comicPath });
  }

  /**
   * @description: 处理生成级联选项的初始选项
   * @param {type}
   * @return:
   */
  generateNewOption(value) {
    let o = {
      value: value,
      label: value
    };
    return o;
  }

  /**
   * @description: 当级联选项被选择时候的处理
   * @param {type}
   * @return:
   */
  onChange(value) {
    let comic = _.find(this.state.comicList, {
      title: `${value[0]} ${value[1]}`
    });
    if (comic) {
      this.setState({ comicTitle: comic.title, comicPath: comic.path });
    }
  }

  /**
   * @description: 从服务器获取漫画列表
   * @param {type}
   * @return:
   */
  async getComic() {
    let comicInfo = await comicApi.listComic();
    this.setState({ comicList: comicInfo });
    // return result;
  }

  /**
   * @description: pdf插件用来返回上一页
   * @param {type}
   * @return:
   */
  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));

  /**
   * @description: pdf插件使用，下一页
   * @param {type}
   * @return:
   */

  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  render() {
    const { pageNumber, numPages } = this.state;
    // 根据漫画列表，构建出漫画的选择项集合
    let options = [];
    if (this.state.comicList) {
      this.state.comicList.map(comic => {
        let title = _.get(_.split(_.get(comic, "title"), " "), "0");
        let word = _.get(_.split(_.get(comic, "title"), " "), "1");
        if (_.find(options, { value: title })) {
          let _o = _.find(options, { value: title });
          let child = _.get(_o, "children", []);
          child.push(this.generateNewOption(word));
          _.set(_o, "children", child);
        } else {
          let newOption = this.generateNewOption(title);
          options.push(newOption);
          let child = _.get(newOption, "children", []);
          child.push(this.generateNewOption(word));
          _.set(newOption, "children", child);
        }
        return [];
      });
    }

    return (
      <>
        <Container>
          <Cascader
            options={options}
            onChange={e => this.onChange(e)}
            placeholder={this.state.comicTitle}
          />
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
