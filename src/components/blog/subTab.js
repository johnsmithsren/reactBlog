/*
 * @Auther: renjm
 * @Date: 2019-07-31 13:33:36
 * @LastEditTime: 2019-08-30 21:25:35
 * @Description: 博客内容组件
 */

import React, { Component } from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
// import createBrowserHistory from "history/createBrowserHistory";

import {
  ListGroup,
  Row,
  Tab,
  Col
  // DropdownButton,
  // Dropdown
} from "react-bootstrap";
// import Dialogue from "../dialogue";
import contentApi from "../../axiosApi/content";
import Content from "../blogContent";
import Pdf from "../comicPdf/pdf";
import Editor from "../blogContentEditor/index";
const _ = require("lodash");
const uuidv4 = require("uuid/v4");

// const history = createBrowserHistory();
// const ReactDOMServer = require("react-dom/server");
// const HtmlToReactParser = require("html-to-react").Parser;

// 定义一个 hello 组件
class SubBlogTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      keyPath: "#",
      handleShow: false,
      redirect: false
    };
  }
  // async componentWillMount() {}
  async componentDidMount() {}

  changePropsType(e, contentInfo) {
    this.setState({ redirect: true });
  }
  setKey(e) {
    let _keypath = _.get(this.state, "keyPath");
    if (e.target.localName === "div") {
      if (
        _.get(e, "target.attributes.href.value") !== undefined &&
        _keypath !== _.get(e, "target.attributes.href.value")
      ) {
        this.setState({ keyPath: e.target.attributes.href.value });
      } else {
        this.setState({ keyPath: "#" });
      }
    } else {
      if (_keypath !== e.target.hash) {
        this.setState({ keyPath: e.target.hash });
      } else {
        this.setState({ keyPath: "#" });
      }
    }
  }

  async handleDropdownClick(e, content) {
    if (_.get(e, "target.attributes.prefix.value") === "edit") {
      this.setState({
        handleShow: true,
        contentInfo: content
      });
    }
    if (_.get(e, "target.attributes.prefix.value") === "create") {
      this.setState({
        handleShow: true,
        contentInfo: []
      });
    }
    if (_.get(e, "target.attributes.prefix.value") === "delete") {
      await contentApi.deleteContent({ id: _.get(content, "id") });
      await this.props.getContent();
      // await this.props.getComic();
    }
    if (_.get(e, "target.attributes.handle.value") === "open") {
      this.setState({ handleShow: true });
    }
    if (
      e === "close" ||
      _.get(e, "target.attributes.handle.value") === "close"
    ) {
      this.setState({ handleShow: false });
      await this.props.getContent();
      await this.props.getComic();
    }
  }

  /**
   * @description:  构建 博客的内容
   * @param {type}
   * @return:
   */
  getBlogRow() {
    let blogRow = <p>敬请期待博客内容</p>;
    if (this.state.redirect) {
      return <Redirect to={{ from: { pathname: "/show" } }} />;
    }
    if (this.props.type === "blog") {
      // var htmlToReactParser = new HtmlToReactParser();
      blogRow = this.props.contentList.map(content => (
        <>
          <Row key={uuidv4()} md={12}>
            <Col key={uuidv4()}>
              <ListGroup variant="flush" key={uuidv4()}>
                <Link to="/show">
                  <ListGroup.Item
                    variant="light"
                    bssize="sm"
                    onClick={e => this.changePropsType(e, content)}
                  >
                    {content.title}
                  </ListGroup.Item>
                </Link>
              </ListGroup>
            </Col>
          </Row>
        </>
      ));
    }
    return blogRow;
  }

  //   if (this.props.type === "create") {
  //     returnResult = (
  //       <Editor
  //         getComic={this.props.getContent.bind(this)}
  //         getContent={this.props.getComic.bind(this)}
  //       />
  //     );
  //   }
  //   return returnResult;
  // }

  render() {
    return (
      <>
        <Tab.Container
          id="list-group-blog"
          defaultActiveKey={this.state.keyPath}
        >
          {this.getBlogRow()}
        </Tab.Container>
        {/* <Dialogue
          handleDropdownClick={this.handleDropdownClick.bind(this)}
          contentInfo={this.state.contentInfo}
          handleShow={this.state.handleShow}
        /> */}
      </>
    );
  }
}
export default withRouter(SubBlogTab);
