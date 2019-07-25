import React, { Component } from "react";
// import { Row } from "antd";
// 定义一个行组件
import Rows from "../rows";

// import { Table } from "react-bootstrap";
// 定义一个 hello 组件
class Hello extends Component {
  render() {
    const info = this.props.issueId;
    const helloRows = this.props.issues.map(issue => (
      <Rows key={issue.id} issueinfo={issue} />
    ));

    return (
      <div>
        welcome to my blog {info}
        {helloRows}
      </div>
    );
  }
}
export default Hello;
