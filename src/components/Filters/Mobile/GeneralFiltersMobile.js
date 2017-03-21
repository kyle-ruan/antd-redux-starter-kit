import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import {
  ClientNameSearch,
  MedicareSearch,
  ClientDetailsSearch,
  OtherDetailsSearch,
  SiteMultiSelect,
  ClientGroupMultiSelect
} from '../../Filters';
import { changeFilter } from '../../../actions';

class GeneralFiltersMobile extends Component {
  onFilterChange(name, value) {
    this.props.changeFilter(name, value);
  }

  render() {
    const {
      name,
      medicare,
      details,
      detailsSearchFields,
      others,
      othersSearchFields,
      sites,
      clientGroups
    } = this.props;
    return (
      <div>
        <Row>
          <Col span={24}>
            <SiteMultiSelect
              value={sites}
              onChange={this.onFilterChange.bind(this)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ClientNameSearch
              value={name}
              onChange={this.onFilterChange.bind(this)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ClientDetailsSearch
              value={details}
              searchFields={detailsSearchFields}
              onChange={this.onFilterChange.bind(this)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ClientGroupMultiSelect
              value={clientGroups}
              onChange={this.onFilterChange.bind(this)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <MedicareSearch
              value={medicare}
              onChange={this.onFilterChange.bind(this)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <OtherDetailsSearch
              value={others}
              searchFields={othersSearchFields}
              onChange={this.onFilterChange.bind(this)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ filters }) => {
  return { ...filters };
}

export default connect(mapStateToProps, { changeFilter })(GeneralFiltersMobile);
