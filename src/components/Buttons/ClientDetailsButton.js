import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import ClientDetailsContent from './Popovers/ClientDetailsContent';

export default class ClientDetailsButton extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  handleVisibleChange(visible) {
    this.setState({ visible });
  }

  render() {
    const content = (
      <div>
        <ClientDetailsContent searchFields={this.props.searchFields}/>
      </div>
    );
    return (
      <Popover
        placement="rightTop"
        content={content}
        title="Filter By"
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange.bind(this)}
      >
        <Button size="small" className="column-list" icon="bars" />
      </Popover>
    );
  }
}
