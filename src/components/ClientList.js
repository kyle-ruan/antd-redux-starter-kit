import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col } from 'antd';
import { ReloadButton, ResetButton, ToggleColumnButton } from './Buttons';
import { getClientDataSource, resetFilters } from '../actions';
import GeneralFilters from './GeneralFilters';
import CustomFieldFilters from './CustomFieldFilters';
import { cache } from '../utils';

class ClientList extends Component {
  componentWillMount() {
    document.addEventListener('keydown', this.handleEnter.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEnter.bind(this))
  }

  handleTableChange(pagination) {
    this.props.getClientDataSource(pagination.current);
  }

  handleEnter(e) {
    if(e.keyCode === 13) {
      this.props.getClientDataSource(1);
    }
  }

  renderPagingInfo() {
    const { total, current, pageSize } = this.props;
    const from = (current - 1) * pageSize + 1;
    const to = (from + pageSize) > total ? total: (from + pageSize - 1);

    return (
      <b>View {from} - { to } of { total } clients</b>
    );
  }

  renderGrid() {
    const {
      clients,
      total,
      loading,
      current,
      pageSize,
      visibleColumns,
      customFields
    } = this.props;
    const columns = [];
    if(visibleColumns.includes('name'))
      columns.push({
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        fixed: 'left'
      });

    if(visibleColumns.includes('streetAddress'))
      columns.push({
        title: 'Addres',
        dataIndex: 'streetAddress',
        key: 'streetAddress',
        render: streetAddress => `${streetAddress.address || ''}`
      });

    if(visibleColumns.includes('homePhone'))
      columns.push({
        title: 'Home Phone',
        dataIndex: 'homePhone',
        key: 'homePhone'
      });

    if(visibleColumns.includes('mobile'))
      columns.push({
        title: 'Mobile',
        dataIndex: 'mobile',
        key: 'mobile'
      });

    if(visibleColumns.includes('email'))
      columns.push({
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
      });

    if(visibleColumns.includes('medicareCardNumber'))
      columns.push({
        title: 'Meidcare Card',
        dataIndex: 'medicareCardNumber',
        key: 'medicareCardNumber'
      });

    if(visibleColumns.includes('siteId'))
      columns.push({
        title: 'Site',
        dataIndex: 'siteId',
        key: 'siteId',
        render: siteId => {
          if(siteId === 0) return '';
          return cache.get('sites').find(site => site.value === siteId.toString()).text;
        }
      });

    if(visibleColumns.includes('groupId'))
      columns.push({
        title: 'Group',
        dataIndex: 'groupId',
        key: 'groupId',
        render: groupId => {
          if(groupId === 0) return '';
          return cache.get('clientGroups').find(group => group.value === groupId.toString()).text;
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
      width:100,
      fixed: 'right',
      render: () => <a href="#">View Details</a>
    });

    const pagination = { current, total, pageSize };
    const scroll = visibleColumns.length > 8 ? { x: 2000 } : { x: null };
    return (
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={clients}
        pagination={pagination}
        loading={loading}
        size='middle'
        bordered
        scroll={scroll}
        onChange={this.handleTableChange.bind(this)}
      />
    );
  }

  render() {
    const { loading } = this.props;

    return (
      <div>
        <GeneralFilters />
        <CustomFieldFilters />
        <Row className='client-list-button'>
          <Col span={6}>
            <ReloadButton
              loading={loading}
              onClick={this.props.getClientDataSource.bind(this, 1)}
            />
            <ResetButton onClick={this.props.resetFilters.bind(this)}/>
            <ToggleColumnButton />
          </Col>
          <Col span={4} offset={14}>
            {this.renderPagingInfo()}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {this.renderGrid()}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ dataSource, visibleColumns }) => {
  const {
    clients: { data, total, loading, pageSize, currentPage },
    customFields
  } = dataSource;

  return {
    clients: data,
    customFields: customFields.data,
    total,
    loading,
    pageSize,
    current: currentPage,
    visibleColumns: Object.keys(visibleColumns).filter(column => visibleColumns[column])
  };
};

export default connect(mapStateToProps, { getClientDataSource, resetFilters })(ClientList);
