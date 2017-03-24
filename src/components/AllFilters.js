import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import GeneralFiltersDesktop from './Filters/Desktop/GeneralFiltersDesktop';
import CustomFieldFiltersDesktop from './Filters/Desktop/CustomFieldFiltersDesktop';
import GeneralFiltersMobile from './Filters/Mobile/GeneralFiltersMobile';
import CustomFieldFiltersMobile from './Filters/Mobile/CustomFieldFiltersMobile';
import { toggleFilters, getClientDataSource, resetFilters } from '../actions';
import Collapse from 'react-collapse';
import {
  ReloadButton,
  ResetButton
} from './Buttons';

class AllFilters extends Component {
  renderFilters() {
    const isMobile = window.innerWidth <= 668;
    const { showFilters, toggleFilters, getClientDataSource, resetFilters } = this.props;
    if (!isMobile) {
      return (
        <div>
          <Collapse isOpened={showFilters}>
            <div>
              <div className="client-list__filters">
                <div className="panel panel--colour-blue panel--no-panel-corner">
                  <div className="panel-heading">
                    Filters
                  </div>
                  <div className="panel-body-wrapper">
                    <div className="panel-body-inner">
                      <GeneralFiltersDesktop />

                      <hr className="page-box__sep" />

                      <CustomFieldFiltersDesktop />

                      <div className="page-box__buttons">
                        <ReloadButton onClick={() => getClientDataSource(1)}/>
                        <ResetButton onClick={() => resetFilters()} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Collapse>
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
            Apply
          </Button>
        ]}
      >
        <GeneralFiltersMobile />
        <hr className="page-box__sep" />
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

export default connect(mapStateToProps, { toggleFilters, resetFilters, getClientDataSource })(AllFilters);
