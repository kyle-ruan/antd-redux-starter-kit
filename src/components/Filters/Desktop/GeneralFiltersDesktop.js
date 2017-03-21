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
      <div>
        <Row>
          <Col span={6}>
            <div className="filter-block">
              <SiteMultiSelect
                value={sites}
                showFilters={showFilters}
                onChange={this.onFilterChange.bind(this)}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="filter-block">
              <ClientNameSearch
                value={name}
                onChange={this.onFilterChange.bind(this)}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="filter-block">
              <ClientDetailsSearch
                value={details}
                searchFields={detailsSearchFields}
                onChange={this.onFilterChange.bind(this)}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="filter-block">
              <ClientGroupMultiSelect
                value={clientGroups}
                showFilters={showFilters}
                onChange={this.onFilterChange.bind(this)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <div className="filter-block">
              <MedicareSearch
                value={medicare}
                onChange={this.onFilterChange.bind(this)}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="filter-block">
              <OtherDetailsSearch
                value={others}
                searchFields={othersSearchFields}
                onChange={this.onFilterChange.bind(this)}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ filters }) => {
  return { ...filters };
}

export default connect(mapStateToProps, { changeFilter })(GeneralFiltersDesktop);
