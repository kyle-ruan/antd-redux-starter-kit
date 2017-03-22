import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Spin } from 'antd';
import _ from 'lodash';
import CustomField from './Filters/CustomFields';
import { getCustomFields, changeCustomFieldFilter } from '../actions';

class CustomFieldFilters extends Component {
  componentDidMount() {
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
    const items = customFields.map((customField) => {
      const { customFieldId, fieldName, fieldType } = customField;
      const filter = filters.find(filter => filter.id === customFieldId);
      let value = null;
      if(!!filter) {
        value = filter.value;
      }
      return (
        <Col span={6} key={customFieldId}>
          <CustomField
            id={customFieldId}
            type={fieldType}
            label={fieldName}
            value={value}
            onChange={this.onFieldChange.bind(this)}
          />
        </Col>
      );
    });

    return _.chunk(items, 4).map((item, index) => {
      return (
        <Row key={index}>
          {item}
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

const mapStateToProps = ({ dataSource: { customFields }, filters: { customFieldFilters} }) => {
  const { data, loading } = customFields;
  return { customFields: data, loading, filters: customFieldFilters };
};

export default connect(mapStateToProps, { getCustomFields, changeCustomFieldFilter })(CustomFieldFilters);
