import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Icon, Tooltip } from 'antd';
import { getSites } from '../../actions';

const { Option } = Select;
class Sites extends Component {
  renderOptions() {
    return this.props.sites.map((option) => {
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
    const { value, loading, onChange, getSites } = this.props;
    return (
      <div>
        <label>Sites: </label>
        <Select
          style={{ width: 200 }}
           multiple
           value={value}
           filterOption={(inputValue, option) => {
             return option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
           }}
           onChange={(values) => {onChange('sites', values)}}
         >
           { this.renderOptions() }
         </Select>
         <Tooltip placement="right" title="You can click here to reload sites.">
           <Icon type="reload" spin={loading} onClick={() => getSites() }/>
         </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = ({ dataSource: { sites }}) => {
  return { sites: sites.data, loading: sites.loading };
};

const SiteMultiSelect = connect(mapStateToProps, { getSites })(Sites);

export { SiteMultiSelect };
