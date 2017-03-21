import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { resizeColumn } from '../../actions';

const resizableHeaderStyle = {
  cursor: 'ew-resize'
};

class ResizeHeader extends Component {
  onStart(e) {
    this.x = e.clientX;
  }

  handleDrag(e, ui, column) {
    const movement = e.clientX - this.x;
    this.x = e.clientX;
    this.props.resizeColumn(column, movement);
  }

  handleStop(e) {
    this.x = 0;
  }

  render() {
    const { column, title } = this.props;
    return (
      <Draggable
        axis="x"
        onStart={(e) => this.onStart(e)}
        onDrag={(e, ui) => this.handleDrag(e, ui, column)}
        onStop={(e) => this.handleStop(e)}
      >
      <span style={resizableHeaderStyle}>
        {title}
      </span>
      </Draggable>
    );
  }
}

export default connect(null, { resizeColumn })(ResizeHeader);
