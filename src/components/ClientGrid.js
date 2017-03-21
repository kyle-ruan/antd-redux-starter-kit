import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import ResizeHeader from './Grid/ResizeHeader';
import {
  ReloadButton,
  ResetButton,
  AdvancedOptionsButton
} from './Buttons';
import { getClientDataSource, resetFilters, resizeColumn } from '../actions';

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
          title: 'CRN',
          dataIndex: 'crn',
          key: 'crn',
          width: 150,
          sorter: true,
          fixed: 'left'
        });

        if(visibleColumns.includes('externalId'))
          columns.push({
            title: 'External ID',
            dataIndex: 'externalId',
            key: 'externalId',
            width: 150,
            sorter: true,
            fixed: 'left'
          });

      if(visibleColumns.includes('name'))
        columns.push({
          title: <ResizeHeader column='name' title='Name' />,
          dataIndex: 'name',
          key: 'name',
          width: grid.columns['name'].width,
          sorter: true,
          fixed: 'left'
        });

      if(visibleColumns.includes('streetAddress'))
        columns.push({
          title: <ResizeHeader column='address' title='Address' />,
          dataIndex: 'streetAddress',
          key: 'streetAddress',
          sorter: true,
          width: grid.columns['address'].width,
          render: streetAddress => `${streetAddress.address || ''}`
        });

      if(visibleColumns.includes('homePhone'))
        columns.push({
          title: 'Home Phone',
          dataIndex: 'homePhone',
          sorter: true,
          width: 150,
          key: 'homePhone'
        });

      if(visibleColumns.includes('mobile'))
        columns.push({
          title: 'Mobile',
          dataIndex: 'mobile',
          sorter: true,
          width: 150,
          key: 'mobile'
        });

      if(visibleColumns.includes('email'))
        columns.push({
          title: 'Email',
          dataIndex: 'email',
          sorter: true,
          email: 200,
          key: 'email'
        });

      if(visibleColumns.includes('medicareCardNumber'))
        columns.push({
          title: 'Meidcare Card',
          dataIndex: 'medicareCardNumber',
          sorter: true,
          key: 'medicareCardNumber'
        });

      if(visibleColumns.includes('siteId'))
        columns.push({
          title: 'Site',
          dataIndex: 'siteId',
          key: 'siteId',
          sorter: true,
          render: siteId => {
            if(siteId === 0 || sitesLoading) return '';
            return sites.find(site => site.value === siteId.toString()).text;
          }
        });

      if(visibleColumns.includes('groupId'))
        columns.push({
          title: 'Group',
          dataIndex: 'groupId',
          key: 'groupId',
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
              title: customField.fieldName,
              dataIndex: `customFields[${index}]`,
              key: `customfield_${index}`,
              render: cf => {
                if(cf === null || typeof(cf) === 'undefined')  return '';
                return cf.fieldValue;
              }
            })
          }
        });
      }

      columns.push({
        title: 'Actions',
        dataIndex: '',
        key: 'x',
        width: 100,
        fixed: 'right',
        render: () => <a href="#">View Details</a>
      });

      return columns;
    }

  renderGridTitle() {
    const { clientsLoading } = this.props;
    return (
      <div>
        <ReloadButton
          loading={clientsLoading}
          onClick={this.props.getClientDataSource.bind(this, 1)}
        />
        <AdvancedOptionsButton />
        <ResetButton onClick={this.props.resetFilters.bind(this)}/>
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
    const scroll = visibleColumns.length > 8 ? { x: windowWidth + 300 } : { x: null };
    const columns= this.setColumns();
    return (
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={clients}
        pagination={pagination}
        loading={clientsLoading}
        size='middle'
        bordered
        scroll={scroll}
        title={() => { return this.renderGridTitle() }}
        onChange={this.handleTableChange.bind(this)}
        onRowClick={(record) => { console.log(record.id);}}
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
