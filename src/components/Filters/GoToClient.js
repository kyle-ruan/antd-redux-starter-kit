import React, { Component } from 'react';
import { Select } from 'antd';
import _ from 'lodash';
import { confirmActivate } from '../PopUp/ConfirmActivate';
import { getClients } from '../../api';

const { Option, OptGroup } = Select;
export default class GoToClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      inActiveClientIds: [],
      value: ''
    };
  }

  handleChange(value) {
    this.setState({ value });
    _.debounce(this.getClientsByKeyword(value), 250);
  }

  handleKeyDown(e) {
    this.setState({ value: e.target.value });
    _.debounce(this.getClientsByKeyword(e.target.value), 250);
  }

  getClientsByKeyword(keyword) {
    const trimedKeyword = keyword.trim();
    if (trimedKeyword.length < 2)
      return;

    getClients(1, 50, { Keyword: trimedKeyword })
      .then(({data}) => {
        this.setState({ loading: false });
        const clients = data.Data;
        const currentClients = clients.filter(client => client.status === 'CURRENT');
        const closedClients = clients.filter(client => client.status === 'CLOSED');
        const deceasedClients = clients.filter(client => client.status === 'DECEASED');
        this.setState({ inActiveClientIds: [
          ...closedClients.map(client => client.id),
          ...deceasedClients.map(client => client.id)
        ]});
        const dataSource = [
          {
            title: 'CURRENT',
            children: currentClients.map(client => {
              const { id, name } = client;
              return { id, name };
            })
          },
          {
            title: 'CLOSED',
            children: closedClients.map(client => {
              const { id, name } = client;
              return { id, name };
            })
          },
          {
            title: 'DECEASED',
            children: deceasedClients.map(client => {
              const { id, name } = client;
              return { id, name };
            })
          }
        ];

        this.setState({ dataSource });
      });
  }

  onSelect(value) {
    this.setState({ value: '' });
    const isInactive = this.state.inActiveClientIds.includes(parseInt(value, 10));
    if (isInactive) {
      confirmActivate(value);
    } else {
      window.parent.selectClient(value);
    }
  }

  renderOptions() {
    return this.state.dataSource.map(group => {
      return (
        <OptGroup key={group.title} label={group.title}>
          {
            group.children.map(opt => {
              return (
                <Option key={opt.id} value={opt.id.toString()}>
                  {opt.name}
                </Option>
              );
            })
          }
        </OptGroup>
      );
    });
  }

  render() {
    return (
      <Select
        combobox
        placeholder="Go to client"
        style={{ width: 200 }}
        value={ this.state.value }
        filterOption={false}
        defaultActiveFirstOption={false}
        showArrow={false}
        onKeyDown={this.handleKeyDown.bind(this)}
        onSearch={this.handleChange.bind(this)}
        onSelect={this.onSelect.bind(this)}
        notFoundContent="No client found"
      >
        { this.renderOptions() }
      </Select>
    );
  }
}
