import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, BackTop, Affix } from 'antd';
import ClientGrid from './ClientGrid';
import { ToggleColumnButton, AdvancedOptionsButton } from './Buttons';
import { getClientGroups, getSites } from '../actions';
import GoToClient from './Filters/GoToClient';
import AllFilters from './AllFilters';

class ClientList extends Component {
  componentDidMount() {
    this.props.getClientGroups();
    this.props.getSites();
  }

  render() {
    return (
      <div className='client-list'>

        <BackTop />
        <Row>
          <Col span={24}>
            <Affix>
              <div className="button-bar">
                <div className="button-bar__item">
                  <ToggleColumnButton />
                </div>
                <div className="button-bar__item">
                  <GoToClient />
                </div>
                <div className="button-bar__item">
                  <AdvancedOptionsButton />
                </div>
              </div>
            </Affix>
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
