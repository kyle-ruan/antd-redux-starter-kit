import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import { toggleColumns } from '../../../actions';
import { deviceConfig } from '../../../configs';

const CheckboxGroup = Checkbox.Group;
const isMobile = window.innerWidth <= deviceConfig.mobileWidth;

class VisibleColumnsContent extends Component {
  constructor(props) {
    super(props);
    this.options = [
      { label: 'CRN', value: 'crn' },
      { label: 'External ID', value: 'externalId' },
      { label: 'Name', value: 'name', disabled: true },
      { label: 'Address', value: 'streetAddress' },
      { label: 'Home Phone', value: 'homePhone' },
      { label: 'Mobile', value: 'mobile' },
      { label: 'Email', value: 'email' },
      { label: 'Meidcare Card Number', value: 'medicareCardNumber' },
      { label: 'Client Group', value: 'groupId' },
      { label: 'Site', value: 'siteId' }
    ];
  }

  handleChange(checkedValues) {
    this.props.toggleColumns(checkedValues);
  }

  render() {
    const { customFields } = this.props;

    const cfOptions = customFields.map(cf => {
      return {
        label: cf.fieldName,
        value: cf.fieldName
      };
    });

    const defaultValues = isMobile ? ['name', 'mobile'] : [
      'name',
      'streetAddress',
      'homePhone',
      'mobile',
      'email',
      'medicareCardNumber',
      'groupId',
      'siteId'
    ];

    return (
      <div style={{ width: 250 }}>
        <CheckboxGroup
          options={this.options.concat(cfOptions)}
          defaultValue={defaultValues}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ dataSource: { customFields } }) => {
  return { customFields: customFields.data };
};

export default connect(mapStateToProps, { toggleColumns })(VisibleColumnsContent);
