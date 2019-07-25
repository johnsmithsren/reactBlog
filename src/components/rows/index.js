import React, { Component } from "react";
import PropTypes from "prop-types";

import { Table } from "react-bootstrap";
const _ = require("lodash");
// 定义一个row组件
class Rows extends Component {
  // 在类中定义参数类型的必要性
  static propTypes = {
    id: PropTypes.number.isRequired,
    content: PropTypes.string
  };
  // 定义默认的参数
  static defaultProps = {
    id: 1,
    content: "你好"
  };
  componentDidMount() {
    // Subscribe to changes
  }

  componentWillUnmount() {
    // Clean up listener
  }

  handleChange() {
    // Update component state whenever the data source changes
  }
  render() {
    const borderStyle = { border: "1", padding: 4 };
    return (
      <Table>
        <thead>
          <tr>
            <th>number</th>
            <th>content</th>
          </tr>
        </thead>
        <tbody>
          <tr style={borderStyle}>
            <th>{_.get(this.props.issueinfo, "id")}</th>
            <th>Savings</th>
          </tr>
          <tr style={borderStyle}>
            <td>{_.get(this.props.issueinfo, "content")}</td>
            <th>Savings</th>
          </tr>
        </tbody>
      </Table>
    );
  }
}
export default Rows;
