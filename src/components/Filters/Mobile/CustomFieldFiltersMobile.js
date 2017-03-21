import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Spin } from 'antd';
import _ from 'lodash';
import CustomField from '../CustomFields';
import { getCustomFields, changeCustomFieldFilter } from '../../../actions';
import Page from '../../Page';

class CustomFieldFiltersMobile extends Component {
  componentDidMount() {
    const { customFields } = this.props;
    if(customFields.length === 0)
      this.props.getCustomFields();
  }

  onFieldChange(id, value) {
    this.props.changeCustomFieldFilter(id, value);
  }

  renderCustomFields() {
    const { customFields, filters, loading } = this.props;

    if(loading) {
      return (
        <Row>
          <Spin size='large'/>
        </Row>
      );
    }
    return customFields.map((customField) => {
      const { customFieldId, fieldName, fieldType } = customField;
      const filter = filters.find(filter => filter.id === customFieldId);
      let value = null;
      if(!!filter) {
        value = filter.value;
      }
      return (
        <Row key={customFieldId}>
          <Col span={24} key={customFieldId}>
            <div className="filter-block">
              <CustomField
                id={customFieldId}
                type={fieldType}
                label={fieldName}
                value={value}
                onChange={this.onFieldChange.bind(this)}
              />
            </div>
          </Col>
        </Row>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderCustomFields()}
      </div>
    );
  }
}

const mapStateToProps = ({
  dataSource: { customFields },
  filters: { customFieldFilters, showFilters }
}) => {
  const { data, loading } = customFields;
  return {
    customFields: data,
    loading,
    filters: customFieldFilters
  };
};

export default connect(
  mapStateToProps,
  { getCustomFields, changeCustomFieldFilter }
)(CustomFieldFiltersMobile);
