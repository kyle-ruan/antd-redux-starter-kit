import React, { Component } from 'react';
import { Row, Col } from 'antd';
import ClientList from './ClientList';
import '../assets/less/app.less';
import PageHeader from './PageHeader';

class App extends Component {
  render() {
    return (
      <div className="coreplus-page">
        <PageHeader title="Client List"></PageHeader>
        <div className='container'>
          <Row>
            <Col span={24}>
              <ClientList />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
