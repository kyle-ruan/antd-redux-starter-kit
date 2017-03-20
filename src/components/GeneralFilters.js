import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import {
  KeywordSearch,
  SiteMultiSelect,
  ClientGroupMultiSelect,
  StatusDropDown
} from './Filters';
import { changeFilter } from '../actions';

class GeneralFilters extends Component {
  onFilterChange(name, value) {
    this.props.changeFilter(name, value);
  }

  render() {
    const { keyword } = this.props;
    return (
      <Row>
        <Col span={6}>
          <KeywordSearch
            value={keyword}
            onChange={this.onFilterChange.bind(this)}
          />
        </Col>
        <Col span={6}>
          <SiteMultiSelect onChange={this.onFilterChange.bind(this)}/>
        </Col>
        <Col span={6}>
          <ClientGroupMultiSelect onChange={this.onFilterChange.bind(this)}/>
        </Col>
        <Col span={6}>
          <StatusDropDown onChange={this.onFilterChange.bind(this)}/>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ filters }) => {
  return { ...filters };
}

export default connect(mapStateToProps, { changeFilter })(GeneralFilters);
