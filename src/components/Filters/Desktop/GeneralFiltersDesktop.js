import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Collapse from 'react-collapse';
import {
  ClientNameSearch,
  MedicareSearch,
  ClientDetailsSearch,
  OtherDetailsSearch,
  SiteMultiSelect,
  ClientGroupMultiSelect
} from '../../Filters';
import { changeFilter } from '../../../actions';

class GeneralFiltersDesktop extends Component {
  onFilterChange(name, value) {
    this.props.changeFilter(name, value);
  }

  render() {
    const {
      showFilters,
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
      <Collapse isOpened={showFilters}>
        <Row>
          <Col span={8}>
            <SiteMultiSelect
              value={sites}
              showFilters={showFilters}
              onChange={this.onFilterChange.bind(this)}
            />
          </Col>
          <Col span={8}>
            <ClientNameSearch
              value={name}
              onChange={this.onFilterChange.bind(this)}
            />
          </Col>
          <Col span={8}>
            <ClientDetailsSearch
              value={details}
              searchFields={detailsSearchFields}
              onChange={this.onFilterChange.bind(this)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <ClientGroupMultiSelect
              value={clientGroups}
              showFilters={showFilters}
              onChange={this.onFilterChange.bind(this)}
            />
          </Col>
          <Col span={8}>
            <MedicareSearch
              value={medicare}
              onChange={this.onFilterChange.bind(this)}
            />
          </Col>
          <Col span={8}>
            <OtherDetailsSearch
              value={others}
              searchFields={othersSearchFields}
              onChange={this.onFilterChange.bind(this)}
            />
          </Col>
        </Row>
      </Collapse>
    );
  }
}

const mapStateToProps = ({ filters }) => {
  return { ...filters };
}

export default connect(mapStateToProps, { changeFilter })(GeneralFiltersDesktop);
