import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { NewClientButton } from './components/Buttons';
import ClientList from './components/Scenes/ClientList';
import PageHeader from './components/Common/PageHeader';
import './assets/less/app.less';

class App extends Component {
  render() {
    return (
      <div className="coreplus-page">
        <PageHeader title="Client List">
          <NewClientButton />
        </PageHeader>
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
