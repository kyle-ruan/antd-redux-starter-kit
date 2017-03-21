import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import OtherDetailsContent from './Popovers/OtherDetailsContent';

export default class OtherDetailsButton extends Component {
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
        <OtherDetailsContent searchFields={this.props.searchFields} />
      </div>
    );
    return (
      <Popover
        placement="rightBottom"
        content={content}
        title="Filter By"
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange.bind(this)}
      >
        <Button className="column-list" icon="bars" />
      </Popover>
    );
  }
}
