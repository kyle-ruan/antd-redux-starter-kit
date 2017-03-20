import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import VisibleColumnsContent from './Popovers/VisibleColumnsContent';

class ToggleColumnButton extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  hide() {
    this.setState({ visible: false });
  }

  handleVisibleChange(visible) {
    this.setState({ visible });
  }

  render() {
    const content = (
      <div>
        <VisibleColumnsContent />
      </div>
    );
    return (
      <Popover
        content={content}
        title="Show/Hide Columns"
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange.bind(this)}
      >
        <Button type="primary" icon="bars">Show/Hide Columns</Button>
      </Popover>
    );
  }
}

export { ToggleColumnButton };
