/*
 * @Auther: renjm
 * @Date: 2019-09-02 22:28:49
 * @LastEditTime: 2019-09-06 15:55:57
 * @Description:  分页插件
 */
import React, { Component } from "react";
import { Pagination } from "react-bootstrap";
const _ = require("lodash");
// 分页插件类，需要尽可能封装完善，后续需要在多个地方通用
export default class PaginationHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 1
    };
  }

  pagingHandler = e => {
    let offset = parseInt(e.target.id);
    this.setState({
      active: offset
    });
    this.props.pageHandler(_.toNumber(e.target.id));
  };

  nextHandler = (e, totalPages) => {
    let active = this.state.active;
    this.setState({
      active: active + 1
    });
    this.props.pageHandler(active + 1);
  };

  backHandler = e => {
    let active = this.state.active;
    this.setState({
      active: active - 1
    });
    this.props.pageHandler(active - 1);
  };

  renderPageNumbers = (pageNumbers, totalPages) => {
    let { active } = this.state;
    let count = 1;
    return (
      <Pagination>
        <Pagination.Prev
          disabled={active === 1}
          onClick={e => this.backHandler(e)}
        />

        {pageNumbers.map(number => {
          if (
            number >= parseInt(active) - 2 &&
            number <= parseInt(active) + 4 &&
            count <= 5
          ) {
            count = count + 1;
            return (
              <Pagination.Item
                id={number}
                active={number === active}
                onClick={e => this.pagingHandler(e)}
              >
                {number}
              </Pagination.Item>
            );
          } else {
            return null;
          }
        })}
        <Pagination.Next
          disabled={active === totalPages}
          onClick={e => this.nextHandler(e, totalPages)}
        />
      </Pagination>
    );
  };

  buildComponent = props => {
    const { totalPages, pageSize } = props;
    const pages = _.ceil(_.divide(totalPages, _.toNumber(pageSize)));
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
      pageNumbers.push(i);
    }
    return <>{this.renderPageNumbers(pageNumbers, pages)}</>;
  };

  render() {
    return this.buildComponent(this.props);
  }
}
