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
      value: '',
      loading: false
    };
  }

  handleChange(value) {
    const trimedValue = value.trim();
    if (value.length < 2)
      return;

    this.setState({ loading: true, value });

    getClients(1, 50, { Keyword: trimedValue })
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
        filterOption={false}
        defaultActiveFirstOption={false}
        showArrow={false}
        onSearch={_.debounce(this.handleChange.bind(this), 500)}
        onSelect={this.onSelect.bind(this)}
        notFoundContent="No client found"
      >
        { this.renderOptions() }
      </Select>
    );
  }
}
