import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Icon, Tooltip, Button } from 'antd';
import { getClientGroups } from '../../actions';

const { Option } = Select;

class ClientGroups extends Component {
  renderOptions() {
    return this.props.clientGroups.map((option) => {
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
    const { value, loading, onChange, getClientGroups } = this.props;
    return (
      <div>

        <label>Client Groups</label>
        <div className="input-button-group input-button-group--right">
          <Select
            style={{ width: '100%' }}
             multiple
             value={value}
             filterOption={(inputValue, option) => {
               return option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
             }}
             onChange={(values) => {onChange('clientGroups', values)}}
           >
             { this.renderOptions() }
           </Select>
           <Tooltip placement="right" title="You can click here to reload client groups.">
            <Button size="small">
             <Icon type="reload" spin={loading} onClick={() => getClientGroups() }/>
            </Button>
           </Tooltip>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ dataSource: { clientGroups } }) => {
  return {
    clientGroups: clientGroups.data,
    loading: clientGroups.loading
  };
}

const ClientGroupMultiSelect = connect(
  mapStateToProps,
  { getClientGroups }
)(ClientGroups);

export { ClientGroupMultiSelect };
