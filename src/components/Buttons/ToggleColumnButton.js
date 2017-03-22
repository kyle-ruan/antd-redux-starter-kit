import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import VisibleColumnsContent from './Popovers/VisibleColumnsContent';

const isMobile = window.innerWidth <= 668;

class ToggleColumnButton extends Component {
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
        <VisibleColumnsContent />
      </div>
    );
    return (
      <Popover
        placement="bottom"
        content={content}
        title="Show/Hide Fields"
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange.bind(this)}
      >
        <Button style={{ width: '100%' }} size="small" type="primary">Show/Hide Fields</Button>
      </Popover>
    );
  }
}

export { ToggleColumnButton };
