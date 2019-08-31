/*
 * @Auther: renjm
 * @Date: 2019-07-24 20:16:12
 * @LastEditTime: 2019-08-30 21:22:24
 * @Description:
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.getContent = this.getContent.bind(this);
  }

  render() {
    return <p>Content</p>;
  }
}
export default withRouter(Content);
