import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import { changeFilter } from '../../../actions';

const CheckboxGroup = Checkbox.Group;

class ClientDetailsContent extends Component {
  constructor(props) {
    super(props);
    this.options = [
      { label: 'Address', value: 'address' },
      { label: 'Email', value: 'email' },
      { label: 'Home Phone', value: 'homePhone' },
      { label: 'Mobile', value: 'mobile' }
    ];
  }

  handleChange(checkedValues) {
    this.props.changeFilter('detailsSearchFields', checkedValues);
  }

  render() {
    return (
      <div style={{ width: 250 }}>
        <CheckboxGroup
          value={this.props.searchFields}
          options={this.options}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ filters: { detailsSearchFields } }) => {
  return { detailsSearchFields };
};

export default connect(mapStateToProps, { changeFilter })(ClientDetailsContent);
