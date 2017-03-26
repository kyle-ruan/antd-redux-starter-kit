import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col } from 'antd';
import ResizeHeader from './ResizeHeader';
import { confirmActivate } from '../PopUp/ConfirmActivate';
import { StatusButtonGroup } from '../Buttons';
import { getClientDataSource, resetFilters, resizeColumn } from '../../actions';
import { deviceConfig } from '../../configs';

const isMobile = window.innerWidth <= deviceConfig.mobileWidth;

class ClientGrid extends Component {
  constructor(props) {
    super(props);
    this.x = 0;
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleEnter.bind(this));
 }

  componentDidMount() {
    this.props.getClientDataSource(1);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEnter.bind(this))
  }

  onClientSelect(client) {
    if (client.status === 'CURRENT') {
      window.parent.selectClient(client.id);
    } else {
      confirmActivate(client.id);
    }
  }

  handleTableChange(pagination, filters, sorter) {
    let orderBy = null;
    if (sorter !== null) {
      const { field, order } = sorter;
      orderBy = { field, order };
    }
    this.props.getClientDataSource(pagination.current, orderBy);
  }

  handleEnter(e) {
    if(e.keyCode === 13) {
      this.props.getClientDataSource(1);
    }
  }

  setColumns() {
      const {
        clientGroups,
        clientGroupsLoading,
        sites,
        sitesLoading,
        visibleColumns,
        customFields,
        grid
      } = this.props;

      const columns = [];

      if(visibleColumns.includes('crn'))
        columns.push({
          title: <ResizeHeader column='crn' title='CRN' />,
          dataIndex: 'crn',
          key: 'crn',
          width: grid.columns['crn'].width,
          sorter: true
        });

        if(visibleColumns.includes('externalId'))
          columns.push({
            title: <ResizeHeader column='externalId' title='External ID' />,
            dataIndex: 'externalId',
            key: 'externalId',
            width: grid.columns['externalId'].width,
            sorter: true
          });

      if(visibleColumns.includes('name'))
        columns.push({
          title: <ResizeHeader column='name' title='Name' />,
          dataIndex: 'name',
          key: 'name',
          width: grid.columns['name'].width,
          sorter: true
        });

      if(visibleColumns.includes('streetAddress'))
        columns.push({
          title: <ResizeHeader column='address' title='Address' />,
          dataIndex: 'streetAddress',
          key: 'streetAddress',
          sorter: true,
          width: grid.columns['address'].width,
          render: streetAddress => `${streetAddress.address || ''} ${streetAddress.suburb || ''} ${streetAddress.state || ''}`
        });

      if(visibleColumns.includes('homePhone'))
        columns.push({
          title: <ResizeHeader column='homePhone' title='Home Phone' />,
          dataIndex: 'homePhone',
          sorter: true,
          width: grid.columns['homePhone'].width,
          key: 'homePhone'
        });

      if(visibleColumns.includes('mobile'))
        columns.push({
          title: <ResizeHeader column='mobile' title='Mobile' />,
          dataIndex: 'mobile',
          sorter: true,
          width: grid.columns['mobile'].width,
          key: 'mobile'
        });

      if(visibleColumns.includes('email'))
        columns.push({
          title: <ResizeHeader column='email' title='Email' />,
          dataIndex: 'email',
          sorter: true,
          width: grid.columns['email'].width,
          key: 'email'
        });

      if(visibleColumns.includes('medicareCardNumber'))
        columns.push({
          title: <ResizeHeader column='medicareCardNumber' title='Medicare Card Number' />,
          dataIndex: 'medicareCardNumber',
          sorter: true,
          width: grid.columns['medicareCardNumber'].width,
          key: 'medicareCardNumber'
        });

      if(visibleColumns.includes('siteId'))
        columns.push({
          title: <ResizeHeader column='siteId' title='Site' />,
          dataIndex: 'siteId',
          key: 'siteId',
          sorter: true,
          width: grid.columns['siteId'].width,
          render: siteId => {
            if(siteId === 0 || sitesLoading) return '';
            return sites.find(site => site.value === siteId.toString()).text;
          }
        });

      if(visibleColumns.includes('groupId'))
        columns.push({
          title: <ResizeHeader column='groupId' title='Client Group' />,
          dataIndex: 'groupId',
          key: 'groupId',
          width: grid.columns['groupId'].width,
          sorter: true,
          render: groupId => {
            if(groupId === 0 || clientGroupsLoading) return '';
            return clientGroups.find(group => group.value === groupId.toString()).text;
          }
        });

      if(customFields.length > 0) {
        customFields.forEach((customField, index) => {
          if(visibleColumns.includes(customField.fieldName)){
            columns.push({
              title: <ResizeHeader column={customField.fieldName} title={customField.fieldName} />,
              dataIndex: `customFields[${index}]`,
              key: `customfield_${index}`,
              width: grid.columns[customField.fieldName].width,
              render: cf => {
                if(cf === null || typeof(cf) === 'undefined')  return '';
                return cf.fieldValue;
              }
            })
          }
        });
      }

      // columns.push({
      //   title: 'Actions',
      //   dataIndex: '',
      //   key: 'x',
      //   fixed: 'right',
      //   render: () => <a href="#">View Details</a>
      // });

      return columns;
    }

  renderPagingInfo() {
    const { total, current, pageSize } = this.props;
    const from = (current - 1) * pageSize + 1;
    const to = (from + pageSize) > total ? total: (from + pageSize - 1);

    return (<b className="ant-table-row-count">View {from} - { to } of { total } clients</b>);
  }

  renderGridTitle() {
    return (
      <div>
        <div className="ant-table-toolbar-tabs">
          <Row>
            <Col
              className={isMobile ? null : "ant-table-toolbar-tabs__left" }
              span={isMobile ? 24: 14}
            >
              <StatusButtonGroup />
            </Col>
            <Col
              className={ isMobile ? null : "ant-table-toolbar-tabs__right" }
              span={isMobile? 24: 10}
            >
              {this.renderPagingInfo()}
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  render() {
    const {
      clients,
      total,
      clientsLoading,
      current,
      pageSize,
      visibleColumns
    } = this.props;
    const pagination = { current, total, pageSize };
    const windowWidth = window.innerWidth;
    const columns= this.setColumns();
    //const isMobile = window.innerWidth <= 668;
    const scrollX = visibleColumns.length > 8 ? windowWidth + (visibleColumns.length - 8) * 150  : null;
    //const scrollY = isMobile ? null : 1000 ;
    return (
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={clients}
        pagination={pagination}
        loading={clientsLoading}
        size='middle'
        bordered
        scroll={{ x: scrollX }}
        title={() => { return this.renderGridTitle() }}
        onChange={this.handleTableChange.bind(this)}
        onRowClick={this.onClientSelect.bind(this)}
      />
    );
  }
}

const mapStateToProps = ({ dataSource, visibleColumns, filters, grid }) => {
  const {
    clients: { data, total, loading, pageSize, currentPage },
    customFields,
    clientGroups,
    sites
  } = dataSource;
  const { showFilters } = filters;
  return {
    clients: data,
    clientsLoading: loading,
    customFields: customFields.data,
    clientGroups: clientGroups.data,
    clientGroupsLoading: clientGroups.loading,
    sites: sites.data,
    sitesLoading: sites.loading,
    total,
    pageSize,
    current: currentPage,
    showFilters,
    grid,
    visibleColumns: Object.keys(visibleColumns).filter(column => visibleColumns[column])
  };
};

export default connect(mapStateToProps,
  { getClientDataSource, resetFilters, resizeColumn }
)(ClientGrid);