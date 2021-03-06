import React, { Component } from 'react';
import axios from 'axios';
import { Select } from 'antd';
import { apiConfig } from '../../configs';
import { cache } from '../../utils';

const { Option } = Select;

class ClientGroupMultiSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: []
    };
  }

  componentDidMount() {
    const { coreplusWebClientURL, headers } = apiConfig;
    const requestUrl = `${coreplusWebClientURL}api/Client/ClientGroups`;

    axios.get(requestUrl, { headers })
      .then(({data}) => {
        cache.set('clientGroups', data);
        this.setState({ options: data });
      });
  }

  renderOptions() {
    return this.state.options.map((option) => {
      return (
        <Option
          key={option.value + option.text}
          value={option.value.toString()}
        >
          {option.text}
        </Option>
      );
    });
  }

  render() {
    return (
      <div>
        <label>Client Groups: </label>
        <Select
          style={{ width: 200 }}
           multiple
           filterOption={(inputValue, option) => {
             return option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
           }}
           onChange={(values) => {this.props.onChange('clientGroups', values)}}
         >
           { this.renderOptions() }
         </Select>
      </div>
    );
  }
}

export { ClientGroupMultiSelect };
