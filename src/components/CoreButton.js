import React from 'react';
import { Button } from 'antd';
import FaIcon from "./FaIcon.js";

class CoreButton extends Button {
  constructor(props) {
      super(props);

      var icon = '';
      var text = '';

      if(this.props.icon !== undefined) {
          icon = <FaIcon type={this.props.icon} />;
      }

      if(this.props.children !== undefined) {
          text = this.props.children;
      }

      this.state = {
          text: text,
          icon: icon
      };

  }

  render() {
      return (<Button type={this.props.type} size={this.props.size} onClick={this.props.onClick}>
          {this.state.icon}<span style={ this.state.text === '' ? {display: 'none'} : {} }>{ this.state.text}</span>
      </Button>)
  }
}

export default CoreButton;
