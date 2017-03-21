import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, BackTop, Affix } from 'antd';
import ClientGrid from './ClientGrid';
import { ToggleColumnButton, StatusButtonGroup } from './Buttons';
import { getClientGroups, getSites } from '../actions';
import GoToClient from './Filters/GoToClient';
import AllFilters from './AllFilters';

class ClientList extends Component {
  componentDidMount() {
    this.props.getClientGroups();
    this.props.getSites();
  }

  renderPagingInfo() {
    const { total, current, pageSize } = this.props;
    const from = (current - 1) * pageSize + 1;
    const to = (from + pageSize) > total ? total: (from + pageSize - 1);

    return (<b>View {from} - { to } of { total } clients</b>);
  }

  render() {
    return (
      <div className='client-list'>
        <BackTop />
        <Row>
          <Col span={24}>
            <Affix>
              <ToggleColumnButton />
              <GoToClient />
            </Affix>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <StatusButtonGroup />
          </Col>
          <Col sm={{ span: 4, offset: 8 }} md={{ span: 4, offset: 8 }} lg={{ span: 4, offset: 8 }}>
            {this.renderPagingInfo()}
          </Col>
        </Row>

        <AllFilters />

        <Row>
          <Col span={24}>
            <ClientGrid />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ dataSource }) => {
  const {
    clients: { total, pageSize, currentPage }
  } = dataSource;

  return { total, pageSize, current: currentPage };
};

export default connect(
  mapStateToProps,
  {
    getClientGroups,
    getSites
  }
)(ClientList);
