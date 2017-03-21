import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import GeneralFiltersDesktop from './Filters/Desktop/GeneralFiltersDesktop';
import CustomFieldFiltersDesktop from './Filters/Desktop/CustomFieldFiltersDesktop';
import GeneralFiltersMobile from './Filters/Mobile/GeneralFiltersMobile';
import CustomFieldFiltersMobile from './Filters/Mobile/CustomFieldFiltersMobile';
import { toggleFilters, getClientDataSource } from '../actions';

class AllFilters extends Component {
  renderFilters() {
    const isMobile = window.innerWidth <= 668;
    const { showFilters, toggleFilters, getClientDataSource } = this.props;
    if (!isMobile) {
      return (
        <div>
          <div style={{ margin: 5 }}>
            <GeneralFiltersDesktop />
          </div>

          <CustomFieldFiltersDesktop />
        </div>
      );
    }

    return (
      <Modal
        visible={showFilters}
        title="Filters"
        onCancel={() => toggleFilters() }
        footer={[
          <Button
            key="cancel"
            type="default"
            onClick={() => { toggleFilters() }}
          >
            Close
          </Button>,
          <Button
            key="reload"
            type="primary"
            onClick={() => { getClientDataSource(1) }}
          >
            Reload
          </Button>
        ]}
      >
        <GeneralFiltersMobile />
        <CustomFieldFiltersMobile />
      </Modal>
    ) ;
  }
  render() {
    return this.renderFilters();
  }
};

const mapStateToProps = ({ filters: { showFilters }}) => {
  return { showFilters };
};

export default connect(mapStateToProps, { toggleFilters, getClientDataSource })(AllFilters);
