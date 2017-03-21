import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import { changeFilter } from '../../../actions';

const CheckboxGroup = Checkbox.Group;

class OtherDetailsContent extends Component {
  constructor(props) {
    super(props);
    this.options = [
      { label: 'CRN', value: 'CRN' },
      { label: 'External ID', value: 'external_id' }
    ];
  }

  handleChange(checkedValues) {
    this.props.changeFilter('othersSearchFields', checkedValues);
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

const mapStateToProps = ({ filters: { othersSearchFields } }) => {
  return { othersSearchFields };
};

export default connect(mapStateToProps, { changeFilter })(OtherDetailsContent);
