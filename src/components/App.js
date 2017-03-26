import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { NewClientButton } from './Buttons';
import ClientList from './Scenes/ClientList';
import PageHeader from './Common/PageHeader';
import '../assets/less/app.less';

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
